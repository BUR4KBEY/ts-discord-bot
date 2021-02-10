import { Client, ClientEvents, Message } from "discord.js";
import { checkTheCommand } from "../utils/checkers";
import { IEvent } from "../utils/interfaces";

export class MessageEvent implements IEvent {
    name: keyof ClientEvents = "message";

    onTriggered = async (client: Client, message: Message) => {
        if (message.author.bot || message.channel.type == 'dm') return;
        await checkTheCommand(client, message);
    }
}