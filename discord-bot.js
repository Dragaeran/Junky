/**
 * Created by Flavian on 11/04/2017.
 */
const Discord = require("discord.js");
const client = new Discord.Client();

client.login("MzAxMzcxMzYxOTQxNTIwMzg0.C86Bdw.cqhHcjbRihszoQtd8PbNdd8oyrk");

let feed =require('feed-read')

let RSSFEED_BM = "http://dites.bonjourmadame.fr/rss";



function sendMadame(random, message) {
    feed(RSSFEED_BM, function (err, articles) {
        index = 0;
        if (random) {
            index = Math.floor(Math.random() * (articles.length - 1));
        }
        let re = /<img[^>]+src="(http*:\/\/[^">]+)"/g;
        let results = re.exec(articles[index].content);
        message.channel.sendMessage(results[1])
    });
}






client.on('ready', () => {
    console.log('I am ready!');
})
;

client.on("message", (message) => {
    switch (message.content) {


        case '!rand' :
            sendMadame(true, message)
            break;

        case 'bm' :
            sendMadame(false, message)
            break;
        case 'merci' :
            message.channel.sendMessage("De rien.")
            break;
        default:
            break;
    }

    if (message.content.startsWith("ping")
    ) {
        message.channel.sendMessage("pong!");
    }
})
;