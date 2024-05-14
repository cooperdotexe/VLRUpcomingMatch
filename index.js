const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

async function vlrSearch(type, subject) {
    const searchResponse = await axios.get(`https://www.vlr.gg/search/?q=${subject}&type=${type}`);
    return searchResponse.data;
}

async function getResult() {
    //console.log(await vlrSearch()); 
    const userInput = await getUserInput();
    const type = userInput[0];
    const subject = userInput[1];
    const response = await vlrSearch(type, subject);
    const $searchPage = cheerio.load(response);
    const pageLink = $searchPage('a.wf-module-item.search-item.mod-first').attr('href');
    const teamPage = await axios.get(`https://www.vlr.gg${pageLink}`);
    const $teamPage = cheerio.load(teamPage.data);
}

async function getUserInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    const question = (query) => new Promise(resolve => rl.question(query, resolve));

    const type = await question('Enter search type (team/player): ');
    if (type !== 'team' && type !== 'player') {
        console.log('Invalid search type. Please try again, this time using either team or player');
    } else { 
        const subject = await question('Enter search subject: ');
    }

    rl.close();
    return [type, subject];
}

async function getPlayerMatches(player) {

}

getResult();