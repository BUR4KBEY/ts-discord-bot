import { IEvent } from "../utils/interfaces";
import { Client, ClientEvents } from "discord.js";
import { ClientLogger } from "../utils/logger";

export class DisconnectEvent implements IEvent {
    name: keyof ClientEvents = "disconnect";

    onTriggered = async (client: Client) => {
        ClientLogger.log("ERROR", "Disconnected!");
        client.destroy();
    }
}