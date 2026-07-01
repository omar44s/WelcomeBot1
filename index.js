const {
    Client,
    GatewayIntentBits,
    EmbedBuilder
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('clientReady', () => {
    console.log(`${client.user.tag} Online`);
});

client.on('guildMemberAdd', async member => {

    const channel = member.guild.channels.cache.get('1520694287476588627');
    if (!channel) return;

    const embed = new EmbedBuilder()

        .setColor('#A855F7')

        .setAuthor({
            name: member.user.username,
            iconURL: member.user.displayAvatarURL({ dynamic: true })
        })

        .setTitle('Welcome To 7FR STORE ™')

        .addFields(
            {
                name: '👤 Member :',
                value: `${member}`,
                inline: true
            },
            {
                name: '📅 Create Discord :',
                value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
                inline: true
            },
            {
                name: '📈 Members :',
                value: `${member.guild.memberCount}`,
                inline: true
            }
        )

        .setThumbnail(
            'https://cdn.discordapp.com/embed/avatars/0.png'
        )

        // ضع هنا رابط البنر
        .setImage('https://chatgpt.com/backend-api/estuary/content?id=file_00000000fc5c71f8a95c003fa9a2c85e&ts=495252&p=fs&cid=1&sig=8347dc7aaaf474a2825f5351f4bf55c8c68dd758ea044006ec24c032181e58ab&v=0')

        .setFooter({
            text: 'Powered By | 7FR STORE 💜'
        })

        .setTimestamp();

    channel.send({
        content: `${member}`,
        embeds: [embed]
    });

});

client.login(process.env.TOKEN);