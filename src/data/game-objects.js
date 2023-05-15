const GAME_OBJECTS = {
    spike : {
        sprite : "../resources/bonus/spike.png",
        destructible : true,
        score : 100,
        maxHeight : 0,
        event : "hit-spike",
        z : 2,
    },
    score : {
        sprite : "../resources/bonus/score.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-score",
    },
    slow : {
        sprite : "../resources/bonus/slow.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-slow",
    },
    dash: {
        sprite : "../resources/bonus/jump.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-dash",
    },
    clone : {
        sprite : "../resources/bonus/present.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-clone",
    },
    fast : {
        sprite : "../resources/bonus/fast.png",
        pickable : true,
        maxHeight : 50,
        event : "bonus-fast",
    },
}

export default GAME_OBJECTS
