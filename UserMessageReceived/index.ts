import { AzureFunction, Context } from "@azure/functions"
import { UserMessage, UserDoc } from "../MnemosyneLib/types";

const queueTrigger: AzureFunction = async function (context: Context, message: UserMessage, userDoc: UserDoc): Promise<void> {
    context.log('* User message', message.text, 'received from', message.userName, 'with userDoc', userDoc);

    userDoc = createOrUpdateUser(context, message, userDoc);

    // Certain commands are recognized regardless of what mode we are currently in.
    if (message.text.startsWith("/add")) {

    }

    context.log("final user doc", userDoc);
    context.bindings.outUserDoc = userDoc;
    context.done();
};

function createOrUpdateUser(context: Context, message: UserMessage, userDoc: UserDoc): UserDoc {
    if (userDoc == null) {
        // Create a document if one doesn't exist already.
        return newUserDoc(context, message);
    } else {
        // Update the user name and chat-id with the latest we've seen from the chat service.
        userDoc.userName = message.userName;
        userDoc.chatId = message.chatId;
        return userDoc;
    }
}

function newUserDoc(context: Context, message: UserMessage): UserDoc {
    context.log("creating new user with id", message.userId);
    return {
        id: message.userId,
        userName: message.userName,
        chatId: message.chatId,
    };
}

export default queueTrigger;
