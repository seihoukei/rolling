<script>
    import DisplayRhythm from "components/ui/DisplayRhythm.svelte"

    export let character
    export let game

    const ROLL_FRAMES = 49

    $: world = game?.world ?? {}
    $: rhythm = game?.rhythm ?? {}

    $: dead = character.dead ?? false
    $: still = character.dx === 0
    $: frame = (Math.floor(character.x) % ROLL_FRAMES + ROLL_FRAMES) % ROLL_FRAMES

    $: cssVariables = `
        --character-x: ${character.x}em;
        --character-y: ${character.y}em;
        --character-size: ${character.size}em;
        --character-background-y: ${-character.size * (Math.floor(frame) % 49)}em;
    `

</script>


<div class="character"
     class:still
     class:dead
     style={cssVariables}
>
    {#if !dead}
        <DisplayRhythm {rhythm} />
    {/if}
</div>

<style>
    div.character {
        position: absolute;
        background-color : #22CC22;
        z-index: 10;
        width : var(--character-size);
        height : var(--character-size);
        left : calc(50em + var(--character-x) - var(--camera-x) - (var(--character-size) / 2));
        top : calc(50vmin + var(--character-y) - var(--camera-y) - (var(--character-size) / 2));
        background: url("../resources/scampuss/roll_sprites.png");
        background-size: var(--character-size) calc(var(--character-size) * 49);
        background-position: 0 var(--character-background-y);
        cursor: pointer;
    }

    div.still {
        background: url("../resources/scampuss/lost.png");
        background-size: var(--character-size) var(--character-size);
        background-position: 0 0;
        cursor: pointer;
    }

    div.dead {
        background: url("../resources/scampuss/rage.png");
        background-size: var(--character-size) var(--character-size);
        background-position: 0 0;
        cursor: default;
    }
</style>
