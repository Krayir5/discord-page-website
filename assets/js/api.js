function initDcData(userID){
        fetch('https://api.lanyard.rest/v1/users/'+userID)
        .then(response => response.json())
        .then(profile => handleUserStatus(profile));
  
        function handleUserStatus(profile){
            if(profile.success == 'false'){
                console.log(profile.error);
                return false;
            }
function msToMinSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
//Variables
const currentTime = new Date().getTime();
const dcstat = document.getElementById("dcstatus");
const playerCounter = document.getElementById("globalname");
const username = document.getElementById("usernm");
const userpfp = document.getElementById("userpfp");

const songAlbum = document.getElementById("songalbum");
const songTime = document.getElementById("songtime");
const gameTime = document.getElementById("gametime");
const songArtist = document.getElementById("songartist");
const gameState = document.getElementById("gamestate");
const songName = document.getElementById("songname");
const gameName = document.getElementById("gamename");
const apppfp = document.getElementById("apppfp");
const apppfp2 = document.getElementById("apppfp2");
//End

//Start of status box apis
const dcStatus = profile.data.discord_status;            
if(dcStatus == "offline"){
dcstat.src = "assets/img/offline.png";
}else if(dcStatus == "online"){
dcstat.src = "assets/img/online.png";
}else if(dcStatus == "idle"){
dcstat.src = "assets/img/idle.png";
}else if(dcStatus == "dnd"){
dcstat.src = ("assets/img/dcstatus.png");
}

playerCounter.innerHTML = profile.data.discord_user.global_name;
username.innerHTML = profile.data.discord_user.username;
const avatar = profile.data.discord_user.avatar;
userpfp.src = ('https://cdn.discordapp.com/avatars/'+userID+'/'+avatar+'.gif');
userpfp.onerror = function() {
const userPfp = ('https://cdn.discordapp.com/avatars/'+userID+'/'+avatar+'.png');
userpfp.src = userPfp;
  };
//End of status box apis

//Only listening to spotify/only gaming
if(profile.data.activities[0] && profile.data.activities[0].id !== "custom" && !profile.data.activities[1]){
if(profile.data.listening_to_spotify == true){
songAlbum.innerHTML = ('on '+profile.data.spotify.album);
}else{
songAlbum.innerHTML = ""
};
if (profile.data.spotify) {
const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
songTime.innerHTML = (msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength))
}else if(profile.data.activities[0] && profile.data.activities[0].timestamps.start){
const gameTimeElapsed = currentTime - profile.data.activities[0].timestamps.start;
songTime.innerHTML = msToMinSeconds(gameTimeElapsed)
};
if (profile.data.activities[0] && profile.data.activities[0].state) {
songArtist.innerHTML = ('by '+profile.data.activities[0].state);
}else if(profile.data.activities[0]){
songArtist.innerHTML = "";
};
if (profile.data.activities[0] && profile.data.activities[0].details) {
songName.innerHTML = profile.data.activities[0].details;
}else if(profile.data.activities[0]){
songName.innerHTML = profile.data.activities[0].name;
};
if (profile.data.activities[0] && profile.data.activities[0].application_id) {
const appAvatar = profile.data.activities[0].application_id;
const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
apppfp.src = appPfp;
}else if(profile.data.spotify !== null){
apppfp.src = profile.data.spotify.album_art_url;
};
apppfp2.src = ("assets/img/dcgray.png");
gameState.innerHTML = "or playing any games";
gameTime.innerHTML = "so maybe later?";
gameName.innerHTML = "not listening to anything";
}
//End

//Listening to music while gaming
else if(profile.data.activities[0].id !== "custom" && profile.data.activities[1]){
//First started listening to music and then opened a game(man i hate my life)
if(profile.data.activities[0].id !== "spotify:1"){
apppfp.src = profile.data.spotify.album_art_url
const appAvatar = profile.data.activities[0].application_id;
const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024');
apppfp2.src = appPfp;

songName.innerHTML = profile.data.spotify.song;
gameName.innerHTML = profile.data.activities[0].name;

songArtist.innerHTML = ('by '+profile.data.spotify.artist);
gameState.innerHTML = "Playing video games";

songAlbum.innerHTML = ('on '+profile.data.spotify.album);

const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
const gameTimeElapsed = currentTime - profile.data.activities[0].timestamps.start;
songTime.innerHTML = (msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength));
gameTime.innerHTML = msToMinSeconds(gameTimeElapsed);
}
//First started gaming and then decided to listen his/her favorite Kanye song on back
else if(profile.data.activities[0].id == "spotify:1"){
apppfp.src = profile.data.spotify.album_art_url
const appAvatar = profile.data.activities[1].application_id;
const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
apppfp2.src = appPfp;

songName.innerHTML = profile.data.spotify.song;
gameName.innerHTML = profile.data.activities[1].name;

songArtist.innerHTML = ('by '+profile.data.spotify.artist);
gameState.innerHTML = "Playing video games";

songAlbum.innerHTML = ('on '+profile.data.spotify.album);

const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
const gameTimeElapsed = currentTime - profile.data.activities[1].timestamps.start;
songTime.innerHTML = (msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength));
gameTime.innerHTML = msToMinSeconds(gameTimeElapsed);
};
}
//End

//He/She set a custom status and said ayo i need to play this new COD6 but forget to open his/her new favorite song or he/she just opened up his/her favorite Kanye song and said i'll game later
else if(profile.data.activities[1] && profile.data.activities[0].id == "custom" && !profile.data.activities[2]){
if(profile.data.listening_to_spotify == true){
songAlbum.innerHTML = ('on '+profile.data.spotify.album);
}else{
songAlbum.innerHTML = ""
};
if (profile.data.spotify) {
const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
songTime.innerHTML = (msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength))
}else if(profile.data.activities[1] && profile.data.activities[1].timestamps.start){
const gameTimeElapsed = currentTime - profile.data.activities[1].timestamps.start;
songTime.innerHTML = msToMinSeconds(gameTimeElapsed)
};
if (profile.data.activities[1] && profile.data.activities[1].state) {
songArtist.innerHTML = ('by '+profile.data.activities[1].state);
}else if(profile.data.activities[1]){
songArtist.innerHTML = "Playing video games";
};
if (profile.data.activities[1] && profile.data.activities[1].details) {
songName.innerHTML = profile.data.activities[1].details;
}else if(profile.data.activities[1]){
songName.innerHTML = profile.data.activities[1].name;
};
if (profile.data.activities[1] && profile.data.activities[1].application_id) {
const appAvatar = profile.data.activities[1].application_id;
const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
apppfp.src = appPfp;
}else if(profile.data.spotify !== null){
apppfp.src = profile.data.spotify.album_art_url;
};
apppfp2.src = ("assets/img/dcgray.png");
gameState.innerHTML = "or playing any games";
gameTime.innerHTML = "so maybe later?";
gameName.innerHTML = "not listening to anything";
}
//End

//She/he set a custom status and saw AYO CARTI DROPPED and went for it but bought the COD6 so then he/she started to game
else if(profile.data.activities[1] && profile.data.activities[1].id !== "spotify:1" && profile.data.activities[0].id == "custom"){
apppfp.src = profile.data.spotify.album_art_url
const appAvatar = profile.data.activities[1].application_id;
const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
apppfp2.src = appPfp;

songName.innerHTML = profile.data.spotify.song;
gameName.innerHTML = profile.data.activities[1].name;

songArtist.innerHTML = ('by '+profile.data.spotify.artist);
gameState.innerHTML = "Playing video games";

songAlbum.innerHTML = ('on '+profile.data.spotify.album);

const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
const gameTimeElapsed = currentTime - profile.data.activities[1].timestamps.start;
songTime.innerHTML = (msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength));
gameTime.innerHTML = msToMinSeconds(gameTimeElapsed);
}
//End

//She/He set a custom status and then opened brand new bought COD6 but then remembered that carti just dropped a song and he/she opened the song
else if(profile.data.activities[2] && profile.data.activities[2].id != "spotify:1" && profile.data.activities[0].id == "custom"){
apppfp.src = profile.data.spotify.album_art_url
const appAvatar = profile.data.activities[2].application_id;
const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
apppfp2.src = appPfp;

songName.innerHTML = profile.data.spotify.song;
gameName.innerHTML = profile.data.activities[2].name;

songArtist.innerHTML = ('by '+profile.data.spotify.artist);
gameState.innerHTML = "Playing video games";

songAlbum.innerHTML = ('on '+profile.data.spotify.album);

const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
const gameTimeElapsed = currentTime - profile.data.activities[2].timestamps.start;
songTime.innerHTML = (msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength));
gameTime.innerHTML = msToMinSeconds(gameTimeElapsed);
};
//End
} }
initDcData("your discord id");
