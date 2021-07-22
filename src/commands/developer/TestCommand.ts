import { Message } from 'discord.js';

import Command from '../../structures/Command';
import DiscordClient from '../../structures/DiscordClient';

export default class TestCommand extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            name: 'test',
            group: 'Developer',
            description: 'Test command for developers',
            require: {
                developer: true
            }
        });
    }

    async run(message: Message, args: string[]) {
        await message.reply('Test command working!');
    }
}
