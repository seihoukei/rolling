<script>
    import OverlayRhythm from "components/ui/OverlayRhythm.svelte"

    export let game

    $: world = game?.world ?? {}
    $: rhythm = game?.rhythm ?? {}
</script>

{#if world.rules}
    <div class="rules">
        Click / Tap anywhere:
        Catch the rhythm to ROLL!

        Right-click / Tap right half:
        JUMP!

        The faster you ROLL
        the higher you JUMP

        READY?
    </div>
{:else}
    <div class="stats">
        Distance : {Math.floor(world.distance / 10)}
        Score : {Math.floor(world.score)}
    </div>
    <OverlayRhythm {game} />
{/if}

<style>

    div.stats {
        pointer-events: none;
        position: absolute;
        left: 0;
        top : 0;
        white-space: pre-line;
        font-size: 5vmin;
        color : black;
        z-index : 2;
    }

    div.rules {
        position: absolute;
        left: 0;
        right : 0;
        top : 0;
        bottom: 0;

        color : black;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        font-size: 5vmin;
        white-space: pre-line;
        z-index : 2;
        padding-bottom: 5vmin;
    }
</style>
