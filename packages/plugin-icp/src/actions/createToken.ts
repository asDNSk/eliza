import {
    composeContext,
    generateImage,
    generateText,
    generateObject,
    elizaLogger,
} from "@ai16z/eliza";
import {
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
    type Action,
} from "@ai16z/eliza";
import { idlFactory } from "../canisters/pick-pump/index.did";
import { _SERVICE } from "../canisters/pick-pump/index.did.d";
import { ActorCreator, CreateMemeTokenArg } from "../types";
import { unwrapOption, wrapOption } from "../utils/common/types/options";
import { unwrapRustResultMap } from "../utils/common/types/results";
import { icpWalletProvider } from "../providers/wallet";
import { uploadFileToWeb3Storage } from "../apis/uploadFile";
import { createTokenTemplate, logoPromptTemplate } from "./prompts/token";
import { CANISTER_IDS } from "../constants/canisters";

async function createTokenTransaction(
    creator: ActorCreator,
    tokenInfo: CreateMemeTokenArg
) {
    const actor: _SERVICE = await creator(idlFactory, CANISTER_IDS.PICK_PUMP);
    const result = await actor.create_token({
        ...tokenInfo,
        name: tokenInfo.name,
        symbol: tokenInfo.symbol,
        description: tokenInfo.description,
        logo: tokenInfo.logo,
        twitter: wrapOption(tokenInfo.twitter),
        website: wrapOption(tokenInfo.website),
        telegram: wrapOption(tokenInfo.telegram),
    });

    return unwrapRustResultMap(
        result,
        (ok) => ({
            ...ok,
            id: ok.id.toString(),
            created_at: ok.created_at.toString(),
            available_token: ok.available_token.toString(),
            volume_24h: ok.volume_24h.toString(),
            last_tx_time: ok.last_tx_time.toString(),
            market_cap_icp: ok.market_cap_icp.toString(),
            twitter: unwrapOption(ok.twitter),
            website: unwrapOption(ok.website),
            telegram: unwrapOption(ok.telegram),
        }),
        (err) => {
            throw new Error(`Token creation failed: ${err}`);
        }
    );
}

async function generateTokenLogo(
    description: string,
    runtime: IAgentRuntime
): Promise<string | null> {
    const result = await generateImage(
        {
            prompt: description,
            width: 512,
            height: 512,
            count: 1,
        },
        runtime as any
    );

    if (result.success && result.data && result.data.length > 0) {
        return result.data[0];
    }

    return null;
}

export const executeCreateToken: Action = {
    name: "CREATE_TOKEN",
    similes: [
        "CREATE_PICKPUMP_TOKEN",
        "MINT_PICKPUMP",
        "PICKPUMP_TOKEN",
        "PP_TOKEN",
        "PICKPUMP发币",
        "PP发币",
        "在PICKPUMP上发币",
        "PICKPUMP代币",
    ],
    description:
        "Create a new meme token on PickPump platform (Internet Computer). This action helps users create and launch tokens specifically on the PickPump platform.",
    validate: async (runtime: IAgentRuntime, message: Memory) => {
        const keywords = [
            "pickpump",
            "pp",
            "皮克帮",
            "token",
            "coin",
            "代币",
            "币",
            "create",
            "mint",
            "launch",
            "deploy",
            "创建",
            "发行",
            "铸造",
        ];

        const messageText = (
            typeof message.content === "string"
                ? message.content
                : message.content.text || ""
        ).toLowerCase();

        return keywords.some((keyword) =>
            messageText.includes(keyword.toLowerCase())
        );
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State | undefined,
        _options: { [key: string]: unknown } | undefined,
        callback?: HandlerCallback
    ): Promise<void> => {
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }
        elizaLogger.log("createToken state:", state);
        const createTokenContext = composeContext({
            state,
            template: createTokenTemplate,
        });

        const response = await generateObject({
            runtime,
            context: createTokenContext,
            modelClass: ModelClass.LARGE,
        });
        elizaLogger.log("createToken response:", response);
        try {
            const logoPrompt = await generateText({
                runtime,
                context: logoPromptTemplate(response.description),
                modelClass: ModelClass.SMALL,
            });

            const logo = await generateTokenLogo(logoPrompt, runtime);
            if (!logo) {
                throw new Error("Failed to generate token logo");
            }

            const logoUploadResult = await uploadFileToWeb3Storage(logo);
            elizaLogger.info("logoUploadResult", logoUploadResult);
            if (!logoUploadResult.urls?.gateway) {
                throw new Error("Failed to upload logo to Web3Storage");
            }
            const { wallet } = await icpWalletProvider.get(
                runtime,
                message,
                state
            );

            const creator = wallet.createActor;
            const createTokenResult = await createTokenTransaction(creator, {
                name: response.name,
                symbol: response.symbol,
                description: response.description,
                logo: logoUploadResult.urls.gateway,
            });

            const responseMsg = {
                text: `✨ Created new meme token:\n🪙 ${response.name} (${response.symbol})\n📝 link: https://pickpump.xyz/swap/${createTokenResult.id}`,
                data: createTokenResult,
                action: "CREATE_TOKEN",
                type: "success",
            };
            callback?.(responseMsg);
        } catch (error: any) {
            const responseMsg = {
                text: `Failed to create token: ${error.message}`,
                action: "CREATE_TOKEN",
                type: "error",
            };
            callback?.(responseMsg);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "How can I create a token on ICP?",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "I can help you create a token on the Internet Computer! 🚀 To get started, I'll need two pieces of information:\n\n1. Your Principal ID (PID) - this is your unique identifier on the Internet Computer\n2. A brief description of your token project, including its name and purpose\n\nCould you please provide these details? If you need help finding your Principal ID, I can guide you through that process! 🛠️",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "My PID is j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae, and I want to create a token called GameCoin for my gaming platform, it will be used for in-game purchases and rewards",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "Perfect! I'll start creating your GameCoin token for gaming transactions using your Principal ID abc123def456! 🎮",
                    action: "CREATE_TOKEN",
                    data: {
                        pid: "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae",
                    },
                },
            },
        ],
    ],
} as Action;
