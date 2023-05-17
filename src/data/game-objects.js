const GAME_OBJECTS = {
    //enemies
    spike : {
        sprite : "../resources/bonus/spike.png",
        destructible : true,
        score : 100,
        maxHeight : 0,
        event : "hit-spike",
        z : 2,
        size : 10,
    },
    minispike : {
        sprite : "../resources/bonus/spike.png",
        destructible : true,
        score : 100,
        maxHeight : 0,
        event : "hit-spike",
        size: 7,
        z : 2,
    },
    
    //bonus
    score : {
        sprite : "../resources/bonus/score.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-score",
        text: "+ SCORE",
        size : 10,
    },
    slow : {
        sprite : "../resources/bonus/slow.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-slow",
        text: "- SPEED",
        size : 10,
    },
    dash: {
        sprite : "../resources/bonus/jump.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-dash",
        text: "SUPER DASH",
        size : 10,
    },
    clone : {
        sprite : "../resources/bonus/present.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-clone",
        text: "+ FRIEND",
        size : 10,
    },
    fast : {
        sprite : "../resources/bonus/fast.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-fast",
        text: "+ SPEED",
        size : 10,
    },
}

export default GAME_OBJECTS
