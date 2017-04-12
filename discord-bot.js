/**
 * Created by Flavian on 11/04/2017.
 */
let port = process.env.PORT || 5000;


//##################################################################################
//################################### IMPORTS ######################################
//##################################################################################

const cheerio = require("cheerio");
const Discord = require("discord.js");
const client = new Discord.Client();
const CronJob = require('cron').CronJob;
const request = require('request')

let params = require("./params.json")
latruite = null;

//##################################################################################
//################################ DECLARATIONS ####################################
//##################################################################################

let bm = "http://dites.bonjourmadame.fr/archive/2016/1";
let feed = require('feed-read');
let hello_cmd = ["salut", "bonjour", "yo", "yop", "hey", "plop", "hi"];
let RSSFEED_BM = "http://dites.bonjourmadame.fr/rss";


//##################################################################################
//################################## FUNCTIONS #####################################
//##################################################################################


function sendMadame(random, channelID) {
    feed(RSSFEED_BM, function (err, articles) {
        index = 0;
        if (random) {
            index = Math.floor(Math.random() * (articles.length - 1));
        }
        let re = /<img[^>]+src="(http*:\/\/[^">]+)"/g;
        let results = re.exec(articles[index].content);
        channelID.sendMessage(results[1])
    });
}

function sendRandomMadame(bm) {
    request({uri: bm}, function (err, response, body) {
        let self = this;
        self.items = []
        if (err && response.statusCode !== 200)
            console.log('Request error.');
        let $ = cheerio.load(body);
        $body = $('body')
        $image = $body.find('.has_imageurl');

        $image.each(function (i, item) {
            let attribs = item.attribs
            console.log(attribs['data-imageurl'])
        })



    })


}

sendRandomMadame(bm);

function contains(a, obj) {
    for (i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return obj;
        }
    }
    return false;
}

//##################################################################################
//################################## REACTIONS #####################################
//##################################################################################

//##################################################################################
//################################## CRON JOBS #####################################
//##################################################################################

client.on('ready', () => {

    console.log('I am ready!');
    latruite = client.channels.get('240475080851718144');
    console.log("Starting cron tasks...");
    latruite.send("Junky started and ready to fap itself.");

    //MATIN
    new CronJob('00 00 10 * * 1-5', function () {
        latruite.sendMessage("Pause")
    }, null, true, 'Europe/Paris');


    new CronJob('00 50 9 * * 1-5', function () {
        latruite.sendMessage("Prépause");
    }, null, true, 'Europe/Paris');


    //MIDI
    new CronJob('00 00 12 * * 1-5', function () {
        latruite.sendMessage("On mange où ?");
    }, null, true, 'Europe/Paris');


    new CronJob('00 15 12 * * 1-5', function () {
        latruite.sendMessage("MangerMangerManger");
    }, null, true, 'Europe/Paris');


    //SOIR
    new CronJob('00 30 15 * * 1-5', function () {
        latruite.sendMessage("Pause");
    }, null, true, 'Europe/Paris');


    new CronJob('00 15 15 * * 1-5', function () {
        latruite.sendMessage("Prépause");
    }, null, true, 'Europe/Paris');


    //LAST BM

    new CronJob('00 30 10 * * 1-5', function () {
        latruite.sendMessage("Et on dit Bonjour Madame !");
        latruite.sendMadame(false, latruite);

    }, null, true, 'Europe/Paris');
});


client.on("message", (message) => {
    let msg_content = message.content.toLowerCase();
    switch (msg_content) {
        case '!rand' :
            sendMadame(true, message.channel);
            break;

        case contains(hello_cmd, msg_content):
            message.channel.sendMessage("Ta gueule.");
            break;

        case '!bm' :
            sendMadame(false, message.channel);
            break;
        case 'merci' :
            message.channel.sendMessage("De rien.");
            break;
        default:
            break;
    }
})
;


client.login(params.token);
