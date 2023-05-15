<script>
    import GAME_BONUSES from "data/game-bonuses.js"

    export let bonus

    $: picked = bonus.picked

    $: cssVariables = `
        --bonus-x: ${bonus.x}em;
        --bonus-y: ${bonus.y}em;
        --bonus-size: ${bonus.size}em;
        --background:url("${GAME_BONUSES[bonus.type].sprite}");
    `

</script>

<div class="bonus"
     class:picked
     style={cssVariables}
></div>

<style>
    div.bonus {
        position: absolute;
        background-color : #22CC22;
        z-index: 10;
        width : var(--bonus-size);
        height : var(--bonus-size);
        left : calc(50em + var(--bonus-x) - var(--camera-x) - (var(--bonus-size) / 2));
        top : calc(50vmin + var(--bonus-y) - var(--camera-y) - (var(--bonus-size) / 2));
        background: var(--background);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    div.picked {
        opacity: 0.1;
    }
</style>
