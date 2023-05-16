<script>
    import {tick} from "svelte"
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let firstArray
    export let secondArray
    export let event = "collision"

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.COLLISION)

    async function advance() {
        const liveFirst = firstArray?.filter(x => !x.dead) ?? []
        const liveSecond = secondArray?.filter(x => !x.dead) ?? []

        for (const first of liveFirst) {
            for (const second of liveSecond) {
                const dx = first.x - second.x
                const dy = first.y - second.y
                const distance2 = dx * dx + dy * dy
                const collisionDistance = (first.size + second.size) * 0.3
                const collisionDistance2 = collisionDistance * collisionDistance
                if (distance2 < collisionDistance2)
                    Trigger(event, first, second)
            }
        }
    }
</script>
