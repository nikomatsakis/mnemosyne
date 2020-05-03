# Design journal

## 2020.05.03

Reading a bit more about durable entities and durable functions. It seems like that is quite nice, though one thing not *entirely* clear to me is whether a durable entity can have an `async fn` as its methods.

One question I have: If I am using an ordinary function, and I want to call out to some web service, it looks like I can write an async function no problem. In fact, that's how my telegram bot works. But does a "durable entity" permit me to do so without being charged for the privilege (via a Context.callHttp request or whatever).