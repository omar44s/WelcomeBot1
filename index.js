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

        // حجم الصورة الجديد
        const canvas = Canvas.createCanvas(800, 450);
        const ctx = canvas.getContext('2d');

        // الخلفية
        const background = await Canvas.loadImage('./welcome.png');
        ctx.drawImage(background, 0, 0, 800, 450);

        // صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 256
            })
        );

        // مكان صورة العضو داخل الدائرة
        ctx.save();

        ctx.beginPath();
        ctx.arc(225, 225, 85, 0, Math.PI * 2, true);

        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 140, 140, 170, 170);

        ctx.restore();

        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome.png' }
        );

        await channel.send({
            content: ` أهلاً بك ${member} `,
            files: [attachment]
        });

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);