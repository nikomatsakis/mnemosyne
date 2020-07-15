export const USER_DOC_VERSION: number = 1;

export interface UserMessage {
    userId: string;
    userName: string;
    chatId: number;
    messageId: number;
    text: string;
}

export interface UserDoc {
    id: string,
    version: number,
    userName: string,
    chatId: number,
    stack: Array<Listener>,
}

export type Listener = (
    DefaultListener | SlashAddListener
);

export interface DefaultListener {
    name: "default";
}

export interface SlashAddListener {
    name: "slashAdd";
}

export interface AddWordState {
    name: "addWord";

    /// Defines which fields below are present
    state: number;

    /// Undefined at first, but eventually set to the text the user gave
    whatWordToAdd?: string;

    /// Message id of the "what word to add" message
    whatWordToAddMessageId?: number;

    /// What language is this word in? (Determined automatically)
    language?: string;

    /// How did the web translate this?
    automatic_translation?: string;

    /// How did user translate it?
    user_translation?: string;
}

export const ADD_WORD_ASKED_WHAT_WORD: number = 0;
export const ADD_WORD_ASKED_FOR_TRANSLATION: number = 1;

export interface OutgoingMessage {
    chatId: number;
    text: string;
}