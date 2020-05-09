import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('TelegramMessageReceived');
    let userId = req.body.message.from.id;
    let userName = req.body.message.from.first_name;
    let chatId = req.body.message.chat.id;
    let text = req.body.message.text;
    context.bindings.userMessages = [{ userId, userName, chatId, text }];
    context.res = {
        body: "OK"
    };
};

export default httpTrigger;
