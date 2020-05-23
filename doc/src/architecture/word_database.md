# Word database

The "word database" will be encoded as a series of **edges**. Each edge goes
*from* some text *to* some text. Each edge has a unique id that is a genuine UID
that is created when the edge is made, and is used to link to learning and the
like.

```json
{
    "id": "...",
    "fromText": "...",
    "toText: "...",
    "kind": "...",
}
```