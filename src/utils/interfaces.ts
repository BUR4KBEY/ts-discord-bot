import { ClientEvents, PermissionString } from "discord.js";

/** Interface for events */
export interface IEvent {
    /** Name of the event */
    name: keyof ClientEvents;
    /** Initializing the function when event triggered */
    onTriggered(...any: any): Promise<any>;
}

/** Interface for commands */
export interface ICommand {
    /** Configurations of the command */
    config: ICommandConfig;
    /** Requires of the command to be run */
    require: ICommandRequire;
    /** Initializing the function when event triggered. */
    onTriggered(...any: any): Promise<any>;
}

/** Configurations of the command */
export interface ICommandConfig {
    /** Name of the command */
    name: string;
    /** Aliases of the command */
    aliases: Array<string>;
    /** Cooldown of the command */
    cooldown: number | false;
    /** Status of the command */
    enabled: boolean;
}

/** Requires of the command to be run */
export interface ICommandRequire {
    /** User must be an developer of the client */
    developer: boolean;
    /** User must have that permissions on the guild  */
    permissions: Array<PermissionString>;
}