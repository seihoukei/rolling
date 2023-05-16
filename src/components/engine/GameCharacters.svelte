<script>
    import GameCharacter from "components/engine/GameCharacter.svelte"

    import GAME_RULES from "data/game-rules.js"

    import Trigger from "utility/trigger-svelte.js"
    import TRIGGER_PRIORITIES from "data/trigger-priorities.js"

    export let game
    export let characters = []

    Trigger.on("command-advance", advance)
        .setPriority(TRIGGER_PRIORITIES.ADVANCE.CLEANUP)

    Trigger.on("command-clone-character", cloneCharacter)
    Trigger.on("command-create-character", createCharacter)
    Trigger.on("bonus-clone", bonusClone)

    function createCharacter() {
        const character = {
            x : 0,
            y : GAME_RULES.ground,
            dx : 0,
            dy : 0,
            dash : 0,
            dashCooldown : 0,
            nonJumpDashes : 0,
            size : 10,
            dead : false,
            jumping : false,
        }
        characters.push(character)
        characters = characters
    }

    function cloneCharacter(character, x = character.x, y = character.y) {
        const newCharacter = {...character, x, y}

        newCharacter.jumping = true
        newCharacter.dash += 0.2

        characters.push(newCharacter)
        characters = characters
    }

    function bonusClone(character, bonus) {
        cloneCharacter(character, bonus.x, bonus.y)
    }

    function advance() {
        if (characters.length && characters.every(x => x.dead))
            Trigger("game-over")
    }

</script>

{#each characters as character}
    <GameCharacter {game} bind:character />
{/each}
