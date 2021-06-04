import { TestCommand } from "../commands/test";
import { ICommand } from "../utils/interfaces";

const commands: Array<ICommand> = [
    new TestCommand
];

export default commands;