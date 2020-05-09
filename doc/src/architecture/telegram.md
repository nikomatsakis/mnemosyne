# Telegram

## Links

* [Telegram Bots API manual](https://core.telegram.org/bots/api)

## Receiving messages

We use a [webhook] to have message delivered:

* [Documentation for telegram updates](https://core.telegram.org/bots/api#update)

[webhook]: https://core.telegram.org/bots/api#setwebhook

## User id

The user id when interacting with telegram

## Receiving user requests

When we receive messages from a Telegram user, they have the following shape ([doc](https://core.telegram.org/bots/api#message)):

```json
{
    message: {
        from: {
            id: "...",
            first_name: "...",
        },
        chat: {
            id: "...",
        }
        text: "..." # text the user sent
    }
}
```

## Responding to the user