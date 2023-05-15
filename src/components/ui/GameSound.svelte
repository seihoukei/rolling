<script>
    import {onDestroy, onMount} from "svelte"
    import registerTrigger from "utility/register-trigger.js"

    registerTrigger("command-game-start", startMusic)
    registerTrigger("game-over", stopMusic)
    registerTrigger("command-play-sound", playSound)

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
</script>
