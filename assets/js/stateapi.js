function initDcData(userID){
        fetch('https://api.lanyard.rest/v1/users/'+userID)
        .then(response => response.json())
        .then(profile => handleServerStatus(profile));
  
        function handleServerStatus(profile){
            if(profile.success == 'false'){
                console.log(profile.error);
                return false;
            }
if(profile.data.activities[0] && profile.data.activities[0].id == "custom"){
            const userStatus = document.getElementById("userstate");
            userStatus.innerHTML = profile.data.activities[0].state;
}else if(profile.data.activities[0] && profile.data.activities[0].flag){
            const userStatus = document.getElementById("userstate");
            userStatus.innerHTML = "There's no status to show";
}
if(profile.data.activities[0] && profile.data.activities[0].emoji){
            const emojiID = profile.data.activities[0].emoji.id;
            const emojiName = profile.data.activities[0].emoji.name;
            const emojiAnimated = profile.data.activities[0].emoji.animated;
             if(profile.data.activities[0].emoji && emojiAnimated == true){
              const emoji = ('https://cdn.discordapp.com/emojis/'+emojiID+'.gif?size=128&quality=lossless');
              const emojii = document.getElementById("emoji1");
              emojii.src = emoji;
              }else if(emojiAnimated == false){
              const emoji = ('https://cdn.discordapp.com/emojis/'+emojiID+'.webp?size=128&quality=lossless');
              const emojii = document.getElementById("emoji1");
              emojii.src = emoji;
                   }if(!emojiID){
                    const emojii = document.getElementById("emoji2");
                    emojii.innerHTML = emojiName
                                };
            }}
        } 

initDcData("your discord id");
