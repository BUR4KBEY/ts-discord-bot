# Typescript Discord Bot

## 🌟 About
This is an advanced discord bot template made with TypeScript.

You can easily create  more advanced, complex systems with this template.

## 📜 Features
- Easy to develop advanced and complex systems
    - Because you have access to everything. You can change everything whatever you want.
- Command handler with error handling (`src/classes/CommandHandler.ts`)
    - Your bot doesn't crash on errors anymore. Errors will be logging to console.
- Cooldown, permission and nsfw channel checking on commands
    - You can set up cooldowns, required permissions and requiring nsfw channel for each command uniquely.
- Auto command & event registration and checking (`src/classes/Registry.ts`)
    - You don't have to spend time with defining commands and events manually.
- Beautiful, detailed console logs (`src/classes/Logger.ts`)
    - More beautiful, more readable. Thats good right?
- Full customizable discord client (`src/structures/DiscordClient.ts`)
    - You can easily add properties to client.
- Dynamic & advanced help command (`src/commands/general/HelpCommand.ts`)
    - You no longer have to document it every time you add a command.

## ❓ What Is The Developer Permission
- You can create commands just usable for developers
- Developers doesn't affected from:
    - Cooldowns
    - Permission Checking
    - NSFW Channel Checking

---

## 📥 Installation
You can use `npm` instead of `yarn` but i recommended to use `yarn`.
```
yarn install
```

## ⚙️ Setting Up
- Rename `.env.example` to `.env` and fill it.
- Open `src/index.ts` and set up **moment-timezone** for your locale.

## 🤖 Running The Bot
- Without Building
    - Type `yarn dev` to run.
- With Building
    - Type `yarn build` to build the project.
    - Type `yarn start` to run the builded project.

---

## 🛠️ Creating Commands & Events
### Commands
- Create a new file to `src/commands`. (You can create files in directories)
- Open your file.
- Add command template.
```ts
import { Message } from 'discord.js';

import Command from '../../structures/Command';
import DiscordClient from '../../structures/DiscordClient';

export default class ExampleCommand extends Command {

    constructor(client: DiscordClient) {
        super(client, {
            name: "example",
            group: "Developer",
            description: "An example command.",
            require: {
                developer: true,
            }
        });
    }

    async run(message: Message, args: string[]) {
        await message.reply("Wow, example command working!");
    }

}
```

### Events
- Create a new file to `src/events`. (You can create files in directories)
- Open your file.
- Add event template.
```ts
import { GuildMember } from 'discord.js';

import DiscordClient from '../structures/DiscordClient';
import Event from '../structures/Event';

export default class GuildMemberAddEvent extends Event {

    constructor(client: DiscordClient) {
        super(client, "guildMemberAdd");
    }

    async run(member: GuildMember) {
        console.log(`${member.user.tag} joined to ${member.guild.name}.`);
    }

}
```

You can check event parameters from [discord.js.org](https://discord.js.org/#/docs/main/stable/class/Client).