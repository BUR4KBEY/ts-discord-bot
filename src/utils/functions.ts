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

export function isUserDeveloper(client: DiscordClient, userId: string) {
    return client.config.developers.includes(userId);
}

export function formatSeconds(seconds: number): string {
    const str = moment.duration(seconds, 'seconds').format('Y [year] M [month] W [week] D [day] H [hour] m [minute] s [second]');
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
