<script>
    import {previewScale} from '../stores.js';
</script>

<aside id="preview-info">
    Preview Scale: {Number($previewScale).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}
</aside>

<style>
    #preview-info {
        font-size: 1em;
        position: sticky;
        right: 5px;
        bottom: 0px;
        text-align: right;
    }

    @media print {
        #preview-info {
            display: none;
        }
    }
</style>