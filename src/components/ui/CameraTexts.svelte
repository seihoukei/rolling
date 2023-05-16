<script>
    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"
    import CameraText from "components/ui/CameraText.svelte"
    import GAME_OBJECTS from "data/game-objects.js"

    export let camera

    let texts = []

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.DISPLAY_CLEANUP)

    Trigger.on("object-picked-up", objectPicked)

    function objectPicked(object) {
        const data = GAME_OBJECTS[object?.type]
        if (!data?.text)
            return

        addText(object.x - camera.x, object.y - camera.y, data.text, 1)
    }

    function addText(x, y, text, time) {
        texts.push({
            x, y, text, time,
            progress : 0
        })
    }

    function advance() {
        texts = texts.filter(x => x.progress < x.time)
    }

</script>

{#each texts as text}
    <CameraText {text} />
{/each}
