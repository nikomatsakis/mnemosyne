import { AzureFunction, Context } from "@azure/functions"
import { UserMessage, Listener, UserDoc, DefaultListener, USER_DOC_VERSION, SlashAddListener, OutgoingMessage } from "../MnemosyneLib/types";
import { defaultMaxListeners } from "stream";

const queueTrigger: AzureFunction = async function (context: Context, message: UserMessage, userDoc: UserDoc): Promise<void> {
    context.log('* User message', message.text, 'received from', message.userName, 'with userDoc', userDoc);

    context.bindings.telegramOutgoing = [];

    if (message.text === "/reset") {
        // Special case: /reset will always clear out the user and bring them to their initial state!
        context.log("hard reset");
        userDoc = resetUser(context, message);
    } else {
        userDoc = createOrUpdateUser(context, message, userDoc);

        let listener: Listener = (userDoc.stack.length == 0 ? { name: "default" } : userDoc.stack.pop());
        switch (listener.name) {
            case "default":
                defaultListener(context, userDoc, message);
                break;
            case "slashAdd":
                slashAddListener(context, userDoc, listener, message);
                break;
            default:
                return assertNever("bad listener", listener);
        }
    }

    context.log("final user doc", userDoc);
    context.bindings.outUserDoc = userDoc;
    context.done();
};

function resetUser(context: Context, message: UserMessage): UserDoc {
    let doc = newUserDoc(context, message);
    sendTelegramMessage(context, message, "Resetting user");
    return doc;
}

function createOrUpdateUser(context: Context, message: UserMessage, userDoc: UserDoc): UserDoc {
    if (userDoc == null) {
        // Create a document if one doesn't exist already.
        return newUserDoc(context, message);
    } else {
        // Update the user name and chat-id with the latest we've seen from the chat service.
        userDoc.userName = message.userName;
        userDoc.chatId = message.chatId;
        if (userDoc.version == undefined) {
            userDoc.version = 1;
        }
        if (userDoc.stack === undefined) {
            userDoc.stack = [];
        }

        return userDoc;
    }
}

function newUserDoc(context: Context, message: UserMessage): UserDoc {
    context.log("creating new user with id", message.userId);
    return {
        id: message.userId,
        version: USER_DOC_VERSION,
        userName: message.userName,
        chatId: message.chatId,
        stack: [],
    };
}

function defaultListener(context: Context, userDoc: UserDoc, message: UserMessage) {
    if (message.text == "/add") {
        sendTelegramMessage(context, message, "What word would you like to add?");
        userDoc.stack.push({ name: "slashAdd" });
    } else {
        sendTelegramMessage(context, message, "Message not understood! Try /help, perhaps?");
    }
}

function slashAddListener(context: Context, userDoc: UserDoc, listener: SlashAddListener, message: UserMessage) {
    let word = message.text;
    sendTelegramMessage(context, message, "(Adding words not implemented yet.)");
}

function assertNever(tag: string, x: never): never {
    throw new Error(`${tag}: ${JSON.stringify(x)}`);
}

function sendTelegramMessage(context: Context, message: UserMessage, text: string) {
    let outgoingMessage: OutgoingMessage = {
        chatId: message.chatId,
        text,
    };
    context.bindings.telegramOutgoing.push(outgoingMessage);
}

export default queueTrigger;
