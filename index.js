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

client.once('ready', () => {
    console.log(`${client.user.tag} is online!`);
});

client.on('guildMemberAdd', async (member) => {

    // آيدي روم الترحيب
    const channel = member.guild.channels.cache.get('1520694287476588627');

    if (!channel) return;

    const canvas = Canvas.createCanvas(1024, 500);
    const ctx = canvas.getContext('2d');

    // صورة الخلفية
    const background = await Canvas.loadImage('./welcome.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // صورة العضو
    const avatar = await Canvas.loadImage(
        member.user.displayAvatarURL({
            extension: 'png',
            size: 256
        })
    );

    ctx.save();
    ctx.beginPath();
    ctx.arc(512, 180, 90, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(avatar, 422, 90, 180, 180);
    ctx.restore();

    // النص
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = 'bold 45px sans-serif';

    ctx.fillText(
        `${member.user.username}`,
        512,
        360
    );

    ctx.font = '30px sans-serif';

    ctx.fillText(
        'Welcome To The Server',
        512,
        410
    );

    const attachment = new AttachmentBuilder(
        canvas.toBuffer('image/png'),
        { name: 'welcome.png' }
    );

    channel.send({
        content: `أهلاً بك ${member}`,
        files: [attachment]
    });

});

client.login(process.env.TOKEN);