<script>
    import {onDestroy, onMount} from "svelte"
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    Trigger.on("command-game-start", startMusic)
    Trigger.on("game-over", stopMusic)
    Trigger.on("command-play-sound", playSound)
    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.RHYTHM)

    const audio = {}
    onMount(() => {
        audio.music = new Audio("./resources/bgm/music.mp3")
        audio.hit = new Audio("./resources/bgm/hit.mp3")
    })

    onDestroy(() => {
        for (const item of Object.values(audio)) {
            item?.pause?.()
            item?.destroy?.()
        }
    })

    function startMusic() {
        audio.music?.play?.()
    }

    function stopMusic() {
        audio.music?.pause?.()
    }

    function playSound(name) {
        if (!audio[name])
            return

        audio[name].currentTime = 0
        audio[name].play()
    }

    function advance() {
        if (!audio?.music?.paused)
            Trigger("command-rhythm-sync", audio.music.currentTime )
    }
</script>
