const {
    Client,
    GatewayIntentBits,
    AttachmentBuilder
} = require('discord.js');

const Canvas = require('canvas');

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

    const channel = member.guild.channels.cache.get('1520694287476588627');

    if (!channel) return;

    try {

        // حجم الصورة النهائي
        const canvas = Canvas.createCanvas(1000, 667);
        const ctx = canvas.getContext('2d');

        // الخلفية
        const background = await Canvas.loadImage('./welcome.png');
        ctx.drawImage(background, 0, 0, 1000, 667);

        // صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 512
            })
        );

        ctx.save();

        // الدائرة
        ctx.beginPath();
        ctx.arc(285, 300, 110, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // صورة العضو
        ctx.drawImage(avatar, 175, 190, 220, 220);

        ctx.restore();

        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome.png' }
        );

        await channel.send({
            content: `أهلاً بك ${member}`,
            files: [attachment]
        });

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);