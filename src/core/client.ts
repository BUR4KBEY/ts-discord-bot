import { Client, Collection } from "discord.js";
import { events } from "../definitions/events";
import { commands } from "../definitions/commands";
import { ICommand } from "../utils/interfaces";
import { Handlers } from "./handlers";

/** The client */
export const client = new Client();

/** Config of the client */
export const config = {
    token: "Bot Token",
    prefix: "Prefix",
    developers: ['Discord ID']
};

/** Collection of the commands */
export const commandList = new Collection<string, ICommand>();

/** Handling the events */
Handlers.event(client, events);

/** Handling the commands */
Handlers.command(commands);