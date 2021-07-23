import 'moment-duration-format';

import moment from 'moment-timezone';

import DiscordClient from '../structures/DiscordClient';

const isConstructorProxyHandler = {
    construct() {
        return Object.prototype;
    }
};

export function isConstructor(func: any, _class: any) {
    try {
        new new Proxy(func, isConstructorProxyHandler)();
        if (!_class) return true;
        return func.prototype instanceof _class;
    } catch (err) {
        return false;
    }
}

/**
 * Checks user is a developer or not.
 * @param client Discord client
 * @param userId Discord id of the user
 */
export function isUserDeveloper(client: DiscordClient, userId: string) {
    return client.config.developers.includes(userId);
}

/**
 * Formats seconds and returns as given format.
 * @param seconds Seconds
 * @param format Custom format of output (Default: "Y [year] M [month] W [week] D [day] H [hour] m [minute] s [second]")
 */
export function formatSeconds(seconds: number, format: string = 'Y [year] M [month] W [week] D [day] H [hour] m [minute] s [second]'): string {
    const str = moment.duration(seconds, 'seconds').format(format);
    const arr = str.split(' ');
    var newStr = '';
    arr.forEach((value, index) => {
        if (isNaN(parseInt(value))) return;
        const val = parseInt(value);
        if (val === 0) return;
        else {
            const nextIndex = arr[index + 1];
            newStr += `${value} ${nextIndex} `;
        }
    });
    return newStr.trim();
}
