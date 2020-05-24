import { AzureFunction, Context } from "@azure/functions";
import fetch from "node-fetch";
import { OutgoingMessage } from "../MnemosyneLib/types";

const queueTrigger: AzureFunction = async function (context: Context, message: OutgoingMessage): Promise<void> {
    context.log('TelegramMessageDeliver received', message);

    let token = process.env["TELEGRAM_TOKEN"];
    let telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;
    let msg = {
        parse_mode: "Markdown",
        chat_id: message.chatId,
        text: message.text,
    };
    let response = await fetch(telegramUrl, {
        method: "POST",
        body: JSON.stringify(msg),
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
        context.log("response: ", response.status, response.statusText);
        context.log("body", await response.text());
    }
};

export default queueTrigger;
