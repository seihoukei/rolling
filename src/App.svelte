<script>
    import Game from "components/engine/Game.svelte"

    let gameId = Math.random()
</script>

{#key gameId}
    <Game bind:gameId />
{/key}
