import dotenv from 'dotenv';

import EnvError from '../errors/EnvError';

export default class EnvLoader {
    /**
     * Loads and validates .env file.
     */
    static load() {
        dotenv.config();
        this.validate(process.env);
    }

    /**
     * Validates the .env file.
     * @param env Env object
     */
    private static validate(env: any) {
        if (env.TOKEN === '') throw new EnvError('Discord token missing.');
        if (env.PREFIX === '') throw new EnvError('Prefix missing.');
        if (env.DEVELOPERS === '') throw new EnvError('Developers missing.');
        if (!env.DEVELOPERS.startsWith('[') || !env.DEVELOPERS.endsWith(']')) throw new EnvError('Developers must be an array.');

        try {
            JSON.parse(env.DEVELOPERS);
        } catch (_) {
            throw new EnvError('Developers must be an array.');
        }

        if (env.UNKNOWN_COMMAND_ERROR === '') throw new EnvError('Unknown command error missing');
        if (!['true', 'false'].includes(env.UNKNOWN_COMMAND_ERROR)) throw new EnvError('Unknown command error must be typeof boolean.');
    }
}
