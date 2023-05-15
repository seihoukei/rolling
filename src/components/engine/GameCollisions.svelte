<script>
    import registerTrigger from "utility/register-trigger.js"
    import {tick} from "svelte"
    import Trigger from "utility/trigger.js"

    export let firstArray
    export let secondArray
    export let event = "collision"

    registerTrigger("command-advance", advance)

    async function advance() {
        await tick()

        for (const first of firstArray) {
            for (const second of secondArray) {
                const dx = first.x - second.x
                const dy = first.y - second.y
                const distance2 = dx * dx + dy * dy
                const collisionDistance = (first.size + second.size) * 0.4
                const collisionDistance2 = collisionDistance * collisionDistance
                if (distance2 < collisionDistance2)
                    Trigger(event, first, second)
            }
        }
    }
</script>
