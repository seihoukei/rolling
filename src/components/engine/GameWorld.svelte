<script>
    import registerTrigger from "utility/register-trigger.js"
    import Trigger from "utility/trigger.js"
    import GAME_SEASONS from "data/game-seasons.js"
    import {tick} from "svelte"

    const GROUND_LEVEL = -12
    const MAX_RESET_COOLDOWN = 2

    let lastDoubleJump = 0
    let advances = 0
    let resetCooldown = MAX_RESET_COOLDOWN

    export let world = {
        gravity : 1,
        ground : GROUND_LEVEL,
        season : 0,

        started : false,
        rules : true,
        over : false,

        distance : 0,
        nextBonus : 200,
        nextSeason : GAME_SEASONS[0].length,

        score : 0,
        jumps : 5,
    }

    registerTrigger("double-jumped", doubleJumped)
    registerTrigger("distance-reached", distanceReached)
    registerTrigger("game-over", gameOver)
    registerTrigger("command-advance", advance)
    registerTrigger("command-keep-alive", keepAlive)
    registerTrigger("command-game-action", gameAction)
    registerTrigger("rhythm-success", rhythmSuccess)

    registerTrigger("bonus-jump", bonusJump)

    function keepAlive() {
        resetCooldown = MAX_RESET_COOLDOWN
    }

    async function doubleJumped() {
        await tick()

        if (advances === lastDoubleJump)
            return

        lastDoubleJump = advances
        world.jumps -= 1
        if (world.jumps < 0)
            world.jumps = 0
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
            Trigger("command-spawn-bonus", world.nextBonus + 100)
            world.nextBonus += Math.random() * 90 + 10
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

    function bonusJump() {
        world.jumps += 3
    }

    function rhythmSuccess(special, offset) {
        world.score += 10 * (1 - offset) ** 2
    }

    function gameOver() {
        world.over = true
    }


</script>
