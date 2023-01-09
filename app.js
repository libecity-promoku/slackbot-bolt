require('dotenv').config();
const { App } = require('@slack/bolt');

// ボットトークンと Signing Secret を使ってアプリを初期化します
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port: process.env.PORT || 3000
});

app.message('hellobot', async ({ message, say }) => {
  await say(`Hi, <@${message.user}>.`);
});

function dededeStringMaker() {
  let daRow = ['ダ','ヂ','ヅ','デ','ド'];
  let dededeString = '';

  for (let i = 0; i < 3; i++) {
    let randomNum = Math.floor(Math.random() * 5);
    dededeString = dededeString + daRow[randomNum];
  }

  if (dededeString === 'デデデ') {
    return ':tada: :dedede: デデデ大王 :dedede: :tada:';
  }
  return dededeString + '大王';
}

app.message('デデデ10連', async ({ say }) => {
  let dededeStrings = [];
  for (let i=0; i<10; i++) {
    dededeStrings.push(dededeStringMaker());
  }
  await say(dededeStrings.join('\n'));
});

(async () => {
  // アプリを起動します
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();