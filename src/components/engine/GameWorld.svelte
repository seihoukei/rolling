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

    export let game

    export let world = {
        gravity : 1,
        ground : GROUND_LEVEL,
        season : 0,

        rhythm : {
            rate : 1,
            successStart : 0.4,
            successEnd : 0.6,
            current : 0,
            state : 0,
            last : 0,
        },

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
            world.rhythm.current += time
            while (world.rhythm.current > world.rhythm.rate * 0.75) {
                world.rhythm.current -= world.rhythm.rate * 0.5
                world.rhythm.last = 0
            }
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

    function gameAction(jump = false) {
        if (world.rules) {
            world.rules = false
            return
        }

        if (!world.started) {
            Trigger("command-game-start")
            world.rhythm.current = -0.15
            world.started = true
            return
        }

        if (resetCooldown < 0) {
            Trigger("command-reset-game")
            return
        }

        world.rhythm.last = world.rhythm.current
        if (world.rhythm.current > world.rhythm.rate * world.rhythm.successStart &&
            world.rhythm.current < world.rhythm.rate * world.rhythm.successEnd) {
            Trigger("rhythm-success", jump)
            const median = (world.rhythm.successStart + world.rhythm.successEnd) / 2
            const offset = Math.abs(world.rhythm.current / world.rhythm.rate - median)
            world.score += 10 * (1 - offset) ** 2
            world.rhythm.state = 1
        } else {
            Trigger("rhythm-failure", jump)
            world.rhythm.state = -1
        }
        world.rhythm.current = 0

    }

    function bonusJump() {
        world.jumps += 3
    }

    function gameOver() {
        world.over = true
    }

</script>
