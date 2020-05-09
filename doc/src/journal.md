# Design journal

## 2020.05.09

OK, I'm thinking about steps to take. I think a good first step would be to
create a Telegram bot that has the concept of a user (tied to the telegram user)
and where I can say "add word" and it goes into the "add word" modality.

This modality will ask for the text. When we get it, it will use 
[Microsoft's cognitive services][mcs] APIs to figure out what language the word is in.

[mcs]: https://docs.microsoft.com/en-us/azure/cognitive-services/translator/quickstart-detect?pivots=programming-language-javascript

## 2020.05.03

Reading a bit more about durable entities and durable functions. It seems like that is quite nice, though one thing not *entirely* clear to me is whether a durable entity can have an `async fn` as its methods.

One question I have: If I am using an ordinary function, and I want to call out to some web service, it looks like I can write an async function no problem. In fact, that's how my telegram bot works. But does a "durable entity" permit me to do so without being charged for the privilege (via a Context.callHttp request or whatever).