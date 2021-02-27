import { Client } from 'discord.js';
import { ICommand, IEvent } from './../utils/interfaces';
import { commandList } from './client';

export class Handlers {
    static command(commands: Array<ICommand>): void {
        commands.forEach(command => commandList.set(command.config.name, command));
    }

    static event(client: Client, events: Array<IEvent>): void {
        events.forEach(event => client.on(event.name, event.onTriggered.bind(null, client)));
    }
}