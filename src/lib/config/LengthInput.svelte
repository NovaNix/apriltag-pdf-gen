<script>
    export let name;
    export let unit = "mm";
    export let min = 0;
    export let max;
    export let step = "1";

    export let inputWidth = "5";

    export let value;
</script>

<div>
    <label for={name}><slot>Insert Label Text Here</slot></label>
    <!-- <label class="unit-label" data-unit={unit} style="--unit-chars: {unit.length}"><input type="number" bind:value name={name} min={min} max={max} step={step}  /></label> -->
    <div class="length-input" style="--unit-chars: {unit.length}" data-unit={unit}>
        <input type="number" style="--input-width: {inputWidth + "ch"}" bind:value name={name} min={min} max={max} step={step} />
    </div>
</div>

<style>
    
    .length-input {
        position: relative;
        display: inline-block;
    }

    .length-input::after {
        content: attr(data-unit);
        position: absolute;
        bottom: 2px;
        right: 0.5ch;
        /* width: calc(1ch * var(--unit-chars)); */
        display: block;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
    }

    input {  
        padding-right: calc(2ch + calc(1ch * var(--unit-chars)));
        box-sizing: border-box;
        width: calc(var(--input-width) + 3px + calc(2ch + calc(1ch * var(--unit-chars))));
    }

    input::after {
        content: "hello";
        
        
    }

    .unit-label::after {
        content: attr(data-unit);
        position: absolute;
        top: 4px;
        /* left: calc(1ch * var(--unit-chars)); */
        text-align: right;
        right: 0;
        font-size: 12px;
        display: block;
        color: rgba(0, 0, 0, 0.6);
        font-weight: bold;
    }
    
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>