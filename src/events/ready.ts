import { IEvent } from "../utils/interfaces";
import { ClientEvents } from "discord.js";
import { ClientLogger } from "../utils/logger";

export class ReadyEvent implements IEvent {
    name: keyof ClientEvents = "ready";

    onTriggered = async () => ClientLogger.log("SUCCESS", "Ready!");
}