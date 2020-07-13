import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { UserMessage } from "../MnemosyneLib/types";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log(`TelegramMessageReceived(req = ${JSON.stringify(req.body)})`);
    if (req.body.message !== undefined) {
        // New message received:
        let userId = req.body.message.from.id.toString();
        let userName = req.body.message.from.first_name;
        let chatId = req.body.message.chat.id;
        let text = req.body.message.text;
        let messageId = req.body.message.message_id;
        let message: UserMessage = { userId, userName, messageId, chatId, text };
        context.bindings.userMessages = [message];
        context.res = {
            body: "OK"
        };
    }
};

export default httpTrigger;
