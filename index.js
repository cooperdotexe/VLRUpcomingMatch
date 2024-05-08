const axios = require('axios');
const cheerio = require('cheerio');

async function vlrResponses() {
    const upcomingResponse = await axios.get('https://www.vlr.gg/matches');
    const previousResponse = await axios.get('https://www.vlr.gg/matches/results');
    return [upcomingResponse.data, previousResponse.data];
}

async function scrapeVLR() {
    console.log(await vlrResponses()); 
    response = await vlrResponses();
    up$ = cheerio.load(response[0]);
    prev$ = cheerio.load(response[1]);
    //const $ = cheerio.load(upcomingResponse.data);
    for (const key in up$('div').has('.wf-card')) {
        console.log(key);
    }
    //console.log(typeof up$('div').has('.wf-card'));
}

scrapeVLR();