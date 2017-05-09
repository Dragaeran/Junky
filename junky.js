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
const express = require('express')
const server = express()
let params = require("./params.json")

//##################################################################################
//################################### SERVER #######################################
//##################################################################################

server.get('/', function (req, res) {
    res.send('Hey it\'s junky\'s page!')
});

server.listen(3000, function () {
    console.log('Junky has it\s server listening on port 3000!')
});





//##################################################################################
//################################ DECLARATIONS ####################################
//##################################################################################


//TUMBLRS ARCHIVES
//hard
let moule = "https://jano-limites.tumblr.com/archive/";
let womenlover = "https://womenlover2014.tumblr.com/archive/"
let blackknees = "http://blacknees.tumblr.com/archive/"
let perfectredhead = "http://perfectredheads.tumblr.com/archive/"
let stunningred = "https://stunningredheads.tumblr.com/archive/"
let redHard = "http://cibucknel.tumblr.com/archive/"
let ginger = "http://ginger-redhead-and-hot.tumblr.com/archive/"


//soft
let bm = "http://dites.bonjourmadame.fr/archive/";
let babesinbed = "http://babes-in-bed.tumblr.com/archive/";
let pascalRousse = "http://redheadsexygirls.tumblr.com/archive/"
let pascalAddict = "http://veracious-venom.tumblr.com/archive/"
let pascalRussian = "https://russian--beauty.tumblr.com/archive/"
let pascalYoga = "http://sexyhottonedbabes.tumblr.com/archive/"
let pascalAsiat = "http://hot-asian-beauties.tumblr.com/archive/"
let pascalTatoo = "https://tattoogirls66.tumblr.com/archive/"
let pascalBeach = "http://69bk.tumblr.com/archive/"
let pascalLegs = "http://trautmans-legs.tumblr.com/archive/"
let pascalBabe = "http://babes-in-bed.tumblr.com/archive/"
let backside = "https://thebeautifulbackside.tumblr.com/archive/"
let backDimples = "http://sexyhotbackdimples.tumblr.com/archive/";
let sexyWomen = "http://everythingifindsexyaboutwomen.tumblr.com/archive/"
let sexyButt = "http://sexyhotbutts.tumblr.com/archive/"
let amazingAss = "http://justamazingass.tumblr.com/archive/"

//cosplay
let sexiestCosplay = "http://nerdynakedgirls.tumblr.com/archive/"
let cosplayBooties = "http://cosplay-booties.tumblr.com/archive/"
let cosplayHot = "https://cosplayhot22.tumblr.com/archive/"
let insanelyHotCosplay = "https://cosplayhot22.tumblr.com/archive/"

//#################################### ARRAYS ########################################
let softTumblrList = [
    bm,
    babesinbed,
    pascalAddict,
    pascalAsiat,
    pascalBabe,
    pascalBeach,
    pascalLegs,
    pascalRousse,
    pascalRussian,
    pascalTatoo,
    pascalYoga,
    backside,
    backDimples,
    sexyWomen,
    sexyButt,
    amazingAss
];


let hardTumblrList = [
    moule,
    womenlover,
    blackknees,
    perfectredhead,
    stunningred,
    redHard,
    ginger
];

let cosplayList = [
    sexiestCosplay,
    cosplayBooties,
    cosplayHot,
    insanelyHotCosplay
];

let addict = [pascalAddict];

let rousse = [pascalRousse];

let boule = [
    amazingAss,
    backDimples,
    sexyButt];

let beach = [pascalBeach];

let yoga = [pascalYoga];

let rousseHard = [
    blackknees,
    perfectredhead,
    stunningred,
    redHard,
    ginger
];


//CHANNELS
softCoreChannel = null;
hardCoreChannel = null;
debug = null;

//FEED
let feed = require('feed-read');
let RSSFEED_BM = "http://dites.bonjourmadame.fr/rss";


let hello_cmd = ["salut", "bonjour", "yo", "yop", "hey", "plop", "hi"];
let helpMsg = "Tiens, on demande mon aide ? Gaffe, tout est NSFW !\n" +
    "- !bm : affiche la dernière bm de la journée \n" +
    "- !ra: affiche une bombe aléatoire parmis tous les tumblr que nous compatriotes ont bien voulu me donner \n" +
    "- !rh : affiche une fracture de la rétine dans hardCoreChannel. T'es prévenu, 'y a d'la pêche et de l'oignon ! \n" +
    "- !rousse : Parce que l'Irlande c'est quand même un beau pays \n" +
    "- !addict : Je sais même pas ce que t'attends de ça mais pourquoi pas \n" +
    "- !boule : On veut de la bulle ? Du bon boulard des familles ? C'est ici ! \n" +
    "- !yoga : De l'amour des formes géométriques et du feng-shui \n" +
    "- !beach : Ahh, l'air iodé de la mer, le doux vent estival qui donne la chair de poule... \n";


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
function sendRandomTumblrPic(tumblrList, channel) {

    let tumblr = selectRandTumblr(tumblrList);

    let date = new Date();
    monthLimit = 12;
    randYear = Math.floor((Math.random() * 2) + 1) + 2014;

    randMonth = Math.floor((Math.random() * monthLimit) + 1);

    request({uri: tumblr + randYear + "/" + randMonth}, function (err, response, body) {
        if (err && response.statusCode !== 200)
            console.log('Request error.');
        let $ = cheerio.load(body);

        $body = $('body');
        $images = $body.find('.has_imageurl');

        let randIndex = Math.floor((Math.random() * $images.length) + 1);
        try {
            selectedImage = $images[randIndex].attribs['data-imageurl'];

            console.log("Image correspondante au %d, %s", randIndex, selectedImage);

            try {
                hackedImage = selectedImage.replace("250.", "500.");
            } catch (e) {
                console.log("Erreur dans le changement de taille :( C'est peut-être un gif ?")
            }

            let tumblrName = tumblr.replace("/archive/", "");
            channel.sendMessage("Vu sur " + tumblrName + ":");
            channel.sendMessage(hackedImage);

        } catch (e) {
            console.log("Erreur. Il n'y a pas d'image à cette date :( Cherchons ailleurs...");
            sendRandomTumblrPic(tumblrList, channel)
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


function selectRandTumblr(tumblrList) {
    let index = Math.floor((Math.random() * tumblrList.length));
    console.log(index + " : " + tumblrList[index]);
    return tumblrList[index]
}


//##################################################################################
//################################## CRON JOBS #####################################
//##################################################################################
let pauseMatin = new CronJob('00 00 10 * * 1-5', function () {
    softCoreChannel.sendMessage("Pause");
}, null, false, 'Europe/Paris');


let prepauseMatin = new CronJob('00 45 9 * * 1-5', function () {
    softCoreChannel.sendMessage("Prépause");
}, null, false, 'Europe/Paris');


//MIDI
let mangerMidi = new CronJob('00 00 12 * * 1-5', function () {
    softCoreChannel.sendMessage("On mange où ?");
}, null, false, 'Europe/Paris');


let mangerManger = new CronJob('00 15 12 * * 1-5', function () {
    softCoreChannel.sendMessage("MangerMangerManger");
}, null, false, 'Europe/Paris');


//SOIR
let pauseSoir = new CronJob('00 30 15 * * 1-5', function () {
    softCoreChannel.sendMessage("Pause");
}, null, false, 'Europe/Paris');


let prepauseSoir = new CronJob('00 15 15 * * 1-5', function () {
    softCoreChannel.sendMessage("Prépause");
}, null, false, 'Europe/Paris');

//############# MADAMES ################

//LAST BM

let matinBm = new CronJob('00 30 11 * * 1-5', function () {
    softCoreChannel.sendMessage("C'est l'heure de dire Bonjour Madame !");
    sendMadame(false, softCoreChannel);
}, null, false, 'Europe/Paris');


let bonjourBm = new CronJob('00 30 8 * * 1-5', function () {
    softCoreChannel.sendMessage("Salut les blaireaux !");
    sendRandomTumblrPic(softTumblrList, softCoreChannel);
}, null, false, 'Europe/Paris');


let soirBm = new CronJob('00 20 17 * * 1-5', function () {
    softCoreChannel.sendMessage("Et on dit Bonsoir Madame avant de se casser !");
    sendRandomTumblrPic(softTumblrList, softCoreChannel);
}, null, false, 'Europe/Paris');


let cronJobs = [
    matinBm,
    bonjourBm,
    soirBm,
    pauseMatin,
    prepauseMatin,
    pauseSoir,
    prepauseSoir,
    mangerManger,
    mangerMidi
]

//##################################################################################
//################################## REACTIONS #####################################
//##################################################################################

client.on('ready', () => {

    console.log('Connected !');

    //hardCoreChannel = client.channels.get(params.minoulandID);
    softCoreChannel = client.channels.get(params.softCoreChannel);
    debug = client.channels.get(params.debugID);

    console.log("Starting cron tasks...");

    debug.sendMessage("Junky started and ready to slap some asses.");

    for (let job in cronJobs) {
        cronJobs[job].start(softCoreChannel);
    }

    console.log("Tasks successfully started.")
});


client.on("disconnect", function () {
    console.log("Connection lost. Stopping Jobs...")
    for (let job in cronJobs) {
        cronJobs[job].stop();
    }
    console.log("Jobs Stopped.")
});

client.on("reconnecting", function () {
    console.log("Trying to reconnect...")
})

client.on("message", (message) => {
    hardCoreChannel = client.channels.get(params.hardCoreChannel);
    softCoreChannel = client.channels.get(params.softCoreChannel);
    debug = client.channels.get(params.debugID);

    let msg_content = message.content.toLowerCase();
    switch (msg_content) {

        case '!ra' :
            message.delete();
            sendRandomTumblrPic(softTumblrList, message.channel);
            break;

        case '!rh' :
            message.delete()
            sendRandomTumblrPic(hardTumblrList, hardCoreChannel);
            break;

        case contains(hello_cmd, msg_content):
            message.channel.sendMessage("Ta gueule.");
            break;

        case "!help":
            message.delete()
            message.channel.sendMessage(helpMsg);
            break;

        case '!bm' :
            message.delete()
            sendMadame(false, message.channel);
            break;

        case 'merci' :
            message.channel.sendMessage("De rien.");
            break;

        case '!rousse' :
            message.delete()
            sendRandomTumblrPic(rousse, message.channel)
            break;

        case '!addict' :
            message.delete()
            sendRandomTumblrPic(addict, message.channel)
            break;

        case '!rousse hard' :
            message.delete()
            sendRandomTumblrPic(rousseHard, hardCoreChannel)
            break;

        case '!cosplay' :
            message.delete()
            sendRandomTumblrPic(cosplayList, message.channel)
            break;

        case '!beach' :
            message.delete()

            sendRandomTumblrPic(beach, message.channel)
            break;

        case '!yoga' :
            message.delete()

            sendRandomTumblrPic(yoga, message.channel)
            break;

        case '!boule' :
            message.delete()
            sendRandomTumblrPic(boule, message.channel)
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


