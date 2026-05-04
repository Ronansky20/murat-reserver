import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, GuildScheduledEventEntityType, GuildScheduledEventPrivacyLevel } from "discord.js";
import * as chrono from 'chrono-node';

const MURAT_ID = '846146160104177674'

export const data = new SlashCommandBuilder()
    .setName('playdate')
    .setDescription('Make an appointment for a playdate with Murat')
    .addStringOption(option =>
        option.setName('given_time')
            .setDescription('The time at which you want to have the playdate, bruv')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('activity')
            .setDescription('The activity for the playdate')
            .setRequired(true)
    );

export async function execute(interaction) {
    const humanTime = interaction.options.getString('given_time')
    const parsedDate = chrono.parseDate(humanTime)

    if (!parsedDate) {
        return interaction.reply({
            content: `ERROR WITH TIME PLEASE TRY AGAIN. \n TIME GIVEN: "${humanTime}"`,
            ephemeral: true
        })
    }

    const proposedTimestamp = Math.floor(parsedDate.getTime() / 1000)

    parsedDate.setHours(parsedDate.getHours() + 2);
    const discordTimestamp = Math.floor(parsedDate.getTime() / 1000);

    const playdateActivity = interaction.options.getString('activity')

    const confirm = new ButtonBuilder()
        .setCustomId('confirm_playdate')
        .setLabel('yes bruv I can play then.')
        .setStyle(ButtonStyle.Success);

    const deny = new ButtonBuilder()
        .setCustomId('deny_playdate')
        .setLabel('Im not home brevvvvvv')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().addComponents(confirm, deny);

    const response = await interaction.reply({
        content: `Oi bruv <@${MURAT_ID}> \n\n<@${interaction.user.id}> wants to arrange a playdate to play ${playdateActivity}.\nThey wanna play at <t:${proposedTimestamp}:t>, you leng then bruv?`,
        components: [row],
    });

    const collectorFilter = async (i) => {
        if (i.user.id === MURAT_ID) {
            return true
        } else {
            await i.reply({ content: 'this message is only for murat to click this button.', ephemeral: true })
            return false;
        }
    };

    try {
        const confirmation = await response.awaitMessageComponent({ filter: collectorFilter });

        if (confirmation.customId === 'confirm_playdate') {
            const eventManager = interaction.guild.scheduledEvents;

            try {
                const newEvent = await eventManager.create({
                    name: playdateActivity,
                    scheduledStartTime: parsedDate,
                    scheduledEndTime: new Date(parsedDate.getTime() + (60 * 60 * 1000)),
                    privacyLevel: GuildScheduledEventPrivacyLevel.GuildOnly,
                    entityType: GuildScheduledEventEntityType.Voice,
                    channel: '1118945553259171965',
                    description: `Play ${playdateActivity} with the gang.`,
                    reason: `Made by ${interaction.user.username}`
                })

                await confirmation.update({
                    content: `**PLAYDATE CONFIRMED!** \nMurat has agreed fam. He will be there at <t:${proposedTimestamp}:t>.`,
                    components: []
                });
            } catch (eventError) {
                console.error("Failed to create the scheduled event:", eventError);

                await confirmation.update({
                    content: `**PLAYDATE CONFIRMED!** \nMurat has agreed fam. He will be there at <t:${proposedTimestamp}:t>. However I wasn't able to make the event brotha, please dm Ronan something got shanked chief`,
                    components: []
                })
            }

        } else if (confirmation.customId === 'deny_playdate') {
            await confirmation.update({
                content: `**PLAYDATE DENIED** \nMurat ain't home at <t:${proposedTimestamp}:t> dawg`,
                components: []
            });
        }
    } catch (e) {
        console.log("The reservation message was deleted before Murat could respond.");
    }
}