const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// functions


const createEmbed = (TeamData, games) => {
  const exampleEmbed1 = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${TeamData.data.full_name} Games`)
    .addFields(
      { name: 'Home team', value: `${games.home_team.full_name}`, inline: true },
      { name: 'Home Team Score', value: `${games.home_team_score}`, inline: false },
      { name: 'Visitor Team', value: `${games.visitor_team.full_name}`, inline: true },
      { name: 'Visitor Team Score', value: `${games.visitor_team_score}`, inline: false },
      { name: 'Season', value: `${games.season}`, inline: true },


    )
   ;
  return exampleEmbed1;
};


// comands
module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-juegos')
    .setDescription('Muestra la informacion de los 3 ultimos juegos de un equipo.')
    .addStringOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre del equipo')
        .setRequired(true),
    ),
  async execute(interaction) {
    try {

      await interaction.deferReply();

      const teamName = (interaction.options.getString('nombre')).toLowerCase();

      const { data } = await axios.get('https://www.balldontlie.io/api/v1/teams');

      const dataData = data.data;
      const teamFilter = dataData.filter(elemento => elemento.name.toLowerCase() === String(teamName));


      const idTeam = teamFilter[0].id;
      const teamData = await axios.get(`https://www.balldontlie.io/api/v1/teams/${idTeam}`);


      const gamesData = await axios.get(`https://www.balldontlie.io/api/v1/games?team_ids[]=${idTeam}`);
      const game1 = gamesData.data.data[0];
      const game2 = gamesData.data.data[1];
      const game3 = gamesData.data.data[2];

      const embed1 = createEmbed(teamData, game1);
      const embed2 = createEmbed(teamData, game2);
      const embed3 = createEmbed(teamData, game3);


      await interaction.editReply({ embeds: [embed1, embed2, embed3] });


    } catch (error) {
      console.log(error);
      await interaction.editReply('hubo un error');
    }
  },
};