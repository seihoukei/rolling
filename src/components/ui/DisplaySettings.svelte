<script>
    import Trigger from "utility/trigger-svelte.js"

    export let game
    export let displaySettings

    $: settings = game?.settings ?? {}

    function setBGMVolume(event) {
        const rect = event.target.getBoundingClientRect()
        const value = Math.round((event.clientX - rect.left) / rect.width * 10) / 10
        Trigger("command-set-setting", "bgmVolume", value)
    }

    function setSoundVolume(event) {
        const rect = event.target.getBoundingClientRect()
        const value = Math.round((event.clientX - rect.left) / rect.width * 10) / 10
        Trigger("command-set-setting", "soundVolume", value)
    }

    function setRhythmOffset(event) {
        const rect = event.target.getBoundingClientRect()
        const value = Math.round((event.clientX - rect.left) / rect.width * 20) / 20
        Trigger("command-set-setting", "rhythmOffset", value)
    }

    function hideSettings() {
        displaySettings = false
    }

    $: cssVariables = `
        --bgm-volume: ${settings.bgmVolume * 100}%;
        --sound-volume: ${settings.soundVolume * 100}%;
        --rhythm-offset: ${settings.rhythmOffset * 200}%;
    `

</script>

<div class="settings container" style={cssVariables}>
    <div class="settings title">BGM Volume</div>
    <div class="settings bgm bar" on:mouseup={setBGMVolume}></div>
    <div class="settings title">Sound Volume</div>
    <div class="settings sound bar" on:mouseup={setSoundVolume}></div>
    <div class="settings title">Rhythm offset</div>
    <div class="settings hint">only change if rhythm does not align with music on your device</div>
    <div class="settings rhythm bar" on:mouseup={setRhythmOffset}></div>
    <div class="settings done button" on:mouseup={hideSettings}>Done</div>
</div>

<style>
    div.container {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size : 5vmin;
        z-index: 10;
        padding: 5vmin;
        border-radius: 5vmin;

        background-color: #222222AA;
    }

    div.hint {
        font-size: 0.25em;
        text-align: center;
        max-width: 50vmin;
    }

    div.bar {
        height : 5vmin;
        width: 50vmin;
        cursor : pointer;
        border-radius: 2vmin;
        margin-bottom: 5vmin;
    }

    div.bar.bgm {
        background: linear-gradient(to right,
            #888800FF, #888800FF var(--bgm-volume),
            #88880044 var(--bgm-volume), #88880044
        );
    }

    div.bar.sound {
        background: linear-gradient(to right,
            #888800FF, #888800FF var(--sound-volume),
            #88880044 var(--sound-volume), #88880044
        );
    }

    div.bar.rhythm {
        background: linear-gradient(to right,
            #888800FF, #888800FF var(--rhythm-offset),
            #88880044 var(--rhythm-offset), #88880044
        );
    }

    div.button {
        background: black;
        border: 1px solid black;
        border-radius: 4vmin;
        padding: 2vmin 5vmin;
        color: #CCCCCC;
        cursor: pointer;
    }
</style>
