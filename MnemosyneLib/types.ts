export interface UserMessage {
    userId: string;
    userName: string;
    chatId: number;
    text: string;
}

export interface UserDoc {
    id: string,
    userName: string,
    chatId: number,
}

export interface OutgoingMessage {
    chatId: number;
    text: string;
}