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

        // حجم الصورة
        const canvas = Canvas.createCanvas(768, 512);
        const ctx = canvas.getContext('2d');

        // تحميل الخلفية
        const background = await Canvas.loadImage('./welcome.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // تحميل صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 512
            })
        );

        // وضع صورة العضو داخل الدائرة
        ctx.save();

        ctx.beginPath();
        ctx.arc(220, 250, 80, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 140, 170, 160, 160);

        ctx.restore();

        // إنشاء الصورة
        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome.png' }
        );

        // إرسال الرسالة
        await channel.send({
            content: `أهلاً بك ${member}`,
            files: [attachment]
        });

        console.log(`Welcome sent to ${member.user.tag}`);

    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);