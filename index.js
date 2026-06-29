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

    // آيدي روم الترحيب
    const channel = member.guild.channels.cache.get('1520694287476588627');

    if (!channel) return;

    try {

        const canvas = Canvas.createCanvas(1024, 500);
        const ctx = canvas.getContext('2d');

        // تحميل الخلفية
        const background = await Canvas.loadImage('./welcome.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // تحميل صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 256
            })
        );

        // مكان صورة العضو
        ctx.save();

        ctx.beginPath();
        ctx.arc(290, 250, 115, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 175, 135, 230, 230);

        ctx.restore();

        // اسم العضو
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.font = 'bold 45px sans-serif';

        ctx.fillText(
            member.user.username,
            760,
            410
        );

        // إنشاء الصورة
        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome.png' }
        );

        // إرسال الرسالة
        await channel.send({
            content: ` أهلاً بك ${member} `,
            files: [attachment]
        });

        console.log(`Welcome sent to ${member.user.tag}`);

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);