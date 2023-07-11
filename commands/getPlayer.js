const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// functions


const createEmbed = (player, img, thumbnail, description) => {
  console.log(player.data.height_feet);
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${player.data.first_name} ${player.data.last_name}`)
    .setURL(`https://en.wikipedia.org/wiki/${player.data.first_name}`)
    .setDescription(`${description}`)
    .setThumbnail(`${thumbnail}`)
    .addFields(
      { name: 'Posicion', value: `${player.data.position}`, inline: true },
      { name: 'Team', value: `${player.data.team.full_name}`, inline: true },
      { name: 'Pies de altura', value: `${player.data.height_feet}`, inline: true },
    )
    .setImage(`${img}`)
    ;
  return exampleEmbed;
};


// comands
module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-jugador')
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
    ),
  async execute(interaction) {
    try {

      await interaction.deferReply();

      const playerName = (interaction.options.getString('nombre')).toLowerCase();
      const playerLast = (interaction.options.getString('apellido')).toLowerCase();


      const { data } = await axios.get(`https://www.balldontlie.io/api/v1/players?search=${playerName}_${playerLast}`);


      const idPlayer = data.data[0].id;


      const playerData = await axios.get(`https://www.balldontlie.io/api/v1/players/${idPlayer}`);

      console.log(playerData.data);

      const imgData = await axios.get(`https://serpapi.com/search.json?engine=google_images&q=${playerData.data.first_name}+${playerData.data.last_name}&google_domain=google.com&gl=us&hl=en&api_key=22b84a7bb73e70151349a93bdcbd757047a3330d17fa7290facc39b54fcdbeb7`);
      const img = imgData.data.images_results[0].original;
      const thumbnail = imgData.data.images_results[0].thumbnail;

      const descriptionData = await axios.get(`https://serpapi.com/search.json?engine=google&q=${playerData.data.first_name}+${playerData.data.last_name}&location=Austin%2C+Texas%2C+United+States&google_domain=google.com&gl=us&hl=es&api_key=22b84a7bb73e70151349a93bdcbd757047a3330d17fa7290facc39b54fcdbeb7`);
      const description = descriptionData.data.knowledge_graph.description;
      const embed = createEmbed(playerData, img, thumbnail, description);


      await interaction.editReply({ embeds: [embed] });


    } catch (error) {
      console.log(error);
      await interaction.editReply('hubo un error');
    }
  },
};