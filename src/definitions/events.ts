import { IEvent } from "../utils/interfaces";
import { ReadyEvent } from "../events/ready";
import { MessageEvent } from "../events/message";
import { DisconnectEvent } from "../events/disconnect";

const events: Array<IEvent> = [
    new ReadyEvent,
    new MessageEvent,
    new DisconnectEvent
];

export default events;