<script>
    export let rhythm = {}

    $: cssVariables = `
        --rhythm-start:${(rhythm.successStart * 100).toFixed(2)}%;
        --rhythm-end:${rhythm.successEnd * 100}%;
        --rhythm-current:${rhythm.current / rhythm.rate * 100}%;
        --rhythm-last:${rhythm.last / rhythm.rate * 100}%;
    `
</script>

<div class="rhythm" style={cssVariables}>
    <div class="target"></div>
    <div class="last"
         class:good={rhythm.state === 1}
         class:bad={rhythm.state === -1}
    ></div>
    <div class="current"></div>
</div>

<style>
    div.rhythm {
        position: absolute;
        left : 0;
        right : 0;
        top : 0;
        bottom : 0;

        transform: scale(3, 3)
    }

    div.target {
        position: absolute;
        left : 0;
        right : 0;
        top : 0;
        bottom : 0;

        border-radius: 50%;
        background: radial-gradient(closest-side, #FFFF5500, #FFFF5500 var(--rhythm-start), #FFFF5588 var(--rhythm-start), #FFFF5588 var(--rhythm-end), #FFFF5500 var(--rhythm-end),#FFFF5500);
        background-size: 100%;
    }

    div.current {
        position: absolute;
        left : 0;
        right : 0;
        top : 0;
        bottom : 0;
        border-radius: 50%;

        background: radial-gradient(closest-side, #FFFF5500,#FFFF5500,#FFFF55FF);
        transform: scale(var(--rhythm-current), var(--rhythm-current));
    }

    div.last {
        position: absolute;
        left : 0;
        right : 0;
        top : 0;
        bottom : 0;
        border-radius: 50%;

        background: radial-gradient(closest-side, #FFFFFF00,#FFFFFF00,#FFFFFF88);
        transform: scale(var(--rhythm-last), var(--rhythm-last));
    }

    div.good {
        background: radial-gradient(closest-side, #88FF5500,#88FF5500,#88FF55FF);
    }

    div.bad {
        background: radial-gradient(closest-side, #FF885500,#FF885500,#FF8855FF);
    }


</style>
