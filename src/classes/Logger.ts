import chalk from 'chalk';
import moment from 'moment-timezone';

import { LogType } from '../utils/types';

export default class Logger {
    static log(type: LogType, message: string, spaces: boolean = false) {
        var color: "green" | "yellow" | "red" | "blue";

        switch (type) {
            case 'SUCCESS':
                color = "green";
                break;
            case 'WARNING':
                color = "yellow";
                break;
            case 'ERROR':
                color = "red";
                break;
            case 'INFO':
                color = "blue";
                break;
        }

        console.log(`${spaces ? '\n' : ''}${chalk.magenta(`${moment().format("DD/MM/YYYY HH:mm:ss")}`)} ${chalk[color].bold(`${type}`)} ${message}${spaces ? '\n' : ''}`);
    }
}