import { Message, MessageEmbed } from 'discord.js';

import Logger from '../classes/Logger';
import { ICommandInfo } from '../utils/interfaces';
import DiscordClient from './DiscordClient';

export default abstract class Command {
    readonly client: DiscordClient;
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
        await message.channel.send(new MessageEmbed({
            color: "RED",
            title: "💥 Oops...",
            description: `${message.author}, an error occurred while running this command. Please try again later.`
        }));
    }

    /**
     * Runs the command.
     * @param message Message object
     * @param args Arguments
     */
    abstract run(message: Message, args: string[]): Promise<any>;
}