const GAME_OBJECTS = {
    //enemies
    spike : {
        sprite : "../resources/bonus/spike.png",
        destructible : true,
        score : 100,
        maxHeight : 0,
        event : "hit-spike",
        z : 2,
    },
    
    //bonus
    score : {
        sprite : "../resources/bonus/score.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-score",
        text: "+ SCORE",
    },
    slow : {
        sprite : "../resources/bonus/slow.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-slow",
        text: "- SPEED",
    },
    dash: {
        sprite : "../resources/bonus/jump.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-dash",
        text: "SUPER DASH",
    },
    clone : {
        sprite : "../resources/bonus/present.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-clone",
        text: "+ FRIEND",
    },
    fast : {
        sprite : "../resources/bonus/fast.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-fast",
        text: "+ SPEED",
    },
}

export default GAME_OBJECTS
