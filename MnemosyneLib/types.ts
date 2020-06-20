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
    stack: Array<AddWordState>
}

export interface AddWordState {
    name: "addWord";

    /// Defines which fields below are present
    state: number;

    /// Undefined at first, but eventually set to the text the user gave
    whatWordToAdd?: string;

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