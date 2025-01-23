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
import { Principal } from "@dfinity/principal";

async function createTokenTransaction(
    creator: ActorCreator,
    tokenInfo: CreateMemeTokenArg
) {
    const actor: _SERVICE = await creator(idlFactory, CANISTER_IDS.PICK_PUMP);
    const result = await actor.create_token({
        ...tokenInfo,
        creator: wrapOption(tokenInfo.creator),
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
            let creator: Principal | undefined = undefined;
            try {
                creator = Principal.fromText(response.pid);
                elizaLogger.info("creator", response.pid);
            } catch (error) {
                creator = undefined;
            }
            const actorCreator = wallet.createActor;
            const createTokenResult = await createTokenTransaction(
                actorCreator,
                {
                    name: response.name,
                    symbol: response.symbol,
                    description: response.description,
                    logo: logoUploadResult.urls.gateway,
                    creator,
                }
            );

            const responseMsg = {
                text: `✨ Created new meme token:\n🪙 ${response.name} (${response.symbol})\n📝 link: https://pickpump.xyz/swap/${createTokenResult.id}`,
                data: createTokenResult,
                action: "CREATE_TOKEN",
                type: "success",
            };
            callback?.(responseMsg);
        } catch (error: any) {
            elizaLogger.error("createToken error", error);
            const responseMsg = {
                text: `Failed to create token`,
                action: "CONTINUE",
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
                    text: "Great! Let me confirm the details before we proceed:\n\n🎮 Token Name: GameCoin\n🎯 Purpose: Gaming platform token for in-game purchases and rewards\n🆔 Creator PID: j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae\n\nPlease confirm if these details are correct by replying 'yes'. If you need to make any changes, please let me know!",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "yes",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "Perfect! I'll start creating your GameCoin token for gaming transactions! 🎮",
                    action: "CREATE_TOKEN",
                    data: {
                        pid: "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae",
                    },
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: {
                    text: "I want to create a token on ICP but I'm not sure what kind of token to create. Can you help me with some ideas?",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "I'd love to help you brainstorm some token ideas! 🚀 First, let me ask you a few questions:\n\n1. What are your interests or areas of expertise?\n2. Do you have any specific goals for the token (e.g., solving a problem, creating a community, etc.)?\n3. What kind of community would you like to build?",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "I'm really into fitness and working out. I go to the gym regularly.",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "That's perfect! Based on your interest in fitness, I have an exciting token concept for you: 'FitQuest' - a token that gamifies fitness achievements! 🏋️‍♂️\n\nHere's the concept:\n- Users earn tokens for completing workouts, reaching fitness goals, and maintaining streaks\n- Tokens can be used for gym membership discounts, fitness equipment, or personal training sessions\n- Creates a community of fitness enthusiasts who motivate each other\n\nWhat do you think about this idea? If you like it, I'll just need your Principal ID to proceed with creation!",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "That sounds amazing! My PID is j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "Excellent! Let me confirm the details for your FitQuest token:\n\n💪 Token Name: FitQuest\n🎯 Purpose: Reward fitness achievements and create a fitness community\n📱 Use Cases:\n- Workout completion rewards\n- Gym membership benefits\n- Fitness equipment discounts\n🆔 Creator PID: j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae\n\nDoes everything look correct? Please reply 'yes' to proceed with creation!",
                },
            },
            {
                user: "{{user1}}",
                content: {
                    text: "yes",
                },
            },
            {
                user: "NEKONE",
                content: {
                    text: "Awesome! I'll start creating your FitQuest token now! 💪",
                    action: "CREATE_TOKEN",
                    data: {
                        pid: "j6jni-euxrr-7s6ef-vb2wt-dovvi-u7772-a6exj-kdhru-swdod-q3w44-uae",
                    },
                },
            },
        ],
    ],
} as Action;
