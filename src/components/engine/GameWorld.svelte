<script>
    import registerTrigger from "utility/register-trigger.js"
    import Trigger from "utility/trigger.js"
    import GAME_SEASONS from "data/game-seasons.js"
    import {tick} from "svelte"
    import GAME_OBJECTS from "data/game-objects.js"

    const GROUND_LEVEL = -12
    const MAX_RESET_COOLDOWN = 2

    let lastDoubleJump = 0
    let advances = 0
    let resetCooldown = MAX_RESET_COOLDOWN

    export let world = {
        season : 0,

        gravity : 1,
        friction : 0.1,
        airFriction : 0.1,

        minSpikeDistance : 50,
        maxSpikeDistance : 150,

        bonuses : ["score", "score", "score", "slow", "fast", "dash", "clone"],

        started : false,
        rules : true,
        over : false,

        distance : 0,
        nextBonus : 100,
        nextSpike : 200,
        nextSeason : GAME_SEASONS[0].length,

        score : 0,
    }

    registerTrigger("distance-reached", distanceReached)
    registerTrigger("game-over", gameOver)
    registerTrigger("command-advance", advance)
    registerTrigger("command-keep-alive", keepAlive)
    registerTrigger("command-game-action", gameAction)
    registerTrigger("rhythm-success", rhythmSuccess)
    registerTrigger("object-destroyed", objectDestroyed)

    function keepAlive() {
        resetCooldown = MAX_RESET_COOLDOWN
    }

    function advance(time) {
        advances++
        if (world.started) {
            resetCooldown -= time
        }
    }

    function distanceReached(x) {
        if (x > world.distance)
            world.distance = x

        if (world.distance > world.nextBonus) {
            Trigger("command-spawn-object", world.bonuses, world.nextBonus + 100)
            world.nextBonus += Math.random() * 100 + 50
        }

        if (world.distance > world.nextSpike) {
            Trigger("command-spawn-object", "spike", world.nextSpike + 100)
            world.nextSpike += Math.random() * (world.maxSpikeDistance - world.minSpikeDistance) + world.minSpikeDistance
        }

        if (world.distance > world.nextSeason) {
            world.season++
            if (world.season >= GAME_SEASONS.length)
                world.season = 0

            world.nextSeason += GAME_SEASONS[world.season].length
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
        world.score += 10 * (1 - offset) ** 2
    }

    function objectDestroyed(object) {
        const score = GAME_OBJECTS[object.type]?.score ?? 0
        world.score += score
    }

    function gameOver() {
        world.over = true
    }


</script>
