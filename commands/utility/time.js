import { SlashCommandBuilder } from "discord.js";
import * as chrono from 'chrono-node';

export const data = new SlashCommandBuilder()
    .setName('time')
    .setDescription('Translate the time Murat has given from human time to Murat time')
    .addStringOption(option =>
        option.setName('given_time')
            .setDescription('The time Murat gave')
            .setRequired(true)
    );

export async function execute(interaction) {
    const humanTime = interaction.options.getString('given_time')
    const parsedDate = chrono.parseDate(humanTime);

    if (!parsedDate) {
        return interaction.reply({
            content: `ERROR WITH TIME PLEASE TRY AGAIN. \n TIME GIVEN: "${humanTime}"`,
            ephemeral: true
        })
    }

    parsedDate.setHours(parsedDate.getHours() + 2)

    const discordTimeStamp = Math.floor(parsedDate.getTime() / 1000);

    await interaction.reply(`Murat said: ${humanTime}. \n He actually means: <t:${discordTimeStamp}:t>`)
}