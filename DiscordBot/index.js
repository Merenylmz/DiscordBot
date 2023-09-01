// import { Client, GatewayIntentBits } from 'discord.js';
const { Client, GatewayIntentBits, REST, Routes} = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", ()=>{
    console.log(`${client.user.tag} Oturum Açtınız`);
});

client.on("messageCreate", (message)=>{
    console.log(message.content);
    if (message.content == "merhaba" || message.content == "Merhaba") {
        message.reply({
            content: "Merhaba Dostum"
        });
    }
});

client.on("interactionCreate", async(interaction)=>{
    if (!interaction.isChatInputCommand()) return;

    console.log(interaction);
    if (interaction.commandName.toLowerCase() == "deneme") {
        const userName = interaction.options.getString("kullanici_adi");

        if (!userName) {
            return await interaction.reply("Kullanıcı adı belirtmediniz!");
        }

        const memberToKick = interaction.guild.members.cache.find(
            (member) => member.user.username.toLowerCase() === userName.toLowerCase()
        );

        if (!memberToKick) {
            return await interaction.reply("Kullanıcı bulunamadı!");
        }

        try {
            await memberToKick.kick();
            await interaction.reply(`${userName} kullanıcısı başarıyla sunucudan çıkarıldı.`);
        } catch (error) {
            await interaction.reply("Kullanıcı çıkarılırken bir hata oluştu!");
            console.error(error);
        }
    }
    await interaction.reply("Pong");
});

client.login("***discord Bot Token***");


const commands = [
  {
    name: 'createurl',
    description: 'This Command is for create a url',
  },
  {
    name: "deneme",
    description: "asdsadsadsadasdsadasd"
  }
];

(
    async()=>{
        const rest = new REST({ version: '10' }).setToken("***discord Bot Token***");

        try {
          console.log('Started refreshing application (/) commands.');
        
          await rest.put(Routes.applicationCommands("***discord Bot application command***"), { body: commands });
        
          console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
          console.error(error);
        }
    }
)()
