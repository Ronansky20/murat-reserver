import { indexSteamUsers } from "../indexSteamUsers.js";

const result = await indexSteamUsers('https://steamcommunity.com/profiles/76561199090705670/')
console.log(result)