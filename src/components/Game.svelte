<script>
    import GameDisplay from "components/ui/GameDisplay.svelte"
    import GameCharacters from "components/engine/GameCharacters.svelte"
    import GameShines from "components/engine/GameShines.svelte"
    import GameObjects from "components/engine/GameObjects.svelte"
    import GameWorld from "components/engine/GameWorld.svelte"
    import GameCollisions from "components/engine/GameCollisions.svelte"
    import GameSound from "components/ui/GameSound.svelte"
    import GameRhythm from "components/engine/GameRhythm.svelte"

    import {onDestroy, onMount, tick} from "svelte"
    import Trigger from "utility/trigger-svelte.js"
    import GameSettings from "components/engine/GameSettings.svelte"

    export let gameId

    Trigger.on("command-reset-game", resetGame)

    let characters, objects, shines, rhythm, world, settings

    let game = {}

    $: game.characters = characters
    $: game.objects = objects
    $: game.shines = shines
    $: game.world = world
    $: game.rhythm = rhythm
    $: game.settings = settings

    let animationFrame = null
    let lastTime = performance.now()

    function frame() {
        const now = performance.now()
        let delta = (now - lastTime) / 1000
        if (delta > rhythm?.rate)
            delta = delta % rhythm.rate
        Trigger("command-advance", delta)
        lastTime = now
        animationFrame = requestAnimationFrame(frame)
    }

    function resetGame() {
        gameId = Math.random()
    }

    onMount(async () => {
        await tick()
        Trigger("command-create-character")
        animationFrame = requestAnimationFrame(frame)
    })

    onDestroy(() => cancelAnimationFrame(animationFrame))

</script>

<GameRhythm bind:rhythm />

<GameWorld bind:world />
<GameObjects bind:objects />
<GameShines bind:shines />
<GameCharacters {game} bind:characters />

<GameCollisions firstArray={characters}
                 secondArray={objects}
                 event="command-hit-object"
/>

<GameDisplay {game} />
<GameSound {game} />

<GameSettings bind:settings />
