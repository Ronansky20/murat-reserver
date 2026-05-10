import { indexSteamUsers } from "./indexSteamUsers.js";
import fs from 'fs'
import 'dotenv/config';

const token = process.env.STEAM_API_KEY;

export async function indexSteamGames(profileUrl) {
    const steamId = await indexSteamUsers(profileUrl)

    const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${token}&steamid=${steamId}&include_appinfo=true`)
    const data = await response.json()
    const gameNames = data.response.games.map(game => game.name)

    let writeFileContent = {}

    try {
        writeFileContent = JSON.parse(fs.readFileSync('./data/games.json', 'utf-8'))
        writeFileContent[steamId] = gameNames
        fs.writeFileSync('./data/games.json', JSON.stringify(writeFileContent, null, 2))
        'Content has been written'
    } catch {
        const gameList = {
            [steamId]: gameNames
        }

        fs.writeFileSync('./data/games.json', JSON.stringify(gameList, null, 2))
        console.log('The file was empty, the data has been written.')
    }
}