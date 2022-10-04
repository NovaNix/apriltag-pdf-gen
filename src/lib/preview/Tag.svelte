<script>
	import {config} from '../stores.js';
	
	const imageRepo = "https://github.com/AprilRobotics/apriltag-imgs/blob/master/"; 

	// Contains the tag prefix and other info for each tag type
	const tagDataDict = {
		"tag16h5": {
			name: "16h5",
			tagPrefix: "tag16_05_",
		},

		"tag25h9": {
			name: "25h9",
			tagPrefix: "tag25_09_",
		},

		"tag36h11": {
			name: "36h11",
			tagPrefix: "tag36_11_",
		},

		"tagCircle21h7": {
			name: "21h7",
			tagPrefix: "tag21_07_",
		}, 

		"tagCircle49h12": {
			name: "49h12",
			tagPrefix: "tag49_12_",
		},

		"tagCustom48h12": {
			name: "48h12",
			tagPrefix: "tag48_12_",
		},

		"tagStandard41h12": {
			name: "41h12",
			tagPrefix: "tag41_12_"
		},

		"tagStandard52h13": {
			name: "52h13",
			tagPrefix: "tag52_13_"
		}
	};

	export let index;

	$: fileName = tagDataDict[$config.tagType].tagPrefix + String(index).padStart(5, "0") + ".png";
	$: source = `${imageRepo}${$config.tagType}/${fileName}?raw=true`;
</script>

<section class="tag-section">
	<img class="tag-img" src="{source}" alt="tag {index}">
	{#if $config.dataToggles.type}<p class="tag-info tag-type">{tagDataDict[$config.tagType].name}</p>{/if}
	{#if $config.dataToggles.number}<p class="tag-info tag-index"> {index}</p>{/if}
	{#if $config.dataToggles.dimensions}<p class="tag-info tag-dimensions">{$config.tagDimensions}mm</p>{/if}
</section>

<style>
	.tag-section {
    	background-color: white;

    	/* Tag sections should have a dotted line around them to make it easier to cut them out */
    	border-color: gray;
    	border-style: dashed;
    	border-width: 1px;

    	width: calc(var(--tag-size) + calc(2 * var(--tag-padding)));
		height: calc(var(--tag-size) + calc(2 * var(--tag-padding)));
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    	align-items: center;
		
		position: relative;

    	flex-shrink: 0;
		overflow: hidden;

	}

	.tag-img {
	    image-rendering: crisp-edges;
	    image-rendering: pixelated;

	    width: var(--tag-size);
	    height: var(--tag-size);
	}

	.tag-info {
	    margin: 0;
	    padding: 0;
	    font-size: calc(var(--tag-padding) / 2);
		height: var(--tag-padding);
		text-align: center;
		line-height: var(--tag-padding);
	}

	.tag-type {
		position: absolute;
		left: var(--tag-padding);
		bottom: 0;
		
	}

	.tag-index {
		position: absolute;
		left: 50%;
		bottom: 0;
	}

	.tag-dimensions {
		position: absolute;
		right: var(--tag-padding);
		bottom: 0;
	}

</style>