<script>
    import GAME_SEASONS from "data/game-seasons.js"
    import GAME_OBJECTS from "data/game-objects.js"

    import Trigger from "utility/trigger-svelte.js"

    const MAX_RESET_COOLDOWN = 2

    let advances = 0
    let resetCooldown = MAX_RESET_COOLDOWN

    export let world = {
        season : 0,

        gravity : 1,
        friction : 0.1,
        airFriction : 0.1,

        minSpikeDistance : 50,
        maxSpikeDistance : 150,

        spawns : [{
            items : ["score", "score", "score", "slow", "fast", "dash", "clone"],
            minDistance : 50,
            maxDistance : 100,
        }, {
            items : ["spike"],
            minDistance : 50,
            maxDistance : 150,
        }],

        started : false,
        rules : true,
        over : false,

        distance : 0,
        nextSeason : 0,

        score : 0,
        multiplier : 0,
    }

    setSeason(0)

    Trigger.on("distance-reached", distanceReached)
    Trigger.on("game-over", gameOver)
    Trigger.on("rhythm-success", rhythmSuccess)
    Trigger.on("rhythm-failure", rhythmFailure)
    Trigger.on("object-destroyed", objectDestroyed)
    Trigger.on("bonus-score", bonusScore)

    Trigger.on("command-advance", advance)
    Trigger.on("command-keep-alive", keepAlive)
    Trigger.on("command-game-action", gameAction)

    function keepAlive() {
        resetCooldown = MAX_RESET_COOLDOWN
    }

    function advance(time) {
        advances++
        if (world.started) {
            resetCooldown -= time
        }
    }

    function setSeason(index) {
        world.season = index

        // apply season data here

        world.nextSeason += GAME_SEASONS[world.season].length

        world.spawnDistances = world.spawns
            .map(x => world.distance + x.minDistance + (x.maxDistance - x.minDistance) * Math.random())
    }

    function distanceReached(x) {
        if (x > world.distance)
            world.distance = x

        world.spawnDistances.forEach((distance, index) => {
            if (world.distance > distance) {
                const data = world.spawns[index]
                Trigger("command-spawn-object", data.items , world.distance + 100)
                world.spawnDistances[index] += data.minDistance + (data.maxDistance - data.minDistance) * Math.random()
            }
        })

        if (world.distance > world.nextSeason) {
            const nextSeason = (world.season + 1) % GAME_SEASONS.length
            setSeason(nextSeason)
        }
    }

    function gameAction() {
        if (world.rules) {
            world.rules = false
            return
        }

        if (!world.started) {
            Trigger("command-game-start")
            world.started = true
            return
        }

        if (resetCooldown < 0) {
            Trigger("command-reset-game")
            return
        }

    }

    function rhythmSuccess(special, offset) {
        world.multiplier += 2 * Math.max(0, 0.1 - offset)
        world.multiplier = Math.min(5, world.multiplier)
        world.score += Math.floor(1 + world.multiplier) * 10 * (1 - offset) ** 2
    }

    function rhythmFailure(special, offset) {
        world.multiplier -= 1
        world.multiplier = Math.max(0, world.multiplier)
    }

    function objectDestroyed(object) {
        const score = GAME_OBJECTS[object.type]?.score ?? 0
        world.score += Math.floor(1 + world.multiplier) * score
    }

    function bonusScore() {
        world.score += Math.floor(1 + world.multiplier) * 100
    }

    function gameOver() {
        world.over = true
    }


</script>
