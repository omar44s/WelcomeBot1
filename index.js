const {
    Client,
    GatewayIntentBits,
    EmbedBuilder,
    AttachmentBuilder
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('clientReady', () => {
    console.log(`${client.user.tag} is online!`);
});

client.on('guildMemberAdd', async (member) => {

    const channel = member.guild.channels.cache.get('YOUR_CHANNEL_ID');
    if (!channel) return;

    // البنر الموجود داخل ملفات البوت
    const banner = new AttachmentBuilder('./banner.png');

    const embed = new EmbedBuilder()
        .setColor('#B266FF')

        .setAuthor({
            name: member.user.username,
            iconURL: member.user.displayAvatarURL()
        })

        .setTitle('💜 Welcome To 7FR STORE ™')

        .setDescription(`
**مرحباً بك في 7FR STORE**

نتمنى لك وقتاً ممتعاً معنا ✨
        `)

        .addFields(
            {
                name: '👤 Member',
                value: `${member}`,
                inline: true
            },
            {
                name: '📅 Create Discord',
                value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`,
                inline: true
            },
            {
                name: '📈 Members',
                value: `${member.guild.memberCount}`,
                inline: true
            }
        )

        .setThumbnail(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 512
            })
        )

        .setImage('attachment://banner.png')

        .setFooter({
            text: 'Powered By | 7FR STORE 💜'
        })

        .setTimestamp();

    channel.send({
        content: `${member}`,
        embeds: [embed],
        files: [banner]
    });

});

client.login(process.env.TOKEN);