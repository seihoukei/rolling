<script>
    import Trigger from "utility/trigger.js"
    import registerTrigger from "utility/register-trigger.js"
    import GameDisplay from "components/ui/GameDisplay.svelte"
    import GameCharacters from "components/engine/GameCharacters.svelte"
    import GameShines from "components/engine/GameShines.svelte"
    import GameObjects from "components/engine/GameObjects.svelte"
    import GameWorld from "components/engine/GameWorld.svelte"
    import {onDestroy, onMount, tick} from "svelte"
    import GameCollisions from "components/engine/GameCollisions.svelte"
    import GameSound from "components/ui/GameSound.svelte"
    import GameRhythm from "components/engine/GameRhythm.svelte"

    export let gameId

    registerTrigger("command-reset-game", resetGame)

    let characters
    let objects
    let shines
    let rhythm
    let world

    let game = {}

    $: game.characters = characters
    $: game.objects = objects
    $: game.shines = shines
    $: game.world = world
    $: game.rhythm = rhythm

    let animationFrame = null
    let lastTime = performance.now()

    function frame() {
        const now = performance.now()
        const delta = (now - lastTime) / 1000
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
<GameObjects {game} bind:objects />
<GameShines bind:shines />
<GameCharacters {game} bind:characters />

<GameCollisions firstArray={characters}
                 secondArray={objects}
                 event="command-hit-object"
/>

<GameDisplay {game} />
<GameSound />
