import 'dotenv/config';
//import config from './config.json' with { type: 'json' };

import { Client, Events, GatewayIntentBits, REST, Routes } from 'discord.js';

const token = process.env.DISCORD_TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = [
    {
        name: "time",
        description: "Translate the time Murat has given from human time to Murat time"
    },
    {
        name: "reserve",
        description: "Reserve a timeframe to be able to be in Murat's presence."
    }
];

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Murat Reserver online, logged in as ${readyClient.user.tag}`);
});

client.login(token);