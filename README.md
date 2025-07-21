# BdeghaBot - Discord Music Bot

A Discord music bot built with Discord.js v14 and TypeScript.

A shoutout to Louis, that made this template/framework, which made my development much more easy!

You can check his github and youtube here:
Louis' Github: https://github.com/nullpointerexceptionkek
Louis' Youtube channel: https://www.youtube.com/@getinstance
Louis' website: https://louisli.dev/

## Features

- **Music Commands**: Play YouTube music in voice channels
- **Slash Commands**: Modern interface using Discord slash commands
- **TypeScript**: Fully typed code for better development
- **Event System**: Automatic event loading with execution order
- **Environment Configuration**: Use of `.env` file for sensitive data

## Requirements

- Node.js v16 or higher
- npm
- A Discord application with a bot (token)
- ffmpeg (included in the project)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/BdeghaBot
   cd BdeghaBot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure the `.env` file**

   Create a `.env` file in the project root:

   ```
   TOKEN=your_bot_token_here
   ```

4. **Start in development mode**

   ```bash
   npm run dev
   ```

   This uses `nodemon` and restarts when files are changed.

5. **Build and run**
   ```bash
   npm run build
   npm start
   ```

## Commands

- `/tocar [url]` - Play a YouTube music
- `/parar` - Stop the current playback
- `/ping` - Check if the bot is online

## Project Structure

```
├── src/
│   ├── @types/                    # Custom types
│   ├── auxiliaries/               # Helper functions
│   ├── commands/                  # Slash command modules
│   │   ├── player/                # Music commands
│   │   └── utility/               # Utility commands
│   ├── constraints/               # Constants and interfaces
│   ├── events/                    # Event modules
│   │   ├── ready/                 # Initialization events
│   │   └── interactionCreate/     # Interaction handling
│   ├── handlers/                  # Generic handlers
│   └── index.ts                   # Bot entry point
├── ffmpeg/                        # ffmpeg binaries
├── .env                           # Environment variables
├── config.json                    # Bot configurations
└── package.json
```

## Technologies

- [Discord.js](https://discord.js.org/) - Framework for Discord API interaction
- [DisTube](https://distube.js.org/) - Library for music playback
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable loading
- [TypeScript](https://www.typescriptlang.org/) - Typed programming language

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.