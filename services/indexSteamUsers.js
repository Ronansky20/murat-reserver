import 'dotenv/config';

const token = process.env.STEAM_API_KEY;

function urlParser(profileUrl, type) {
    const url = new URL(profileUrl)
    const parts = url.pathname.split('/')
    const identifier = parts[parts.indexOf(type) + 1]

    return identifier
}

export async function indexSteamUsers(profileUrl) {
    if (profileUrl.includes('/id/')) {
        const vanityName = urlParser(profileUrl, 'id')

        const response = await fetch(`https://api.steampowered.com/ISteamUser/ResolveVanityURL/v1/?key=${token}&vanityurl=${vanityName}`)
        const data = await response.json()

        if (data.response.success === 1) {
            return await data.response.steamid
        } else {
            console.error('Steam API response error, please check if the entered profile is correct.')
        }
    } else if (profileUrl.includes('/profiles/')) {
        const steamId = urlParser(profileUrl, 'profiles')

        return steamId
    }
}