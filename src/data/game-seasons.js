const GAME_SEASONS = [{
    length : 1000,
    background: "../resources/backgrounds/sky.jpg",
    
    world: {
        gravity : 1,
        friction : 0.1,
        airFriction : 0.1,
    
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["minispike"],
            minDistance : 100,
            maxDistance : 300,
        
        }],
    },
},{    length : 1000,
    background: "../resources/backgrounds/sky.jpg",
    
    world: {
        gravity : 1,
        friction : 0.1,
        airFriction : 0.1,
    
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["minispike"],
            minDistance : 50,
            maxDistance : 250,
        
        }],
    },
},{
    length : 1500,
    background: "../resources/backgrounds/night.jpg",
    
    world : {
        gravity : 0.7,
        friction : 0.1,
        airFriction : 0.1,
    
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["minispike"],
            minDistance : 50,
            maxDistance : 250,
        
        }],
    },
},{
    length : 2000,
    background: "../resources/backgrounds/fire.jpg",
    
    world : {
        gravity : 1,
        friction : 0.12,
        airFriction : 0.12,
        
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["minispike", "spike"],
            minDistance : 50,
            maxDistance : 150,
            
        }],
    },
},{
    length : 2500,
    background: "../resources/backgrounds/magic.jpg",
    
    world : {
        gravity : 1.4,
        friction : 0.1,
        airFriction : 0.01,
        
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["spike", "airspike"],
            minDistance : 100,
            maxDistance : 300,
            
        }],
    },
},{
    length : 2500,
    background: "../resources/backgrounds/ice.jpg",
    
    world : {
        gravity : 1,
        friction : 0.1,
        airFriction : 0.1,
        
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["spike", "airspike"],
            minDistance : 40,
            maxDistance : 100,
            
        }],
    },
},{
    length : 2500,
    background: "../resources/backgrounds/castle.jpg",
    
    world : {
        gravity : 1,
        friction : 0.1,
        airFriction : 0.1,
        
        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["minispike", "spike"],
            minDistance : 150,
            maxDistance : 300,
            
        }],
    },
}]

export default GAME_SEASONS
