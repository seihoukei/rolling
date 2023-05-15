<script>

    export let shine

    $: cssVariables = `
        --shine-x: ${shine.x}em;
        --shine-y: ${shine.y}em;
        --shine-size: ${shine.size}em;
        --shine-opacity: ${shine.opacity};
    `

</script>

{#if shine.progress < shine.time}
    <div class="shine" style={cssVariables}></div>
{/if}

<style>
    div.shine {
        position: absolute;
        background-color: #FFFF55;
        z-index: 10;
        width: var(--shine-size);
        height: var(--shine-size);
        left: calc(50em + var(--shine-x) - var(--camera-x) - (var(--shine-size) / 2));
        top: calc(50vmin + var(--shine-y) - var(--camera-y) - (var(--shine-size) / 2));
        opacity: var(--shine-opacity);
        border-radius: 50%;
    }
</style>
