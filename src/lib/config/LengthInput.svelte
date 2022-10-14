<script>
    export let name;
    export let unit = "mm";
    export let min = 0;
    export let max;
    export let step = "1";

    export let inputWidth = "5";

    export let value;

    let rawValue; // The raw user input value. Will be passed to the export if it is valid

    $: {
        rawValue = value;
    }

    let inputElement;

    // Checks to see if the raw value is valid, and if it is, set the value export to it
    function updateValue()
    {
        if (inputElement.checkValidity())
        {
            value = rawValue;
        }
    }

</script>

<div>
    <label for={name}><slot></slot></label>
    <div class="length-input" style="--unit-chars: {unit.length}" data-unit={unit}>
        <input type="number" style="--input-width: {inputWidth + "ch"}" bind:this={inputElement} bind:value={rawValue} on:input={updateValue} name={name} min={min} max={max} step={step} />
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
    
    input:invalid {
        border: none;
        outline: 2px solid red;
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