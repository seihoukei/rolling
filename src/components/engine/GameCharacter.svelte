<script>
    import registerTrigger from "utility/register-trigger.js"
    import Trigger from "utility/trigger.js"

    export let game
    export let character = {}

    registerTrigger("command-advance", advance)
    registerTrigger("rhythm-success", rhythmSuccess)
    registerTrigger("rhythm-failure", rhythmFailure)
    registerTrigger("command-game-start", gameStart)

    registerTrigger("bonus-fast", bonusFast)
    registerTrigger("bonus-slow", bonusSlow)
    registerTrigger("hit-spike", hitSpike)

    $: world = game.world ?? {}

    function advance(time) {
        character.x += character.dx * time
        character.dx *= 0.9 ** time

        character.y += character.dy * time + 0.5 * world.gravity * time ** 2
        character.dy += world.gravity

        if (!character.dead && Math.random() < time * 5)
            Trigger("command-add-shines",
                character.x + (0.5 - Math.random()) * character.size,
                character.y + (0.5 - Math.random()) * character.size,
                1, 1)

        const bottom = world.ground + (character.dead ? 100 : 0)

        if (character.y > bottom) {
            character.y = bottom
            character.dy = 0
        }

        if (character.x > world.distance)
            Trigger("distance-reached", character.x)

        if (!character.dead) {
            Trigger("command-keep-alive")
        }
    }

    function jump(speedRate = 1) {
        const midAir = character.dy !== 0
        const canDoubleJump = world.jumps > 0

        if (midAir && !canDoubleJump)
            return false

        character.dx *= speedRate
        character.dy = - character.dx

        if (midAir) {
            Trigger("double-jumped")
        }
    }

    function rhythmSuccess(mustJump = false) {
        if (character.dead)
            return

        if (!mustJump || !jump()) {
            character.dx += 5
        }

        Trigger("command-add-shines", character.x, character.y, 1, 10)
    }

    function rhythmFailure(mustJump = false) {
        if (character.dead)
            return

        if (!mustJump || !jump(0.7)) {
            character.dx *= 0.9
        }
    }

    function gameStart() {
        character.dy = -40
        character.dx = 20
    }

    function bonusFast() {
        character.dx *= 1.5
    }

    function bonusSlow() {
        character.dx *= 0.8
    }

    function hitSpike(target) {
        if (target !== character)
            return

        character.dead = true
        character.dy = -50
        character.dx = 0

        Trigger("command-play-sound", "hit")
    }

</script>
