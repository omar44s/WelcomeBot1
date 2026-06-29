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

        const canvas = Canvas.createCanvas(1000, 667);
        const ctx = canvas.getContext('2d');

        // الخلفية
        const background = await Canvas.loadImage('./welcome.png');

        // تكبير الخلفية وإزاحتها لليسار
        ctx.drawImage(background, -80, 0, 1150, 667);

        // صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 512
            })
        );

        ctx.save();

        // مكان الدائرة
        ctx.beginPath();
        ctx.arc(285, 300, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // مكان صورة العضو
        ctx.drawImage(avatar, 185, 200, 200, 200);

        ctx.restore();

        // كتابة النص أسفل الصورة
        ctx.font = 'bold 50px sans-serif';
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';

        ctx.fillText(
            `أهلاً بك ${member.user.username}`,
            500,
            630
        );

        // إنشاء الصورة
        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome.png' }
        );

        // إرسال الصورة فقط بدون نص فوق
        await channel.send({
            files: [attachment]
        });

        console.log(`Welcome sent to ${member.user.tag}`);

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);