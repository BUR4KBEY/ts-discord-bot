import { GuildMember, Message, MessageEmbed, TextChannel } from 'discord.js';

import DiscordClient from '../structures/DiscordClient';
import { formatSeconds, isUserDeveloper } from '../utils/functions';

export default class CommandHandler {
    /**
     * Handles the commands
     * @param message Message object
     */
    static async handleCommand(client: DiscordClient, message: Message) {
        const prefix = client.config.prefix;
        if (message.content.toLocaleLowerCase().indexOf(prefix) !== 0) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = (args.shift() as string).toLowerCase();

        const cmd = client.registry.findCommand(command);
        if (!cmd) return;

        if (cmd.info.enabled === false) return;
        if (cmd.info.onlyNsfw === true && !(message.channel as TextChannel).nsfw && !isUserDeveloper(client, message.author.id))
            return await message.channel.send(
                new MessageEmbed({
                    color: '#EEB4D5',
                    title: '🔞 Be Careful',
                    description: `${message.author}, you can't use this command on non-nsfw channels.`
                })
            );

        if (cmd.info.require) {
            if (cmd.info.require.developer && !isUserDeveloper(client, message.author.id)) return;
            if (cmd.info.require.permissions && !isUserDeveloper(client, message.author.id)) {
                const perms: string[] = [];
                cmd.info.require.permissions.forEach(permission => {
                    if ((message.member as GuildMember).permissions.has(permission)) return;
                    else return perms.push(`\`${permission}\``);
                });
                if (perms.length)
                    return await message.channel.send(
                        new MessageEmbed({
                            color: '#FCE100',
                            title: '⚠️ Missing Permissions',
                            description: `${message.author}, you must have these permissions to run this command.\n\n${perms.join('\n')}`
                        })
                    );
            }
        }

        var addCooldown = false;

        const now = Date.now();
        const timestamps = client.registry.getCooldownTimestamps(cmd.info.name);
        const cooldownAmount = cmd.info.cooldown ? cmd.info.cooldown * 1000 : 0;
        if (cmd.info.cooldown) {
            if (timestamps.has(message.author.id)) {
                const currentTime = timestamps.get(message.author.id);
                if (!currentTime) return;

                const expirationTime = currentTime + cooldownAmount;
                if (now < expirationTime) {
                    await message.delete();
                    const timeLeft = (expirationTime - now) / 1000;
                    return await message.channel
                        .send(
                            new MessageEmbed({
                                color: 'ORANGE',
                                title: '⏰ Calm Down',
                                description: `${message.author}, you must wait \`${formatSeconds(Math.floor(timeLeft))}\` to run this command.`
                            })
                        )
                        .then(async msg => await msg.delete({ timeout: 3000 }).catch(() => {}));
                }
            }

            addCooldown = true;
        }

        try {
            var applyCooldown = true;

            await cmd.run(message, args, () => {
                applyCooldown = false;
            });

            if (addCooldown && applyCooldown && !isUserDeveloper(client, message.author.id)) {
                timestamps.set(message.author.id, now);
                setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
            }
        } catch (error) {
            await cmd.onError(message, error);
        }
    }
}
