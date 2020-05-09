# Databases

To start, we store out data in the following databases, each of which is a Cosmos DB instance:

* [User database] -- stores, for each user, their current state
* [Word database] -- collects words for all users

There is a separation between the "core logic", which is at least *theoretically* independent from how the user is interacting, and then the modules that interact with specific messaging systems. Here is the list of messaging systems we support:

* [Telegram] -- how we interact with telegram
* maybe more will be added later?

[User database]: ./architecture/user_database.md
[Word database]: ./architecture/word_database.md
[Telegram]: ./architecture/telegram.md
