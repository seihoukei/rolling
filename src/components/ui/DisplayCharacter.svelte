<script>
    import CharacterRhythm from "components/ui/CharacterRhythm.svelte"

    import GAME_RULES from "data/game-rules.js"

    export let character
    export let game

    const ROLL_FRAMES = 49
    let dashDirection = 0

    $: world = game?.world ?? {}
    $: rhythm = game?.rhythm ?? {}

    $: dead = character.dead ?? false
    $: last = character.last ?? false
    $: still = character.dx === 0
    $: frame = (Math.floor(character.x) % ROLL_FRAMES + ROLL_FRAMES) % ROLL_FRAMES
    $: if (character.dash) dashDirection = Math.atan2(character.dy, character.dx)

    $: cssVariables = `
        --character-x: ${character.x}em;
        --character-y: ${character.y}em;
        --character-size: ${character.size}em;
        --character-background-y: ${-character.size * frame}em;
        --dash-opacity: ${Math.max(0, Math.min(character.dashCooldown / GAME_RULES.dashCooldown, 1))};
        --dash-direction: ${dashDirection}rad;
    `

</script>


<div class="character"
     class:still
     class:dead
     style={cssVariables}
>
    {#if last}
        <CharacterRhythm {rhythm} />
    {/if}
    <div class="dash"> </div>
</div>

<style>
    div.character {
        position: absolute;
        z-index: 10;
        width : var(--character-size);
        height : var(--character-size);
        left : calc(50em + var(--character-x) - var(--camera-x) - (var(--character-size) / 2));
        top : calc(50vmin + var(--character-y) - var(--camera-y) - (var(--character-size) / 2));
        background: url("../resources/scampuss/roll_sprites.png");
        background-size: var(--character-size) calc(var(--character-size) * 49);
        background-repeat: no-repeat;
        background-position: 0 var(--character-background-y);
    }

    div.still {
        background: url("../resources/scampuss/lost.png");
        background-size: var(--character-size) var(--character-size);
        background-position: 0 0;
    }

    div.dead {
        background: url("../resources/scampuss/rage.png");
        background-size: var(--character-size) var(--character-size);
        background-position: 0 0;
    }

    div.dash {
        position: absolute;
        left : -900%;
        right : 0;
        top : 0;
        bottom: 0;
        border-radius: 0 var(--character-size) var(--character-size) 0;
        background: linear-gradient(to bottom, #FFFF55, #FFFFFF00, #FFFFFF00, #FFFF55);
        opacity: var(--dash-opacity);
        transform-origin: 95% 50%;
        transform: rotate(var(--dash-direction));
    }
</style>
