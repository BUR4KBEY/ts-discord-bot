import chalk from 'chalk';
import { LOGTYPE } from './types';

export class ClientLogger {
    static log(type: LOGTYPE, message: string) {
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

        console.log(`${chalk[color].bold("Client >")} ${message}`);
    }
}