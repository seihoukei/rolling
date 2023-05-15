<script>
    import registerTrigger from "utility/register-trigger.js"
    import GAME_OBJECTS from "data/game-objects.js"
    import Trigger from "utility/trigger.js"
    import GAME_RULES from "data/game-rules.js"

    export let objects = []

    registerTrigger("command-spawn-object", spawnObject)
    registerTrigger("command-hit-object", hitObject)
    registerTrigger("command-destroy-object", destroyObject)

    function spawnObject(list, x) {
        const type = typeof list === 'string' ? list : list[Math.random() * list.length | 0]
        const data = GAME_OBJECTS[type]
        objects.push({
            type, x,
            y : GAME_RULES.ground - Math.random() * data.maxHeight,
            size : 10,
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
