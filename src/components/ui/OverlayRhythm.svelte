<script>
    export let game

    const stateImages = {
        [-2] : "../resources/rhythm/angry.png",
        [-1] : "../resources/rhythm/miss.png",
        [0] : "../resources/rhythm/waiting.png",
        [1] : "../resources/rhythm/great.gif",
    }

    $: rhythm = game?.rhythm ?? {}
    $: world = game?.world ?? {}

    $: over = world.over
    $: started = world.started
    $: nobongo = !started || over
    $: dancers = world.multiplier

    $: repeatStart = 100/3
    $: repeatEnd = 100
    $: successStart = rhythm.successStart / 0.0075
    $: successEnd = rhythm.successEnd / 0.0075
    $: currentPosition = (rhythm.current / rhythm.rate) / 0.0075
    $: lastPosition = (rhythm.last / rhythm.rate) / 0.0075

    $: cssVariables = `
        --reaction-background: url("${stateImages[rhythm.state]}");
        --rhythm-repeat-start: ${repeatStart}%;
        --rhythm-repeat-end: ${repeatEnd}%;
        --rhythm-success-start: ${successStart}%;
        --rhythm-success-end: ${successEnd}%;
        --rhythm-current-position: ${currentPosition}%;
        --rhythm-last-position: ${lastPosition}%;
    `

</script>

<div class="container"
     class:nobongo
     style={cssVariables}
>
    <div class="vibe"></div>
    <div class="bars">
        <div class="dance">
            <div class="dancer" class:visible={dancers >= 1}></div>
            <div class="dancer" class:visible={dancers >= 2}></div>
            <div class="dancer" class:visible={dancers >= 3}></div>
            <div class="dancer" class:visible={dancers >= 4}></div>
            <div class="dancer" class:visible={dancers >= 5}></div>
        </div>
        <div class="bar">
            <div class="bar-bg"></div>
            <div class="bar-fg last"></div>
            <div class="bar-fg current"></div>
        </div>
    </div>
    <div class="reaction"></div>
</div>

<style>
    div.container {
        position: absolute;
        right : 0;
        top : 0;
        width : 60vw;
        height: 10vw;

        display: flex;
        align-items: stretch;
        justify-content: stretch;
        z-index : 3;
    }

    div.vibe, div.reaction {
        width : 10vw;
        height : 10vw;
    }
    div.vibe {
        background: url("../resources/rhythm/vibe.gif");
        background-size: cover;
    }

    div.reaction {
        background: var(--reaction-background);
        background-size: cover;
    }

    div.bars {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        justify-content: stretch;
    }
    div.bar {
        position: relative;
        width: 40vw;
        height: 4vw;
    }

    div.bar-bg {
        position: absolute;
        left : 0;
        top : 1vw;
        right : 0;
        bottom : 1vw;
        border : 1px solid black;
        background: linear-gradient(to right,
            #FF0000FF, #FF0000FF var(--rhythm-repeat-start), #FF000077 var(--rhythm-success-start),
            #00FF0077 var(--rhythm-success-start),#00FF00FF,  #00FF0077 var(--rhythm-success-end),
            #FF000077 var(--rhythm-success-end), #FF0000FF
        );
    }

    div.bar-fg {
        position: absolute;
        top : 0;
        bottom : 0;
        width : 2vw;
        margin-left: -1vw;
    }

    div.bar-fg.current {
        background: linear-gradient(to right, #FFFF5500, #FFFF5544, #FFFF55FF, #FFFF55FF, #FFFF5544, #FFFF5500);
        left : var(--rhythm-current-position);
    }

    div.bar-fg.last {
        background: linear-gradient(to right, #55FFFF00, #55FFFF44, #55FFFFFF, #55FFFFFF, #55FFFF44, #55FFFF00);
        left : var(--rhythm-last-position);
    }

    div.dance {
        height: 6vw;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    div.dancer {
        height: 6vw;
        width: 6vw;

        background: url("../resources/rhythm/dance.gif");
        background-size: cover;
        opacity : 0;
        transition: opacity 0.2s;
    }
    div.nobongo div.dancer, div.nobongo div.vibe {
        background: url("../resources/rhythm/sad.png");
        background-size: cover;
    }

    div.dancer.visible {
        opacity: 1;
    }
</style>
