<script>
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let text

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.DISPLAY)

    function advance(time) {
        text.progress += time
    }

    $: x = text.x
    $: y = text.y - text.progress / text.time * 20
    $: opacity = 1 - text.progress / text.time

    $: cssVariables = `
        --text-x : ${x}em;
        --text-y : ${y}em;
        --text-opacity: ${opacity}
    `

</script>

<div class="text" style={cssVariables}>
    <span class="text">{text.text}</span>
</div>

<style>
    div.text {
        position: absolute;
        left: calc(50em + var(--text-x));
        top: calc(50vmin + var(--text-y));
        opacity: var(--text-opacity);
        z-index: 5;
        color : black;
        transform: translate(-50%, -100%);
        pointer-events: none;
    }

    span.text {
        font-size: 4em;
    }
</style>
