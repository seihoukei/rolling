<script>
    import registerTrigger from "utility/register-trigger.js"
    import GameCharacter from "components/engine/GameCharacter.svelte"
    import Trigger from "utility/trigger.js"

    export let game
    export let characters = []

    registerTrigger("command-advance", advance)
    registerTrigger("command-clone-character", cloneCharacter)
    registerTrigger("command-create-character", createCharacter)
    registerTrigger("bonus-clone", bonusClone)

    $: world = game?.world ?? {}

    function createCharacter() {
        const character = {
            x : 0,
            y : world.ground,
            dx : 0,
            dy : 0,
            size : 10,
            dead : false,
        }
        characters.push(character)
        characters = characters
    }

    function cloneCharacter(character, x = character.x, y = character.y) {
        const newCharacter = {...character, x, y}

        //offset?

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
