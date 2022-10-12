<script>
    import {config} from '../stores.js';
	import {tagData} from "../preview/Tag.svelte";
</script>

<fieldset>

    <legend>Range</legend>

    <div id="range-selectors">
        <div>
            <label for="tag-index-selector">Start</label>
            <input type="number" id="tag-index-selector" name="tag-index-selector" min="0" max={tagData[$config.tagType].count - 1}  bind:value={$config.startingIndex}>
        </div>
    
        <div>
            <label for="tag-count-selector">Count</label>
            <input type="number" id="tag-count-selector" name="tag-count-selector" min="1" max={tagData[$config.tagType].count - $config.startingIndex} bind:value={$config.tagCount}>
        </div>
    </div>

    <output>{$config.startingIndex} - {($config.tagCount - 1) + $config.startingIndex}</output>
</fieldset>

<style>

    #range-selectors {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    label {
        width: 100%;
        display: block;
        text-align: center;
    }

    output {
        width: 100%;
        text-align: center;
        display: block;
    }

    input {
        width: 5em;
    }
</style>