<script>
    import Game from "components/Game.svelte"
    import Trigger from "utility/trigger-svelte.js"

    setTimeout(() => Trigger("test"), 100)

    let gameId = Math.random()
</script>

{#key gameId}
    <Game bind:gameId />
{/key}
