export default class RegistryError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RegistryError';
    }
}
