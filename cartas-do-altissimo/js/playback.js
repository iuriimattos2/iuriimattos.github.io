var playing = true; // stream status
var music = null;

setTimeout(function(){
    loadStream();
}, 1);

function loadStream(){
    if(playing && music !== null)
    destroyStream();

    music = new Audio();
    music.src = "http://170.150.255.93:8080/type=http";
    music.load();
    music.play();
    setLabel(index);
    pauseIcon();
    playingIndex = index;
    playing = true;
}

function destroyStream(){
    music.pause();
    music.src = "";
    playIcon();
    playing = false;
}

function changePlayback(){
    if(playing){ destroyStream();  }else{  loadStream();  }
}

// icons
function pauseIcon(){
    document.getElementById('playbackButton').className = 'icon fa-pause';
}
function playIcon(){
    document.getElementById('playbackButton').className = 'icon fa-play';
}