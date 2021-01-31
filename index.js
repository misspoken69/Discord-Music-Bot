//UPTIME CALLBACK
const http = require('http');
const express = require('express');
const app = express();
var server = http.createServer(app);

app.get('/', (request, response) => {
  console.log(`Ping Received.`);
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('Sky Lark 24/7 Music');
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});
setInterval(() => {
  http.get(`https://skylark-music.glitch.me`); //Do for good hosting
}, 280000);

const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const { prefix, token } = require('./config.json');

Structures.extend('Guild', Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        nowPlaying: null,
        songDispatcher: null,
        volume: 1
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: prefix,
  owner: '3857006154635083816' // change this to your Discord user ID
});

client.registry
  .registerDefaultTypes()
  .registerGroups([['music', 'Music Command Group']])
  .registerDefaultGroups()
  .registerDefaultCommands({
    eval: false,
    prefix: false,
    commandState: false
  })
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
  console.log('Ready!');
  client.user.setActivity(`.help ¦ ${client.guilds.cache.size} Sunucu`, {
    type: 'WATCHING'
  });
});

client.login(process.env.token);