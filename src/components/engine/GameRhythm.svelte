<script>
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let rhythm = {
        rate : 1,
        successStart : 0.4,
        successEnd : 0.6,
        current : 0,
        state : 0,
        last : 0,
    }

    let started = false
    let over = false

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.RHYTHM)

    Trigger.on("command-game-start", gameStart)
    Trigger.on("command-game-action", gameAction)
    Trigger.on("game-over", gameOver)

    function advance(time) {
        if (!started || over)
            return

        rhythm.current += time
        while (rhythm.current > rhythm.rate * 0.75) {
            rhythm.current -= rhythm.rate * 0.5
//            rhythm.last = 0
        }
    }

    function gameStart() {
        started = true
    }

    function gameAction(special = false) {
        if (!started || over)
            return

        rhythm.last = rhythm.current

        const median = (rhythm.successStart + rhythm.successEnd) / 2
        const offset = Math.abs(rhythm.current / rhythm.rate - median)

        if (rhythm.current > rhythm.rate * rhythm.successStart &&
            rhythm.current < rhythm.rate * rhythm.successEnd) {
            Trigger("rhythm-success", special, offset)
            rhythm.state = 1
        } else {
            Trigger("rhythm-failure", special, offset)
            rhythm.state = -1
        }

        rhythm.current = 0
    }

    function gameOver() {
        rhythm.state = -2
        over = true
    }

</script>
