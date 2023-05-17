<script>

import GAME_OBJECTS from "data/game-objects.js"
import GAME_SEASONS from "data/game-seasons.js"

let preloader

setTimeout(() => {
    preloader.remove()
}, 1000)
</script>

<div class="hidden" bind:this={preloader}>
    {#each Object.entries(GAME_OBJECTS) as [name, data]}
        <div class="preloader" style={`--background: url("${data.sprite}")`}></div>
    {/each}
    {#each GAME_SEASONS as data, id}
        <div class="preloader" style={`--background: url("${data.background}")`}></div>
    {/each}
    <audio src="./resources/bgm/music.mp3" preload="auto"></audio>
    <audio src="./resources/bgm/hit.mp3" preload="auto"></audio>
</div>

<style>
    div.preloader {
        opacity : 0;
        pointer-events: none;
        background: var(--background);
    }
</style>
