<script>
	import {config, previewInfo} from './stores.js';
</script>

<section id="print-info">
	<h3>Print Info</h3>
	<p>{$previewInfo.pages} Pages, {$config.tagCount} tags</p>
	<p>Tags Per X: {$previewInfo.tagsPerX}</p>
	<p>Tags Per Y: {$previewInfo.tagsPerY} </p>
	<p>Tags Per Page: {$previewInfo.tagsPerPage} </p>
	<p id="preview-scale">Preview Scale: {Number($previewInfo.scale).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</p>
</section>

<style>
	#preview-scale {
		font-size: 1em;
	}
</style>