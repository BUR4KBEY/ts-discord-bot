import { Client, Message } from "discord.js";
import { ICommand, ICommandConfig, ICommandRequire } from "../utils/interfaces";

export class TestCommand implements ICommand {
    config: ICommandConfig = {
        name: "test",
        aliases: [],
        cooldown: false,
        enabled: true
    };

    require: ICommandRequire = {
        developer: true,
        permissions: []
    };

    onTriggered = async (client: Client, message: Message, args: Array<string>) => {
        return message.reply('Working!');
    }
}