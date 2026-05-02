import { SlashCommandBuilder } from "discord.js";
import * as chrono from 'chrono-node';

export const data = new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Give schedule for the requested day of when murat has an available timeslot for an appointment')
    .addStringOption(option =>
        option.setName('given_day')
            .setDescription('The day you want to know murats schedule')
            .setRequired(true)
    );