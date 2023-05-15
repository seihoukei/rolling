<script>
    import registerTrigger from "utility/register-trigger.js"
    import GAME_BONUSES from "data/game-bonuses.js"
    import Trigger from "utility/trigger.js"

    export let game
    export let bonuses = []

    //TODO: per season distributions

    const BONUSES = [
        "spike",
        "spike",
        "spike",
        "spike",
        "score",
        "score",
        "score",
        "slow",
        "fast",
        "jump",
        "clone",
    ]

    $: world = game?.world ?? {}

    registerTrigger("command-spawn-bonus", spawnBonus)
    registerTrigger("command-pick-bonus", pickBonus)

    function spawnBonus(x) {
        const type = BONUSES[Math.random() * BONUSES.length | 0]
        const data = GAME_BONUSES[type]
        bonuses.push({
            type, x,
            y : world.ground - Math.random() * data.maxHeight,
            size : 10,
        })
        bonuses = bonuses
    }

    function pickBonus(character, bonus) {
        const data = GAME_BONUSES[bonus.type]
        if (!data)
            return

        if (data.pickable) {
            if (bonus.picked)
                return
            bonus.picked = true
        }

        Trigger(data.event, character, bonus)
    }

</script>
