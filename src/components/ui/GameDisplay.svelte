<script>
    import DisplayCamera from "components/ui/DisplayCamera.svelte"
    import DisplayCharacter from "components/ui/DisplayCharacter.svelte"
    import DisplayShine from "components/ui/DisplayShine.svelte"
    import DisplayBonus from "components/ui/DisplayBonus.svelte"
    import Trigger from "utility/trigger.js"
    import registerTrigger from "utility/register-trigger.js"
    import DisplayOverlay from "components/ui/DisplayOverlay.svelte"

    export let game

    registerTrigger("game-over", gameOver)

    $: characters = game?.characters ?? []
    $: shines = game?.shines ?? []
    $: bonuses = game?.bonuses ?? []
    $: world = game?.world ?? {}

    function tap(event, jump = false) {
        event.preventDefault()
        event.stopPropagation()

        Trigger("command-game-action", jump)
    }

    function jump(event) {
        tap(event, true)
    }

    function touchAction(event) {
        if (event.touches[0]?.clientX < window.innerWidth / 2) {
            tap(event)
        } else {
            tap(event, true)
        }
    }

    function gameOver() {
/*
        if (!music.paused)
            music.pause()
*/
    }

</script>

{#if game}
    <div class="container"
         on:click={tap}
         on:contextmenu={jump}
         on:touchstart={touchAction}
    >
        <DisplayCamera {game}>
            {#each bonuses as bonus}
                <DisplayBonus {bonus} />
            {/each}
            {#each characters as character}
                <DisplayCharacter {game} {character} />
            {/each}
            {#each shines as shine}
                <DisplayShine {shine} />
            {/each}
        </DisplayCamera>
        <DisplayOverlay {game}/>
    </div>
{/if}

<style>
    div.container {
        width: 100vw;
        height : 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>
