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
    console.log(`${client.user.tag} Online`);
});

client.on('guildMemberAdd', async member => {

    // آيدي روم الترحيب
    const channel = member.guild.channels.cache.get('1520694287476588627');

    if (!channel) return;

    try {

        // مقاس الصورة
        const canvas = Canvas.createCanvas(1024, 1536);
        const ctx = canvas.getContext('2d');

        // صورة الخلفية
        const background = await Canvas.loadImage('./welcome.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        // صورة العضو
        const avatar = await Canvas.loadImage(
            member.user.displayAvatarURL({
                extension: 'png',
                size: 1024
            })
        );

        ctx.save();

        // دائرة القص
        ctx.beginPath();
        ctx.arc(512, 730, 300, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // صورة العضو (تم إنزالها للأسفل)
        ctx.drawImage(avatar, 212, 550, 600, 600);

        ctx.restore();

        // إنشاء الصورة
        const attachment = new AttachmentBuilder(
            canvas.toBuffer('image/png'),
            { name: 'welcome-card.png' }
        );

        // إرسال الترحيب
        await channel.send({
            content: `# 💜 أهلاً بك ${member}\n## مرحباً بك في 7FR STORE`,
            files: [attachment]
        });

    } catch (error) {
        console.log(error);
    }

});

client.login(process.env.TOKEN);