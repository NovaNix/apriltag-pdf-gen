<script>
	import {config, previewInfo} from './stores.js';
</script>

<details id="print-info">
	<summary>Print Info</summary>
	<p>{$previewInfo.pages} pages, {$config.tagCount} tags</p>
	<p>Tags Per Page: {$previewInfo.tagsPerPage} </p>
	<p>x: {$previewInfo.tagsPerX}, y: {$previewInfo.tagsPerY}</p>
	{#if $config.debug}
		<h2>Debug Info</h2>
		<p>Tag Size: {$previewInfo.tagSize}mm</p>
		<p>Content Width: {$previewInfo.contentWidth}mm</p>
		<p>Content Height: {$previewInfo.contentHeight}mm</p>
		<p>Scale X: {$previewInfo.scaleX}</p>
		<p>Scale Y: {$previewInfo.scaleY}</p>
	{/if}
</details>

<style>
	#print-info {
		font-size: 1em;
		padding: 0.5em 1em;
	}

	p {
		text-align: center;
	}

	details {
	    border: 1px solid #aaa;
	    border-radius: 4px;
	    padding: .5em .5em 0;
	}

	summary {
	    font-weight: bold;
	    margin: -.5em -.5em 0;
	    padding: .5em;
	}

	details[open] {
	    padding: .5em;
	}

	details[open] summary {
	    border-bottom: 1px solid #aaa;
    	margin-bottom: .5em;
	}
</style>