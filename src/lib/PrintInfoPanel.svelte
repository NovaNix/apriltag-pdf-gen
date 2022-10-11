<script>
	import {config, previewInfo} from './stores.js';
</script>

<section id="print-info">
	<h3>Print Info</h3>
	<p>{$previewInfo.pages} pages, {$config.tagCount} tags</p>
	<p>Tags Per Page: {$previewInfo.tagsPerPage} </p>
	<p>x: {$previewInfo.tagsPerX}, y: {$previewInfo.tagsPerY}</p>
	<p id="preview-scale">Preview Scale: {Number($previewInfo.scale).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</p>
</section>

<style>
	#print-info {
		font-size: 1em;
		background-color: lightgray;
		padding: 0.5em 1em;
	}

	h3 {
		text-align: center;
	}

	p {
		text-align: center;
	}
</style>