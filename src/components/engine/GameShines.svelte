<script>
    import registerTrigger from "utility/register-trigger.js"
    import {tick} from "svelte"
    import GameShine from "components/engine/GameShine.svelte"

    const SHINE_SPEED = 40
    const SHINE_SIZE = 2
    const MAX_SHINES = 100

    export let shines = []

    registerTrigger("command-add-shines", spawnShines)
    registerTrigger("command-advance", advance)

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

    async function advance() {
        await tick()
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
