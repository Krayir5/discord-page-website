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
//Start of status box apis
            const dcStatus = profile.data.discord_status;            
            if(dcStatus == "offline"){
               const dcstat = document.getElementById("dcstatus");
               dcstat.src = "assets/img/offline.png";
            }else if(dcStatus == "online"){
               const dcstat = document.getElementById("dcstatus");
               dcstat.src = "assets/img/online.png";
            }else if(dcStatus == "idle"){
               const dcstat = document.getElementById("dcstatus");
               dcstat.src = "assets/img/idle.png";
            }else if(dcStatus == "dnd"){
               const dcstat = document.getElementById("dcstatus");
               dcstat.src = ("assets/img/dcstatus.png");
            }
            const playerCounter = document.getElementById("globalname");
            playerCounter.innerHTML = profile.data.discord_user.global_name;

            const username = document.getElementById("usernm");
            username.innerHTML = profile.data.discord_user.username;

            const avatar = profile.data.discord_user.avatar;
            const userPfp = ('https://cdn.discordapp.com/avatars/'+userID+'/'+avatar+'.png')
            const userpfp = document.getElementById("userpfp");
            userpfp.src = userPfp;
//End of status box apis

//Start of activity box apis
            const currentTime = new Date().getTime();
if(profile.data.activities[0] && profile.data.activities[0].flags){
            const songTime = document.getElementById("songtime");
            if (profile.data.spotify) {
                const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
                const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
                songTime.innerHTML = (''+msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength))
            }else if(profile.data.activities[0] && profile.data.activities[0].timestamps.start){
                 const timeElapsed = currentTime - profile.data.activities[0].timestamps.start;
                 songTime.innerHTML = msToMinSeconds(timeElapsed)
            };
            const songArtist = document.getElementById("songartist");
            if (profile.data.activities[0] && profile.data.activities[0].state) {
                 songArtist.innerHTML = profile.data.activities[0].state;
            }else if(profile.data.activities[0]){
                 songArtist.innerHTML = ("Playing video games");
            };
            const songName = document.getElementById("songname");
            if (profile.data.activities[0] && profile.data.activities[0].details) {
                 songName.innerHTML = profile.data.activities[0].details;
               }else if(profile.data.activities[0]){
                 songName.innerHTML = profile.data.activities[0].name;
            };
            if (profile.data.activities[0] && profile.data.activities[0].application_id) {
              const appAvatar = profile.data.activities[0].application_id;
              const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
              const apppfp = document.getElementById("apppfp");
              apppfp.src = appPfp;
            }else if(profile.data.spotify !== null){
                 const apppfp = document.getElementById("apppfp");
                 apppfp.src = profile.data.spotify.album_art_url;
            };
        }else if(profile.data.activities[0] && profile.data.activities[1].flags){
            const songTime = document.getElementById("songtime");
            if (profile.data.spotify) {
                const timeElapsed = currentTime - profile.data.spotify.timestamps.start;
                const songLength = profile.data.spotify.timestamps.end - profile.data.spotify.timestamps.start;
                songTime.innerHTML = (''+msToMinSeconds(timeElapsed)+'/'+msToMinSeconds(songLength))
            }else if(profile.data.activities[1] && profile.data.activities[1].timestamps.start){
                 const timeElapsed = currentTime - profile.data.activities[1].timestamps.start;
                 songTime.innerHTML = msToMinSeconds(timeElapsed)
            };
            const songArtist = document.getElementById("songartist");
            if (profile.data.activities[1] && profile.data.activities[1].state) {
                 songArtist.innerHTML = profile.data.activities[1].state;
            }else if(profile.data.activities[1]){
                 songArtist.innerHTML = ("Playing video games");
            };
            const songName = document.getElementById("songname");
            if (profile.data.activities[1] && profile.data.activities[1].details) {
                 songName.innerHTML = profile.data.activities[1].details;
               }else if(profile.data.activities[1]){
                 songName.innerHTML = profile.data.activities[1].name;
            };
            if (profile.data.activities[1] && profile.data.activities[1].application_id) {
              const appAvatar = profile.data.activities[1].application_id;
              const appPfp = ('https://dcdn.dstn.to/app-icons/'+appAvatar+'?size=1024')
              const apppfp = document.getElementById("apppfp");
              apppfp.src = appPfp;
            }else if(profile.data.spotify !== null){
                 const apppfp = document.getElementById("apppfp");
                 apppfp.src = profile.data.spotify.album_art_url;
            };
        };
//End of activity box apis
        } 
    }

initDcData("your discord id");
