/**
 * Created by Flavian on 11/04/2017.
 */



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

let bm = "http://dites.bonjourmadame.fr/archive/";
let feed = require('feed-read');
let hello_cmd = ["salut", "bonjour", "yo", "yop", "hey", "plop", "hi"];
let RSSFEED_BM = "http://dites.bonjourmadame.fr/rss";

let helpMsg = "Tiens, on demande mon aide ? \n" +
    "- !bm : affiche la dernière bm de la journée \n" +
    "- !rand : affiche une bm aléatoire \n";


//##################################################################################
//################################## FUNCTIONS #####################################
//##################################################################################

//returns a random (or not) bm from the last ones. If false is given it will return the very last one bm.
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


//connect to bm archives and suck all the images in a given page, then returns a random one.
function sendRandomMadame(bm, channelID) {
    let date = new Date();
    dayLimit = 30;
    monthLimit = 12;
    randYear = Math.floor((Math.random() * 2) + 1) + 2015;

    if (randYear == date.getFullYear()) {
        monthLimit = date.getMonth();
    }

    randMonth = Math.floor((Math.random() * monthLimit) + 1);

    if (randMonth == date.getMonth()) dayLimit = date.getDay();
    else {
        if (randYear == 2016 && randMonth == 2)
            dayLimit = 28;
        else if (randMonth == 2)
            dayLimit = 27;
        else if (randMonth == 1 | 3 | 5 | 7 | 8 | 10 | 12)
            dayLimit = 31;

    }
    randDay = Math.floor((Math.random() * dayLimit) + 1);

    request({uri: bm + randYear + "/" + randMonth}, function (err, response, body) {
        if (err && response.statusCode !== 200)
            console.log('Request error.');
        let $ = cheerio.load(body);

        $body = $('body');
        $images = $body.find('.has_imageurl');

        console.log("Date  = %d %d %d", randDay, randMonth, randYear);
        try {
            selectedImage = $images[randDay].attribs['data-imageurl'];

            console.log("Image correspondante au %d, %s", randDay, selectedImage);
            try {
                 hackedImage = selectedImage.replace("250.jpg", "500.jpg");
            }catch (e) {
                 hackedImage = selectedImage.replace("250.png", "500.png");
            }

            channelID.sendMessage(hackedImage);

        } catch (e) {
            console.log("Erreur. Il n'y a pas d'image à cette date :(")
        }

    })
}


//returns either and object is present in a list, or false.
function contains(a, obj) {
    for (i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return obj;
        }
    }
    return false;
}


//##################################################################################
//################################## CRON JOBS #####################################
//##################################################################################

client.on('ready', () => {

    console.log('I am ready!');

    latruite = client.channels.get('240475080851718144');

    console.log("Starting cron tasks...");

    latruite.send("Junky started and ready to slap some asses.");

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
        sendMadame(false, latruite);

    }, null, true, 'Europe/Paris');

    console.log("Task successfully started.")
});

//##################################################################################
//################################## REACTIONS #####################################
//##################################################################################


client.on("message", (message) => {
    let msg_content = message.content.toLowerCase();
    switch (msg_content) {
        case '!rand' :
            sendRandomMadame(bm, message.channel);
            break;

        case contains(hello_cmd, msg_content):
            message.channel.sendMessage("Ta gueule.");
            break;

        case "!help":
            message.channel.sendMessage(helpMsg);
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

//##################################################################################
//################################### STARTUP ######################################
//##################################################################################
client.login(params.token);
