<script>
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let game

    export let rhythm = {
        rate : 0.5,
        successStart : 0.5,
        successEnd : 0.8,
        current : 0.5,
        state : 0,
        last : 0,
    }

    $: settings = game?.settings ?? {}
    $: offset = settings.rhythmOffset ?? 0.35

    let started = false
    let over = false

    Trigger.on("command-rhythm-sync", rhythmSync)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.RHYTHM)

    Trigger.on("command-game-start", gameStart)
    Trigger.on("command-game-action", gameAction)
    Trigger.on("game-over", gameOver)

    function rhythmSync(time) {
        if (!started || over)
            return

        rhythm.current = ((time + offset) % rhythm.rate) / rhythm.rate
    }

    function gameStart() {
        started = true
    }

    function gameAction(special = false) {
        if (!started || over)
            return

        rhythm.last = rhythm.current

        const median = (rhythm.successStart + rhythm.successEnd) / 2
        const offset = Math.abs(rhythm.current - median)

        if (rhythm.current > rhythm.successStart &&
            rhythm.current < rhythm.successEnd) {
            Trigger("rhythm-success", special, offset * rhythm.rate)
            rhythm.state = 1
        } else {
            Trigger("rhythm-failure", special, offset * rhythm.rate)
            rhythm.state = -1
        }

        rhythm.current = 0
    }

    function gameOver() {
        rhythm.state = -2
        over = true
    }

</script>
