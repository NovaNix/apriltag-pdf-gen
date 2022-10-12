<script>
    export let name;
    
    export let min;
    export let max;
    export let step;

    export let value;

</script>

<div>
    <label for={name}><slot></slot></label>
    <div class="slider-num-input">
        <input type="range" class="slider-input" name={name} min={min} max={max} step={step} bind:value>
        <input type="number" class="number-input" name={name} min={min} max={max} step={step} bind:value>
    </div>
</div>

<style>
    .slider-num-input {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .number-input {
        width: 5em;
        flex-shrink: 0;
    }

    .slider-input {
        flex-shrink: 1;
        width: 100%;
    }
</style>