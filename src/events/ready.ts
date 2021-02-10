import { IEvent } from "../utils/interfaces";
import { ClientEvents } from "discord.js";
import chalk from 'chalk';

export class ReadyEvent implements IEvent {
    name: keyof ClientEvents = "ready";

    onTriggered = async () => console.log(`${chalk.green.bold("Client >")} Ready!`);
}