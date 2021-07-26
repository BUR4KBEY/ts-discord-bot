import 'discord.js';

declare module 'discord.js' {
    interface Message {
        lineReply(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
        lineReplyNoMention(content: APIMessageContentResolvable | (MessageOptions & { split?: false }) | MessageAdditions): Promise<Message>;
    }
}
