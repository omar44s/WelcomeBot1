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

        // حجم الصورة
        const canvas = Canvas.createCanvas(650, 350);
        const ctx = canvas.getContext('2d');

        // الخلفية
        const background = await Canvas.loadImage('./welcome.png');
        ctx.drawImage(background, 0, 0, 650, 350);

        // صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 256
            })
        );

        // تحديد مكان صورة العضو
        ctx.save();

        ctx.beginPath();
        ctx.arc(180, 175, 70, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        ctx.drawImage(avatar, 110, 105, 140, 140);

        ctx.restore();

        // إنشاء الصورة
        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome.png' }
        );

        // إرسال الترحيب
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