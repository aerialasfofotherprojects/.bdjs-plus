# Important
* Follow these or your bot will not work
- Make sure that your bot has GUILDS intent and GUILDMESSAGES intent
- Make sure to have done `npm install discord.js` since it depends on it
- Don't use `discord.js-commando`
# Simple Code
* Code to make your first bot:
```js
const bdjs = require('bdjsPlus');

createBot('BotToken', 'prefix');
intents(['INTENT','INTENT','INTENT']);

// The commands
```
