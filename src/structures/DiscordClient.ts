import { Client } from 'discord.js';
import dotenv from 'dotenv';

import Registry from '../classes/Registry';
import { IConfig } from '../utils/interfaces';

dotenv.config();

export default class DiscordClient extends Client {
    readonly registry: Registry;
    readonly config: IConfig;

    constructor() {
        super();

        this.config = {
            token: process.env.TOKEN as string,
            prefix: process.env.PREFIX as string,
            developers: JSON.parse(process.env.DEVELOPERS as string) as string[]
        };

        this.registry = new Registry(this);
        this.registry.registerAll();
    }
}
