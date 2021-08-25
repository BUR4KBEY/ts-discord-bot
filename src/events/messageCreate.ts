import { Message } from 'discord.js';

import CommandHandler from '../classes/CommandHandler';
import DiscordClient from '../structures/DiscordClient';
import Event from '../structures/Event';

export default class MessageEvent extends Event {
    constructor(client: DiscordClient) {
        super(client, 'messageCreate');
    }

    async run(message: Message) {
        if (message.author.bot || message.channel.type === 'DM') return;
        await CommandHandler.handleCommand(this.client, message);
    }
}
