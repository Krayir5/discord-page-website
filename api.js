function initDcData(userID){
        fetch('https://api.lanyard.rest/v1/users/'+userID)
        .then(response => response.json())
        .then(profile => handleServerStatus(profile));
  
        function handleServerStatus(profile){
            if(profile.success == 'false'){
                console.log(profile.error);
                return false;
            }

            const playerCounter = document.getElementById("globalname");
            playerCounter.innerHTML = profile.data.discord_user.global_name;

            const username = document.getElementById("usernm");
            username.innerHTML = profile.data.discord_user.username;

            const songName = document.getElementById("songname");
            songName.innerHTML = profile.data.spotify.song;

            const songArtist = document.getElementById("songartist");
            songArtist.innerHTML = profile.data.spotify.artist;

            const songArt = document.getElementById("songart");
            songArt.src = profile.data.spotify.album_art_url;


            const avatar = profile.data.discord_user.avatar;
            const userPfp = ('https://cdn.discordapp.com/avatars/'+userID+'/'+avatar+'.gif')
            const userpfp = document.getElementById("userpfp");
            userpfp.src = userPfp;
        } 
    }

initDcData("540881924865130498");
