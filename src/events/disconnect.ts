import { IEvent } from "../utils/interfaces";
import { Client, ClientEvents } from "discord.js";
import chalk from 'chalk';

export class DisconnectEvent implements IEvent {
    name: keyof ClientEvents = "disconnect";

    onTriggered = async (client: Client) => {
        console.log(`${chalk.red.bold("Client >")} Disconnected!`);
        client.destroy();
    }
}