export default class EnvError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'EnvError';
    }
}
