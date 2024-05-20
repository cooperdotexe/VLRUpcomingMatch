const axios = require('axios');
const cheerio = require('cheerio');
const readline = require('readline');

async function vlrSearch(type, subject) {
    const searchResponse = await axios.get(`https://www.vlr.gg/search/?q=${subject}&type=${type}`);
    return searchResponse.data;
}

async function getResult() {
    const userInput = await getUserInput();
    const type = userInput[0].toLowerCase();
    const subject = userInput[1];
    console.log(`Searching for ${type} ${subject}`)
    const response = await vlrSearch(type, subject);
    const $searchPage = cheerio.load(response);
    const pageLink = $searchPage('a.wf-module-item.search-item.mod-first').attr('href');
    let subjectResponse;
    if (type === 'team'){
         subjectResponse = await getTeamPage(pageLink);
    } else {
         subjectResponse = await getPlayerPage(pageLink);
    };
    $subjectPage = cheerio.load(subjectResponse);
    if (type === 'player') {
        const teamLink = $subjectPage('.wf-module-item.mod-first').attr('href');
        const teamResponse = await getTeamPage(teamLink);
        $teamPage = cheerio.load(teamResponse);
        getNextMatch($teamPage, subject);
    } else {
        getNextMatch($subjectPage, subject);
    }
}

async function getUserInput() {
    let answered1 = false;
    let answered2 = false;
    let answers = [];
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    const question = (query) => new Promise(resolve => rl.question(query, resolve));

    while (!answered1) {
        const type = await question('Enter search type, either team or player: ');
        if (type !== 'team' && type !== 'player') {
            console.log('Invalid search type. Please try again, this time using either team or player');
        } else { 
            answered1 = true;
            answers.push(type);
        }    
    }
    while(!answered2 && answered1) {
        const subject = await question('Enter search subject (player/team name): ');
        if (subject === '') {
            console.log('Invalid search subject. Please try again.');
        } else {
            answered2 = true;
            answers.push(subject);
        }
    }
    
    rl.close();
    return answers;
}

async function getPlayerPage(pageLink) {
    const playerPage = await axios.get(`https://www.vlr.gg${pageLink}`);
    return playerPage.data;
}

async function getTeamPage(pageLink) {
    const teamPage = await axios.get(`https://www.vlr.gg${pageLink}`);
    return teamPage.data;
}

async function getNextMatch($subjectPage, subject) {
    const nextMatch = $subjectPage('.wf-card.fc-flex.m-item').find('.m-item-date').text();
        const lines = nextMatch.trim().split('\n');
        let firstDate;
        let firstTime;
    for (let i = 0; i < lines.length; i++) {
        const trimmedLine = lines[i].trim();
        if(trimmedLine) {
            if (!firstDate) {
                firstDate = new Date(Date.parse(trimmedLine));
            } else if (!firstTime) {
                firstTime = trimmedLine;
                break;
            }
        }
    }

console.log(`Next match for ${subject} is on ${firstDate.toLocaleDateString()} at ${firstTime}`)
}

getResult();