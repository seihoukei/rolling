<script>
    import GAME_OBJECTS from "data/game-objects.js"

    export let object

    $: dead = object.dead

    $: cssVariables = `
        --object-x: ${object.x}em;
        --object-y: ${object.y}em;
        --object-z: ${object.z};
        --object-size: ${object.size}em;
        --background:url("${GAME_OBJECTS[object.type].sprite}");
    `

</script>

<div class="object"
     class:dead
     style={cssVariables}
></div>

<style>
    div.object {
        position: absolute;
        background-color : #22CC22;
        z-index: var(--object-z);
        width : var(--object-size);
        height : var(--object-size);
        left : calc(50em + var(--object-x) - var(--camera-x) - (var(--object-size) / 2));
        top : calc(50vmin + var(--object-y) - var(--camera-y) - (var(--object-size) / 2));
        background: var(--background);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    div.dead {
        opacity: 0.1;
    }
</style>
