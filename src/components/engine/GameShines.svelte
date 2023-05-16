<script>
    import GameShine from "components/engine/GameShine.svelte"

    import {tick} from "svelte"
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    const SHINE_SPEED = 40
    const SHINE_SIZE = 2
    const MAX_SHINES = 100

    export let shines = []

    Trigger.on("command-add-shines", spawnShines)
    Trigger.on("object-picked-up", objectPicked)

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.CLEANUP)


    function spawnShines(x, y, time, amount) {
        const spawnAmount = Math.min(MAX_SHINES - shines.length, amount)
        for (let i = 0; i < spawnAmount; i++) {
            const shine = {
                x, y, time,
                dx : (Math.random() - 0.5) * SHINE_SPEED,
                dy : (Math.random() - 0.5) * SHINE_SPEED,
                progress : 0,
                size : SHINE_SIZE,
                opacity : 1,
            }
            shines.push(shine)
        }
        shines = shines
    }

    function objectPicked(object) {
        spawnShines(object.x, object.y, 1, 10)
    }

    async function advance() {
        shines = shines.filter(x => x.progress < x.time)
    }
</script>

<div class="shines">
    {#each shines as shine}
        <GameShine bind:shine />
    {/each}
</div>

<style>
    div.shines {
        pointer-events: none;
    }
</style>
