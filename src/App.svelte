<script>
    import Game from "components/Game.svelte"

    let gameId = Math.random()
</script>

{#key gameId}
    <Game bind:gameId />
{/key}
