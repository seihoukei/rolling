<script>
    import GAME_SEASONS from "data/game-seasons.js"

    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let game

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.DISPLAY)

    let camera = {
        x : 0,
        y : 0,
    }

    $: world = game.world ?? {}
    $: characters = game.characters ?? []

    $: cssVariables = `
        --camera-x:${camera.x}em;
        --camera-y:${camera.y}em;
        --background:url("${GAME_SEASONS[world?.season ?? 0].background}");
    `

    function advance(time) {
        const liveCharacters = characters.filter(x => !x.dead)

        if (liveCharacters.length) {
            const cameraTarget = {
                x: 0,
                y: 0,
            }

            camera.followSpeed = Math.min(0.6, camera.followSpeed + 0.02 * time)

            const lastCharacter = liveCharacters
                .reduce((v,x) => x.x < v.x ? x : v)

            cameraTarget.x += lastCharacter.x + 40
            cameraTarget.y += lastCharacter.y + 10

            tweenCameraAxis(camera, cameraTarget, "x")
            tweenCameraAxis(camera, cameraTarget, "y")

            if (window.innerHeight > window.innerWidth)
                camera.y = Math.min(camera.y, -50 - (window.innerHeight / window.innerWidth - 1) * 100)
            else
                camera.y = Math.min(camera.y, -50 + (1 - window.innerHeight / window.innerWidth) * 50)
        }
    }

    function tweenCameraAxis(camera, target, axis) {
        const delta = Math.abs(target[axis] - camera[axis]) ** camera.followSpeed
        if (camera[axis] - delta > target[axis])
            camera[axis] = camera[axis] - delta
        else if (camera[axis] + delta < target[axis])
            camera[axis] = camera[axis] + delta
        else
            camera[axis] = target[axis]
    }

</script>

<div class="camera" style={cssVariables}>
    <slot />
</div>

<style>
    div.camera {
        position: relative;
        width: 100em;
        height: 100vh;
        overflow: hidden;
        background: url("../resources/backgrounds/roll_bg.png"), var(--background);
        background-repeat: repeat-x, repeat;
        background-position-x: calc(-100em - var(--camera-x)), calc(-1 * var(--camera-x));
        background-position-y: calc(50vmin - 50em - var(--camera-y)), calc(-1 * var(--camera-y));
        background-size: 200em 50em, 500em 125em;
        z-index: 1;
        transition: background-image 1s;
    }
</style>
