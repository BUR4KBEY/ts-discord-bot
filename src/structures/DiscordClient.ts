import { Client } from 'discord.js';
import dotenv from 'dotenv';

import Registry from '../classes/Registry';
import { IConfig } from '../utils/interfaces';

dotenv.config();

export default class DiscordClient extends Client {
    /**
     * Registry of the client.
     */
    readonly registry: Registry;

    /**
     * Config of the client.
     */
    readonly config: IConfig;

    constructor() {
        super();

        /**
         * Setting up client's config.
         */
        this.config = {
            token: process.env.TOKEN as string,
            prefix: process.env.PREFIX as string,
            developers: JSON.parse(process.env.DEVELOPERS as string) as string[]
        };

        /**
         * Creating new registry class.
         */
        this.registry = new Registry(this);

        /**
         * Registering events and commands.
         */
        this.registry.registerAll();
    }
}
