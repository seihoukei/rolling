<script>
    import GAME_OBJECTS from "data/game-objects.js"
    import GAME_RULES from "data/game-rules.js"

    import Trigger from "utility/trigger-svelte.js"

    export let objects = []

    Trigger.on("command-spawn-object", spawnObject)
    Trigger.on("command-hit-object", hitObject)
    Trigger.on("command-destroy-object", destroyObject)

    function spawnObject(list, x) {
        const type = typeof list === 'string' ? list : list[Math.random() * list.length | 0]
        const data = GAME_OBJECTS[type]
        objects.push({
            type, x,
            y : GAME_RULES.ground - data.size / 2 + 5 - Math.random() * data.maxHeight,
            size : data.size ?? 10,
            z : data.z ?? 1,
        })
        objects = objects
    }

    function hitObject(character, object) {
        if (object.dead)
            return

        const data = GAME_OBJECTS[object.type]
        if (!data)
            return

        if (data.pickable) {
            object.dead = true
            Trigger("object-picked-up", object)
        }

        Trigger(data.event, character, object)

        objects = objects
    }

    function destroyObject(object) {
        const data = GAME_OBJECTS[object.type]
        if (!data?.destructible)
            return

        object.dead = true
        Trigger("object-destroyed", object)

        objects = objects
    }

</script>
