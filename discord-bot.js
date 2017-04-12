/**
 * Created by Flavian on 11/04/2017.
 */

//##################################################################################
//################################### IMPORTS ######################################
//##################################################################################

const Discord = require("discord.js");
const client = new Discord.Client();
const CronJob = require('cron').CronJob;


//##################################################################################
//################################ DECLARATIONS ####################################
//##################################################################################


let feed = require('feed-read');
let hello_cmd = ["salut", "bonjour", "yo", "yop", "hey", "plop", "hi"];
let RSSFEED_BM = "http://dites.bonjourmadame.fr/rss";

client.login("MzAxMzcxMzYxOTQxNTIwMzg0.C86Bdw.cqhHcjbRihszoQtd8PbNdd8oyrk");


//##################################################################################
//################################## CRON JOBS #####################################
//##################################################################################


//MATIN

new CronJob('00 00 10 * * 1-5', function() {
    client.sendMessage("240475080851718144", "Pause");
}, null, true, 'Europe/Paris');


new CronJob('00 50 9 * * 1-5', function() {
    client.sendMessage("240475080851718144", "Prépause");
}, null, true, 'Europe/Paris');


//MIDI

new CronJob('00 00 12 * * 1-5', function() {
    client.sendMessage("240475080851718144", "On mange où ?");
}, null, true, 'Europe/Paris');


new CronJob('00 15 12 * * 1-5', function() {
    client.sendMessage("240475080851718144", "MangerMangerManger");
}, null, true, 'Europe/Paris');


//SOIR

new CronJob('00 30 15 * * 1-5', function() {
    client.sendMessage("240475080851718144", "Pause");
}, null, true, 'Europe/Paris');


new CronJob('00 15 15 * * 1-5', function() {
    client.sendMessage("240475080851718144", "Prépause");
}, null, true, 'Europe/Paris');


//##################################################################################
//################################## FUNCTIONS #####################################
//##################################################################################



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


function contains(a, obj) {
    for ( i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return obj;
        }
    }
    return false;
}

//##################################################################################
//################################## REACTIONS #####################################
//##################################################################################



client.on('ready', () => {
    console.log('I am ready!');
});


client.on("message", (message) => {

    let msg_content = message.content.toLowerCase();
    switch (msg_content) {
        case '!rand' :
            sendMadame(true, message);
            break;
        case contains(hello_cmd,msg_content):
            message.channel.sendMessage("Ta gueule.");
            break;

        case '!bm' :
            sendMadame(false, message);
            break;
        case 'merci' :
            message.channel.sendMessage("De rien.");
            break;
        default:
            break;
    }
})
;