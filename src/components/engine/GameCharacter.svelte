<script>
    import registerTrigger from "utility/register-trigger.js"
    import Trigger from "utility/trigger.js"
    import GAME_RULES from "data/game-rules.js"

    export let game
    export let character = {}

    registerTrigger("command-advance", advance)
    registerTrigger("rhythm-success", rhythmSuccess)
    registerTrigger("rhythm-failure", rhythmFailure)
    registerTrigger("command-game-start", gameStart)

    registerTrigger("bonus-fast", bonusFast)
    registerTrigger("bonus-slow", bonusSlow)
    registerTrigger("bonus-dash", bonusDash)
    registerTrigger("hit-spike", hitSpike)

    $: world = game?.world ?? {}

    function advancePosition(time, dash) {
        if (dash) {
            const speedScale = 1 + character.dash
            character.x += character.dx * time * speedScale//GAME_RULES.dashBoost
            character.y += character.dy * time * speedScale//GAME_RULES.dashBoost
            character.dash -= time
            character.dx *= (1 - world.airFriction) ** time
            character.dy *= (1 - world.airFriction) ** time
        }

        if (!dash) {
            character.dashCooldown -= time

            character.x += character.dx * time
            if (character.jumping)
                character.dx *= (1 - world.airFriction) ** time
            else
                character.dx *= (1 - world.friction) ** time

            character.y += character.dy * time + 0.5 * world.gravity * time ** 2
            character.dy += world.gravity
        }
    }

    function advance(time) {
        if (time > character.dash) {
            const undashed = time - character.dash
            if (character.dash)
                advancePosition(character.dash, true)
            advancePosition(undashed, false)
        } else {
            advancePosition(time, true)
        }

        if (!character.dead && Math.random() < time * 5)
            Trigger("command-add-shines",
                character.x + (0.5 - Math.random()) * character.size,
                character.y + (0.5 - Math.random()) * character.size,
                1, 1)

        const bottom = GAME_RULES.ground + (character.dead ? 100 : 0)

        if (character.y >= bottom) {
            character.jumping = false
            character.y = bottom
            character.dy = 0
        }

        Trigger("distance-reached", character.x)

        if (!character.dead) {
            Trigger("command-keep-alive")
        }
    }

    function jump(speedRate = 1) {
        if (character.jumping && (character.dash > 0 || character.dashCooldown < 0))
            return false

        character.dash = GAME_RULES.jumpDashTime
        character.dashCooldown = GAME_RULES.dashCooldown

        character.jumping = true
        character.dx *= speedRate
        character.dy = - character.dx

        return true
    }

    function dash(amount) {
        character.dash = amount
        character.dashCooldown = GAME_RULES.dashCooldown

        character.jumping = true
        character.dy = 0

        return true
    }

    function rhythmSuccess(special = false) {
        if (character.dead)
            return

        if (special) {
            if (!character.jumping)
                jump()
            else if (!character.dash && character.dashCooldown <= 0)
                dash(character.dx / GAME_RULES.dashTimeScale)
        } else {
            character.dx += GAME_RULES.rhythmBoost
        }

        Trigger("command-add-shines", character.x, character.y, 1, 10)
    }

    function rhythmFailure(special = false) {
        if (character.dead)
            return

        if (special && !character.jumping) {
            jump(0.7)
        } else {
            character.dash = 0
            character.dx *= GAME_RULES.rhythmPenalty
        }
    }

    function gameStart() {
        character.jumping = true
        character.dy = -40
        character.dx = 20
    }

    function bonusFast() {
        character.dx *= 1.5
    }

    function bonusSlow() {
        character.dx *= 0.8
    }

    function bonusDash() {
        character.dx = Math.max(character.dx, GAME_RULES.dashSpeed)
        dash(2)
    }

    function hitSpike(target, spike) {
        if (target !== character)
            return

        if (character.dash) {
            Trigger("command-destroy-object", spike)
            return
        }

        character.dead = true
        character.dy = -50
        character.dx = 0

        Trigger("command-play-sound", "hit")
    }

</script>
