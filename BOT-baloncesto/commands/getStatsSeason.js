const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// functions


const createEmbed = (seasonData, player, date) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Jugador : ${player.data.first_name} ${player.data.last_name}, season: ${seasonData.data.data[0].season}`)
    .setURL(`https://www.hispanosnba.com/historia/temporadas-nba/${date}-${date - 1999}/clasificacion`)
    .setDescription(`Las estadisticas de ${player.data.first_name} ${player.data.last_name} en la season de ${date}`)
    .addFields(
      { name: 'Juegos', value: `${seasonData.data.data[0].games_played}`, inline: true },
      { name: 'FGM', value: `${seasonData.data.data[0].fgm}`, inline: true },
      { name: 'FGA', value: `${seasonData.data.data[0].fga}`, inline: true },
      { name: 'DREB', value: `${seasonData.data.data[0].dreb}`, inline: true },
      { name: 'REB', value: `${seasonData.data.data[0].reb}`, inline: true },
      { name: 'AST', value: `${seasonData.data.data[0].ast}`, inline: true },
      { name: 'PF', value: `${seasonData.data.data[0].pf}`, inline: true },
      { name: 'PTS', value: `${seasonData.data.data[0].pts}`, inline: true },
      { name: 'Turnover', value: `${seasonData.data.data[0].turnover}`, inline: true },

    )
    // .setImage(`${img}`)
    ;
  return exampleEmbed;
};


// comands
module.exports = {
  data: new SlashCommandBuilder()
    .setName('seasons-jugador')
    .setDescription('Muestra la informacion de un jugador.')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('primer nombre del jugador')
        .setRequired(true),
    ).addStringOption(option =>
      option
        .setName('apellido')
        .setDescription('primer apellido del jugador')
        .setRequired(true),
    ).addIntegerOption(option =>
      option
        .setName('season')
        .setDescription('año de la season')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {

      await interaction.deferReply();

      const playerName = (interaction.options.getString('nombre')).toLowerCase();
      const playerLast = (interaction.options.getString('apellido')).toLowerCase();
      const seasonDate = interaction.options.getInteger('season');

      const { data } = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}_${playerLast}`);


      const idPlayer = data.data[0].id;

      const playerData = await axios.get(`https://www.balldontlie.io/api/v1/players/${idPlayer}`);


      const seasonData = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=${seasonDate}&player_ids[]=${idPlayer}`);

      console.log(seasonData.data.data[0]);

      const embed = createEmbed(seasonData, playerData, seasonDate);


      await interaction.editReply({ embeds: [embed] });


    } catch (error) {
      console.log(error);
      await interaction.editReply('hubo un error');
    }
  },
};