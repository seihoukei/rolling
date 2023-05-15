const GAME_BONUSES = {
    spike : {
        sprite : "../resources/bonus/spike.png",
        pickable : false,
        maxHeight : 0,
        event : "hit-spike",
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
    jump: {
        sprite : "../resources/bonus/jump.png",
        pickable : true,
        maxHeight : 20,
        event : "bonus-jump",
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

export default GAME_BONUSES
