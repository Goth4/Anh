 module.exports = {
  config: {
    name: "set",
    aliases: ['ap'],
    version: "1.0",
    author: "Samir B. Thakuri",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["61556662494233", "100053227594219", "61561143479695"];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("💥 | 𝙏𝙐 𝙑𝙀𝙐𝙓 𝙈𝙊𝙐𝙍𝙄𝙍 ? 💢 ", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("................................. \n💥 | 𝑻'𝒂𝒔 𝑴𝒂𝒍 𝑪𝒐𝒎𝒑𝒐𝒔𝒆́.. ⚜  \n \nUsage: set [query] [amount] ", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("..................................... \n💥 | 𝒇𝒂𝒄𝒉𝒆 𝒑𝒆𝒓𝒔𝒐𝒏𝒏𝒆. 𝑹𝒆𝒗𝒐𝒊𝒆𝒔 𝒃𝒊𝒆𝒏 𝒄'𝒒𝒖𝒆 𝑻'𝒂𝒔 𝑻𝒂𝒑𝒆 (𝑼𝒔𝒆𝒓)", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(` ${amount} 𝒑𝒐𝒊𝒏𝒕𝒔 𝒅'𝑬𝒙𝒑𝒆́𝒓𝒊𝒆𝒏𝒄𝒆 𝒅𝒐𝒏𝒏𝒆́𝒔 𝒂̀ ${name}.`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`𝑼𝒏𝒆 𝒔𝒐𝒎𝒎𝒆 𝒅𝒆 ${amount}  $  𝒅𝒐𝒏𝒏𝒆́𝒆 𝒂̀ ${name}.`, threadID);
    } else {
      return api.sendMessage("Invalid query. Use 'exp' to set experience points or 'money' to set coins.", threadID);
    }
  }
};
