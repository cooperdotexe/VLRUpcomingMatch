# VLRupcomingMatch

Howdy and welcome to my first public github repository. The purpose of this project is to prove to myself that I'm able to write a command line application that parses html and returns useful information. 

As it currently stands, there are known issues with the package management, errors when searching for a player or team that has not had a posted upcoming match, and of course the general sloppyness of this code. Much refactoring to be done.

I'm not a programmer, professional software engineer, or architecht. Please enjoy this node application with a massive grain of salt. 

# How To
If you'd like to enjoy this project, ensure that you are using nodeJS and run the index.js file. You will be prompted with the option of searching for either a team or a player. In either case, enter the type of search you'd like to do and the name of the corresponding player/team that you'd like to search for. This will be error prone as schedules are changing (and therefore the structure of VLR.gg). In the case that the subject of your search does not have an upcoming match posted (or your search yielded no results) you will encounter errors. Otherwise, you will retrieve the upcoming date and time of the subjects next match. 

