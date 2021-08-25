import { Message } from 'discord.js';

import Logger from '../../classes/Logger';
import Command from '../../structures/Command';
import DiscordClient from '../../structures/DiscordClient';

export default class RebootCommand extends Command {
    constructor(client: DiscordClient) {
        super(client, {
            name: 'reboot',
            group: 'Developer',
            description: 'Reboots the bot.',
            require: {
                developer: true
            }
        });
    }

    async run(message: Message, args: string[]) {
        Logger.log('WARNING', `Bot rebooting... (Requested by ${message.author.tag})`, true);

        // Destroying client so we can work without bugs
        this.client.destroy();

        // Reregistering commands, events and resetting command cooldowns and groups.
        this.client.registry.reregisterAll();

        // Running the client again
        // Don't call login method async
        this.client.login(this.client.config.token).then(async () => {
            // Emitting ready event
            this.client.emit('ready');

            // Sending message to channel for feedback
            await message.channel.send({
                embeds: [
                    {
                        color: 'GREEN',
                        description: `${message.author}, bot rebooted successfully.`
                    }
                ]
            });
        });
    }
}
