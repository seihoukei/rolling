<script>
    import {onDestroy, onMount} from "svelte"
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let game

    Trigger.on("command-game-start", startMusic)
    Trigger.on("game-over", stopMusic)
    Trigger.on("command-play-sound", playSound)
    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.RHYTHM)

    const audio = {}
    const bgm = {}
    let musicStartTime = 0

    $: settings = game?.settings ?? {}

    onMount(() => {
        audio.music = new Audio("./resources/bgm/music.mp3")
        audio.hit = new Audio("./resources/bgm/hit.mp3")
    })

    onDestroy(() => {
        for (const item of Object.values(audio)) {
            item?.pause?.()
            item?.destroy?.()
        }

        bgm?.track?.disconnect?.()
        bgm?.analyser?.disconnect?.()
        bgm?.gain?.disconnect?.()
    })


    function startMusic() {
        bgm.context = new AudioContext()
        bgm.track = bgm.context.createMediaElementSource(audio.music)

        bgm.analyser = bgm.context.createAnalyser()
        bgm.gain = bgm.context.createGain()

        bgm.dataArray = new Uint8Array(16)

        bgm.track.connect(bgm.analyser)
        bgm.analyser.connect(bgm.gain)
        bgm.gain.connect(bgm.context.destination)

        bgm.gain.gain.setValueAtTime(settings.bgmVolume, bgm.context.currentTime)
        //audio.music.volume = settings.bgmVolume

        audio.music?.play()
    }

    function stopMusic() {
        audio.music?.pause?.()
    }

    function playSound(name) {
        if (!audio[name])
            return

        audio[name].volume = settings.soundVolume

        audio[name].currentTime = 0
        audio[name].play()
    }

    function advance() {
        if (!bgm.analyser)
            return

        if (musicStartTime === 0) {
            bgm.analyser.getByteTimeDomainData(bgm.dataArray)
            if (bgm.dataArray.some(x => x !== 128)) {
                musicStartTime = bgm.context.currentTime
            }
        }

        if (musicStartTime !== 0 && !audio.music.paused) {
            const time = bgm.context.currentTime - musicStartTime
            Trigger("command-rhythm-sync", time)
        }
    }
</script>
