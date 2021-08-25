import { GuildMember, Message, TextChannel } from 'discord.js';

import Logger from '../classes/Logger';
import { isUserDeveloper } from '../utils/functions';
import { ICommandInfo } from '../utils/interfaces';
import DiscordClient from './DiscordClient';

export default abstract class Command {
    /**
     * Discord client.
     */
    readonly client: DiscordClient;

    /**
     * Information of the command.
     */
    readonly info: ICommandInfo;

    constructor(client: DiscordClient, info: ICommandInfo) {
        this.client = client;
        this.info = info;
    }

    /**
     * Executes when command throws an error.
     * @param message Message object
     * @param error Error message
     */
    async onError(message: Message, error: any) {
        Logger.log('ERROR', `An error occurred in "${this.info.name}" command.\n${error}\n`, true);
        await message.channel.send({
            embeds: [
                {
                    color: 'RED',
                    title: '💥 Oops...',
                    description: `${message.author}, an error occurred while running this command. Please try again later.`
                }
            ]
        });
    }

    /**
     * Returns usability of the command
     * @param message Message object
     * @param checkNsfw Checking nsfw channel
     */
    isUsable(message: Message, checkNsfw: boolean = false): boolean {
        if (this.info.enabled === false) return false;
        if (checkNsfw && this.info.onlyNsfw === true && !(message.channel as TextChannel).nsfw && !isUserDeveloper(this.client, message.author.id)) return false;
        if (this.info.require) {
            if (this.info.require.developer && !isUserDeveloper(this.client, message.author.id)) return false;
            if (this.info.require.permissions && !isUserDeveloper(this.client, message.author.id)) {
                const perms: string[] = [];
                this.info.require.permissions.forEach(permission => {
                    if ((message.member as GuildMember).permissions.has(permission)) return;
                    else return perms.push(permission);
                });
                if (perms.length) return false;
            }
        }

        return true;
    }

    /**
     * Runs the command.
     * @param message Message object
     * @param args Arguments
     * @param cancelCooldown Cancels cooldown when function called
     */
    abstract run(message: Message, args: string[], cancelCooldown?: () => void): Promise<any>;
}
