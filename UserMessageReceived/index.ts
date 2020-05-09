import { AzureFunction, Context } from "@azure/functions"

const queueTrigger: AzureFunction = async function (context: Context, queueItem: string): Promise<void> {
    context.log('User message received', queueItem);
};

export default queueTrigger;
