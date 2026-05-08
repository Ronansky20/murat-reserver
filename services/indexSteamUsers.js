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
    } else if (profileUrl.includes('/profiles/')) {
        const vanityName = urlParser(profileUrl, 'profiles')
    }
}