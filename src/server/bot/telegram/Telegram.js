import telegramBot from 'node-telegram-bot-api';
import * as dotenv from 'dotenv';
dotenv.config();

// import get from 'superagent';
// import { load } from 'cheerio';


const token = process.env.TELEGRAM_TOKEN || "Token not configured";
const bot = new telegramBot(token, { polling: false });
const staticUseId = process.env.TELEGRAM_USERID;

function botSay(msg) {

    bot.sendMessage(staticUseId, msg).catch((error) => {
        if (true) {
            bot.sendMessage(staticUseId, 'Erro ao enviar mensagem!');
        } else {
            console.log("User id not configured");
        }
    });

}

bot.on('message', (msg) => {

    let userID = msg.chat.id;
    let messageUser = msg.text;

    let answer = 'Certo, você digitou: ' + messageUser + ' e se seu id é: ' + msg.chat.id;
    // msg.enableHtml(true);

    bot.sendMessage(userID, answer).catch((error) => {
        bot.sendMessage(userID, 'Erro ao enviar mensagem!');
    });

    // let url = 'https://explainshell.com/explain?cmd=' + messageUser;
    // get(url, (err, res) => {
    //     if (err) throw err;

    //     let $ = load(res.text),
    //         answer = $('.help-box').text(),
    //         errorMessage = "Oi aqui é o bot do caria (by Ivan), comando linux inválido. tente ls";

    //     bot.sendMessage(userID, answer).catch((error) => {
    //         bot.sendMessage(userID, errorMessage);
    //     });
    // });
});

export { bot, botSay };