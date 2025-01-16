# @elizaos/plugin-icp

A plugin for setting up Telegram bots, powered by ElizaOS framework and Internet Computer blockchain technology. This plugin enables you to quickly build intelligent Telegram bots with automated token creation and management capabilities, leveraging AI and database technologies.

## Technology Stack

- 🤖 ElizaOS - Provides intelligent bot framework support
- ⛓️ Internet Computer - Provides decentralized blockchain infrastructure
- 🤖 Telegram Bot API - Implements user interaction interface
- 🧠 OpenAI - Powers AI-driven content generation
- 🗄️ PostgreSQL - Handles data persistence and management

## Features

- 🔄 ElizaOS-based intelligent dialogue system
- 🎨 AI-powered meme token generation (via OpenAI)
- 🖼️ Automated token logo design
- 📝 Smart description generation
- 🔗 Internet Computer blockchain integration
- 💾 Persistent data storage with PostgreSQL
- 🤖 ChatGPT-powered conversations

## Configuration

Add the following variables to your `.env` file:

```env
INTERNET_COMPUTER_PRIVATE_KEY=<your-ed25519-private-key>
OPENAI_API_KEY=<your-openai-api-key>
POSTGRES_URL=<your-postgres-connection-string>
TELEGRAM_BOT_TOKEN=<your-telegram-bot-token>
```

### How to get Telegram Bot Token

To obtain your Telegram Bot Token, follow these steps:

1. Open Telegram and search for [@BotFather](https://t.me/botfather)
2. Start a chat with BotFather by clicking "Start"
3. Send the command `/newbot`
4. Follow BotFather's instructions:
    - Enter a name for your bot
    - Enter a username for your bot (must end in 'bot')
5. Once completed, BotFather will provide you with a token that looks like:
    ```
    123456789:ABCdefGHIjklmNOPQrstUVwxyz
    ```
6. Copy this token and add it to your `.env` file:
    ```env
    TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklmNOPQrstUVwxyz
    ```

> ⚠️ **Security Note**: Keep your bot token secure. Anyone with your token can control your bot.

### How to export Private Key from dfx

To get your ED25519 private key from dfx identity, follow these steps:

1. Export your identity to PEM format:

```bash
dfx identity export pick-pump-agent > identity.pem
```

2. Extract the private key:

```bash
# Linux/MacOS
openssl ec -in identity.pem -text -noout | grep priv -A 3 | tail -n +2 | tr -d '\n[:space:]:' | xxd -r -p | xxd -p

# Windows (PowerShell)
Get-Content identity.pem | Select-String -Pattern 'priv' -Context 0,3 | ForEach-Object { $_.Context.PostContext -join '' } | ForEach-Object { $_ -replace '[:\s]','' } | xxd -r -p | xxd -p
```

3. Add the extracted key to your `.env` file:

```env
INTERNET_COMPUTER_PRIVATE_KEY=<extracted-key>
```

> ⚠️ **Security Note**: Keep your private key secure and never share it. Make sure your .env file is included in .gitignore and not committed to version control.

## Usage

### Example Bot: @realnekoneget_Bot

For a quick start, you can try our example Telegram bot [@realnekoneget_Bot](https://t.me/realnekoneget_Bot). This bot demonstrates the capabilities of the ICP plugin and can help you:

- Generate meme tokens on PickPump platform
- Learn about ICP ecosystem
- Get information about token creation process

Simply send a message to the bot to start exploring ICP and meme token creation!

### Token Creation Options

```typescript
export type CreateMemeTokenArg = {
    name: string;
    symbol: string;
    description: string;
    logo: string;
    twitter?: string;
    website?: string;
    telegram?: string;
};
```

## Installation & Running

```bash
# Build and start with custom character
pnpm build && pnpm start --characters="./characters/nekone.character.json"
```

## Troubleshooting

If you encounter any issues during installation or runtime, try the following steps:

```bash
# Execute in project root directory
pnpm clean        # Clean project
rm -rf node_modules  # Remove all dependencies
pnpm install      # Reinstall dependencies
pnpm build        # Rebuild project
```

> Note: If you're using Windows, run these commands in WSL or Git Bash terminal.
