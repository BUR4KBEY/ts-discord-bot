import { ClientEvents } from 'discord.js';

import DiscordClient from './DiscordClient';

export default abstract class Event {
    readonly client: DiscordClient;
    readonly name: keyof ClientEvents | 'raw';

    constructor(client: DiscordClient, name: keyof ClientEvents | 'raw') {
        this.client = client;
        this.name = name;
    }

    /**
     * Runs the event.
     * @param params Parameters
     */
    abstract run(...params: any | undefined): Promise<any>;
}
