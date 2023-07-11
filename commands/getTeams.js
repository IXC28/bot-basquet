const { default: axios } = require('axios');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// functions


const createEmbed = (TeamData, img, thumbnail, description) => {
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`${TeamData.data.full_name}`)
    .setURL(`https://en.wikipedia.org/wiki/${TeamData.data.name}`)
    .setDescription(`${description}`)
    .setThumbnail(`${thumbnail}`)
    .addFields(
      { name: 'Abbreviation', value: `${TeamData.data.abbreviation}`, inline: true },
      { name: 'Conference', value: `${TeamData.data.conference}`, inline: true },
      { name: 'Division', value: `${TeamData.data.division}`, inline: true },
    )
    .setImage(`${img}`)
    ;
  return exampleEmbed;
};


// comands
module.exports = {
  data: new SlashCommandBuilder()
    .setName('buscar-equipo')
    .setDescription('Muestra la informacion de un equipo.')
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
      console.log(teamData.data.full_name);
      const imgData = await axios.get(`https://serpapi.com/search.json?engine=google_images&q=${teamData.data.full_name}&google_domain=google.com&gl=us&hl=en&api_key=22b84a7bb73e70151349a93bdcbd757047a3330d17fa7290facc39b54fcdbeb7`);
      const img = imgData.data.images_results[0].original;
      const thumbnail = imgData.data.images_results[0].thumbnail;
      console.log(img);

      const descriptionData = await axios.get(`https://serpapi.com/search.json?engine=google&q=$${teamData.data.full_name}&location=Austin%2C+Texas%2C+United+States&google_domain=google.com&gl=us&hl=es&api_key=22b84a7bb73e70151349a93bdcbd757047a3330d17fa7290facc39b54fcdbeb7`);
      const description = descriptionData.data.knowledge_graph.description;

      const embed = createEmbed(teamData, img, thumbnail, description);


      await interaction.editReply({ embeds: [embed] });


    } catch (error) {
      console.log(error);
      await interaction.editReply('hubo un error');
    }
  },
};