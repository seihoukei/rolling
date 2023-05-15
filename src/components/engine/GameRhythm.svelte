<script>
    import registerTrigger from "utility/register-trigger.js"
    import Trigger from "utility/trigger.js"

    export let rhythm = {
        rate : 1,
        successStart : 0.4,
        successEnd : 0.6,
        current : 0,
        state : 0,
        last : 0,
    }

    let started = false

    registerTrigger("command-advance", advance)
    registerTrigger("command-game-start", gameStart)
    registerTrigger("command-game-action", gameAction)

    function advance(time) {
        if (started) {
            rhythm.current += time
            while (rhythm.current > rhythm.rate * 0.75) {
                rhythm.current -= rhythm.rate * 0.5
                rhythm.last = 0
            }
        }
    }

    function gameStart() {
        started = true
        rhythm.current = -0.15
    }

    function gameAction(special = false) {
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


</script>
