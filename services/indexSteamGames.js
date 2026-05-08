import { indexSteamUsers } from "./indexSteamUsers.js";
import 'dotenv/config';

const token = process.env.STEAM_API_KEY;

export async function indexSteamGames(profileUrl) {
    const steamId = await indexSteamUsers(profileUrl)

    const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${token}&steamid=${steamId}&include_appinfo=true`)
    const data = await response.json()
    const gameNames = data.response.games.map(game => game.name)
    console.log(gameNames)
}