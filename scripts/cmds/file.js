const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "OtinXShiva",
    countDown: 5,
    role: 0,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["100053227594219", "61561143479695"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("𝙎𝙚𝙪𝙡𝙚 𝙢𝙖 𝙙𝙚𝙚𝙨𝙨𝙚 😍 𝙥𝙚𝙪𝙩 𝙪𝙩𝙞𝙡𝙞𝙨𝙚𝙧 𝙘𝙚𝙩𝙩𝙚 𝙛𝙤𝙣𝙘𝙩𝙞𝙤𝙣 😒", event.threadID, event.messageID);
    }
    
    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("le fichier ❓.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`𝘼𝙪𝙘𝙪𝙣𝙚 𝙘𝙢𝙙 𝙙𝙪 𝙣𝙤𝙢 𝙙𝙚 : ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};
