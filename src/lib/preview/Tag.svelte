<script>
	import {config} from '../stores.js';
	
	const imageRepo = "https://github.com/AprilRobotics/apriltag-imgs/blob/master/"; 

	// Contains the tag prefix and other info for each tag type
	const tagDataDict = {
		"tag16h5": {
			tagPrefix: "tag16_05_",
		},

		"tag25h9": {
			tagPrefix: "tag25_09_",
		},

		"tag36h11": {
			tagPrefix: "tag36_11_",
		},

		"tagCircle21h7": {
			tagPrefix: "tag21_07_",
		}, 

		"tagCircle49h12": {
			tagPrefix: "tag49_12_",
		},

		"tagCustom48h12": {
			tagPrefix: "tag48_12_",
		},

		"tagStandard41h12": {
			tagPrefix: "tag41_12_"
		},

		"tagStandard52h13": {
			tagPrefix: "tag52_13_"
		}
	};

	export let index;

	$: fileName = tagDataDict[$config.tagType].tagPrefix + String(index).padStart(5, "0") + ".png";
	$: source = `${imageRepo}${$config.tagType}/${fileName}?raw=true`;
</script>

<section class="tag-section">
	<img class="tag-img" src="{source}" alt="tag {index}">
	{#if $config.dataToggles.type || $config.dataToggles.number || $config.dataToggles.dimensions}
		<div class="tag-meta">
			{#if $config.dataToggles.type}<p class="tag-info tag-type">{$config.tagType}</p>{/if}
			{#if $config.dataToggles.number}<p class="tag-info tag-index"> #{index}</p>{/if}
			{#if $config.dataToggles.dimensions}<p class="tag-info tag-dimensions">{$config.tagDimensions}mm x {$config.tagDimensions}mm</p>{/if}
		</div>
	{/if}
</section>

<style>
	.tag-section {
    	background-color: white;

    	/* Tag sections should have a dotted line around them to make it easier to cut them out */
    	border-color: gray;
    	border-style: dashed;
    	border-width: 1px;

    	width: min-content;
    	height: min-content;
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    	align-items: center;

    	flex-shrink: 0;

    	padding: var(--tag-padding);
	}

	.tag-img {
	    image-rendering: crisp-edges;
	    image-rendering: pixelated;

	    width: var(--tag-size);
	    height: var(--tag-size);
	}

	.tag-meta {
	    margin-top: var(--tag-padding);
	    font-size: var(--font-size);
	}


	.tag-info {
	    width: var(--tag-size);
	    text-align: center;
	}
</style>