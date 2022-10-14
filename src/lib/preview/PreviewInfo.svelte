<script>
    import {previewInfo} from '../stores.js';
</script>

<aside>
    <p id="preview-scale">Preview Scale: {Number($previewInfo.scale).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</p>
</aside>

<style>
    aside {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 2em;

        background-color: white;
        border: 1px solid #aaa;
        box-sizing: border-box;
    }

    p {
        line-height: calc(2em - 2px); /* Line height needs to be adjusted to account for the borders on the parent */
        font-size: 1em;
        text-align: center;
        padding: 0;
        margin: 0;
    }
</style>