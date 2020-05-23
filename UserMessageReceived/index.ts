import { AzureFunction, Context } from "@azure/functions"

interface UserMessage {
    userId: string;
    userName: string;
    chatId: number;
    text: string;
}

const queueTrigger: AzureFunction = async function (context: Context, queueItem: UserMessage): Promise<void> {
    context.log('User message received from', queueItem.userName);



    // Certain commands are recognized regardless of what mode we are currently in.
    if (queueItem.text.startsWith("/add")) {

    }
};

export default queueTrigger;
