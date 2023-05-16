<script>
    import DisplayCamera from "components/ui/DisplayCamera.svelte"
    import DisplayCharacter from "components/ui/DisplayCharacter.svelte"
    import DisplayShine from "components/ui/DisplayShine.svelte"
    import DisplayOverlay from "components/ui/DisplayOverlay.svelte"
    import DisplayObject from "components/ui/DisplayObject.svelte"

    import Trigger from "utility/trigger-svelte.js"

    export let game

    $: characters = game?.characters ?? []
    $: shines = game?.shines ?? []
    $: objects = game?.objects ?? []
    $: world = game?.world ?? {}

    function gameAction(special = false) {
        Trigger("command-game-action", special)
    }

    function normalAction(event) {
        event.preventDefault()
        event.stopPropagation()

        gameAction()
    }

    function specialAction(event) {
        event.preventDefault()
        event.stopPropagation()

        gameAction(true)
    }

    function touchAction(event) {
        if (event.touches[0]?.clientX < window.innerWidth / 2) {
            normalAction(event)
        } else {
            specialAction(event)
        }
    }

    function mouseAction(event) {
        if (event.button) {
            specialAction(event)
        } else {
            normalAction(event)
        }
    }

    function cancelEvent(event) {
        event.preventDefault()
        event.stopPropagation()
    }
</script>

{#if game}
    <div class="container"
         on:mousedown={mouseAction}
         on:touchstart={touchAction}
         on:contextmenu={cancelEvent}
    >
        <DisplayCamera {game}>
            {#each objects as object}
                <DisplayObject {object} />
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
