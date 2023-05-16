<script>
    import Trigger from "utility/trigger-svelte.js"

    export let shine

    const SHINE_GRAVITY = 1

    Trigger.on("command-advance", advance)

    function advance(time = 0) {
        if (shine.progress > shine.time)
            return
        shine.progress += time
        shine.x += shine.dx * time
        shine.y += shine.dy * time
        shine.dy -= SHINE_GRAVITY * time * 100
        shine.opacity = Math.max(0, 1 - shine.progress / shine.time)
    }

</script>
