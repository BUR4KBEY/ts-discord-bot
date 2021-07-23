import chalk from 'chalk';
import moment from 'moment-timezone';

import { LogType } from '../utils/types';

export default class Logger {
    /**
     * Logs your message with date to console.
     * @param type Type of log
     * @param message Log message
     * @param spaces Adds spaces above and under to log
     * @param format Custom format of date (Default: "DD/MM/YYYY HH:mm:ss")
     */
    static log(type: LogType, message: string, spaces: boolean = false, format: string = 'DD/MM/YYYY HH:mm:ss') {
        var color: 'green' | 'yellow' | 'red' | 'blue';

        switch (type) {
            case 'SUCCESS':
                color = 'green';
                break;
            case 'WARNING':
                color = 'yellow';
                break;
            case 'ERROR':
                color = 'red';
                break;
            case 'INFO':
                color = 'blue';
                break;
        }

        console.log(`${spaces ? '\n' : ''}${chalk.magenta(`${moment().format(format)}`)} ${chalk[color].bold(`${type}`)} ${message}${spaces ? '\n' : ''}`);
    }
}
