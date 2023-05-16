<script>
    export let rhythm = {}

    $: cssVariables = `
        --rhythm-start:${(rhythm.successStart * 100).toFixed(2)}%;
        --rhythm-end:${rhythm.successEnd * 100}%;
        --rhythm-current:${(1 - rhythm.current / rhythm.rate) * 125}%;
        --rhythm-last:${(1 - rhythm.last / rhythm.rate) * 125}%;
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

        background: radial-gradient(closest-side, #FFFF5500, #FFFF5500 80%, #FFFF55FF 80%, #FFFF5544 90%, #FFFF5500);
        transform: scale(var(--rhythm-current), var(--rhythm-current));
    }

    div.last {
        position: absolute;
        left : 0;
        right : 0;
        top : 0;
        bottom : 0;
        border-radius: 50%;

        transform: scale(var(--rhythm-last), var(--rhythm-last));
    }

    div.good {
        background: radial-gradient(closest-side, #55FF5500, #55FF5500 80%, #55FF55FF 80%, #55FF5544 90%, #55FF5500);
    }

    div.bad {
        background: radial-gradient(closest-side, #FF555500, #FF555500 80%, #FF5555FF 80%, #FF555544 90%, #FF555500);
    }


</style>
