import { ClientEvents } from 'discord.js';

import DiscordClient from './DiscordClient';

export default abstract class Event {
    /**
     * Discord client.
     */
    readonly client: DiscordClient;

    /**
     * Name of the event.
     */
    readonly name: keyof ClientEvents;

    constructor(client: DiscordClient, name: keyof ClientEvents) {
        this.client = client;
        this.name = name;
    }

    /**
     * Runs the event.
     * @param params Event parameters from [discord.js.org](https://discord.js.org/#/docs/main/stable/class/Client)
     */
    abstract run(...params: any | undefined): Promise<any>;
}
