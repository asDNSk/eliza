import {
    composeContext,
    generateImage,
    generateText,
    generateObject,
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
import {} from "@ai16z/eliza";

const createTokenTemplate = `Based on the user's description, generate creative and memorable values for a new meme token on PickPump:

User's idea: "{{recentMessages}}"

Please generate:
1. A catchy and fun token name that reflects the theme
2. A 3-4 letter symbol based on the name (all caps)
3. An engaging and humorous description (include emojis)
4. Set other fields to null

Example response:
\`\`\`json
{
    "name": "CatLaser",
    "symbol": "PAWS",
    "description": "The first meme token powered by feline laser-chasing energy! Watch your investment zoom around like a red dot! 😺🔴✨",
    "logo": null,
    "website": null,
    "twitter": null,
    "telegram": null
}
\`\`\`

Generate appropriate meme token information based on the user's description.
Respond with a JSON markdown block containing only the generated values.`;

const logoPromptTemplate = `Based on this token idea: "{{description}}", create a detailed prompt for generating a logo image.
The prompt should describe visual elements, style, and mood for the logo.
Focus on making it memorable and suitable for a cryptocurrency token.
Keep the response short and specific.
Respond with only the prompt text, no additional formatting.

Example for a dog-themed token:
"A playful cartoon dog face with a cryptocurrency symbol on its collar, using vibrant colors and bold outlines, crypto-themed minimal style"`;

async function createTokenTransaction(
    creator: ActorCreator,
    tokenInfo: CreateMemeTokenArg
): Promise<any> {
    const actor: _SERVICE = await creator(
        idlFactory,
        "bn4fo-iyaaa-aaaap-akp6a-cai"
    );
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
    const logoPrompt = `Create a fun and memorable logo for a cryptocurrency token with these characteristics: ${description}. The logo should be simple, iconic, and suitable for a meme token. Style: minimal, bold colors, crypto-themed.`;

    const result = await generateImage(
        {
            prompt: logoPrompt,
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
        console.log("🔍 Validating CREATE_TOKEN action");
        console.log("📝 Message content:", message.content);

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

        // 从消息内容对象中获取文本
        const messageText = (
            typeof message.content === "string"
                ? message.content
                : message.content.text || ""
        ).toLowerCase();

        console.log("📝 Processed message text:", messageText);

        const isValid = keywords.some((keyword) => {
            const match = messageText.includes(keyword.toLowerCase());
            if (match) {
                console.log(`✅ Matched keyword: ${keyword}`);
            }
            return match;
        });

        console.log("✅ Validation result:", isValid);
        return isValid;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State | undefined,
        _options: { [key: string]: unknown } | undefined,
        callback?: HandlerCallback
    ): Promise<void> => {
        console.log("🚀 Starting CREATE_TOKEN handler");
        console.log("📝 Input message:", message.content);
        callback?.({
            text: "🔄 Creating meme token...",
            action: "CREATE_TOKEN",
            type: "processing",
        });
        if (!state) {
            console.log("Creating new state...");
            state = (await runtime.composeState(message)) as State;
        } else {
            console.log("Updating existing state...");
            state = await runtime.updateRecentMessageState(state);
        }

        console.log("🔄 Composing token context...");
        const createTokenContext = composeContext({
            state,
            template: createTokenTemplate,
        });
        console.log("Token context:", createTokenContext);

        console.log("🤖 Generating token info...");
        const response = await generateObject({
            runtime,
            context: createTokenContext,
            modelClass: ModelClass.LARGE,
        });
        console.log("Generated token info:", response);

        console.log("🎨 Generating logo prompt...");
        const logoPromptContext = composeContext({
            state,
            template: logoPromptTemplate.replace(
                "{{description}}",
                response.description
            ),
        });
        console.log("Logo prompt context:", logoPromptContext);

        const logoPrompt = await generateText({
            runtime,
            context: logoPromptContext,
            modelClass: ModelClass.SMALL,
        });
        console.log("Generated logo prompt:", logoPrompt);

        console.log("🖼️ Generating token logo...");
        const logo = await generateTokenLogo(logoPrompt, runtime);
        if (!logo) {
            console.error("❌ Logo generation failed");
            throw new Error("Failed to generate token logo");
        }
        console.log("✅ Logo generated successfully");

        try {
            console.log("💳 Getting wallet provider...");
            const { wallet } = await icpWalletProvider.get(
                runtime,
                message,
                state
            );
            console.log("Wallet obtained");

            console.log("🔄 Creating token transaction...");
            const creator = wallet.createActor;
            const createTokenResult = await createTokenTransaction(creator, {
                name: response.name,
                symbol: response.symbol,
                description: response.description,
                logo,
                website: response.website,
                twitter: response.twitter,
                telegram: response.telegram,
            });

            console.log("✨ Token created successfully:", createTokenResult);
            const responseMsg = {
                text: `✨ Created new meme token:\n🪙 ${response.name} (${response.symbol})\n📝 ${response.description}`,
                data: createTokenResult,
                action: "CREATE_TOKEN",
                type: "success",
            };
            console.log("📤 Final response message:", responseMsg);
            callback?.(responseMsg);
        } catch (error: any) {
            console.error("❌ Error creating token:", error);
            console.error("Error stack:", error.stack);
            const responseMsg = {
                text: `Failed to create token: ${error.message}`,
                action: "CREATE_TOKEN",
                type: "error",
            };
            console.log("📤 Error response message:", responseMsg);
            callback?.(responseMsg);
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: "我想在 PickPump 上发行一个关于太空猫的代币",
            },
            {
                user: "{{user2}}",
                content: {
                    text: "正在 PickPump 上创建太空猫代币...",
                    action: "CREATE_TOKEN",
                },
            },
            {
                user: "{{user2}}",
                content: {
                    text: "✨ 代币创建成功！",
                },
            },
        ],
        [
            {
                user: "{{user1}}",
                content: "帮我在 PP 上创建一个披萨主题的搞笑代币",
            },
            {
                user: "{{user2}}",
                content: {
                    text: "正在 PickPump 上创建披萨代币...",
                    action: "CREATE_TOKEN",
                },
            },
        ],
    ] as ActionExample[][],
} as Action;
