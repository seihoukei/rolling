<script>
    import OverlayRhythm from "components/ui/OverlayRhythm.svelte"

    export let game

    $: world = game?.world ?? {}
    $: rhythm = game?.rhythm ?? {}
</script>

{#if world.rules}
    <div class="rules">
        Left click or tap left half to ROLL!

        Right-click or tap right half to JUMP!

        The faster you ROLL the higher you JUMP!

        Hit the rhythm to ROLL faster and JUMP higher!

        JUMP to the rhythm midair to DASH!

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

        color : #CCCCCC;
        background-color: #222222AA;

        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;

        font-size: 4vmin;
        white-space: pre-line;
        z-index : 2;
        padding: 5vmin;

        border-radius: 10vmin;
    }
</style>
