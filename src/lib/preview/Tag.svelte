<script context="module">
    export const tagData = {
		"tag16h5": {
			name: "16h5",
			tagPrefix: "tag16_05_",
			count: 30,
			bitwidth: 8
		},

		"tag25h9": {
			name: "25h9",
			tagPrefix: "tag25_09_",
			count: 35,
			bitwidth: 9
		},

		"tag36h11": {
			name: "36h11",
			tagPrefix: "tag36_11_",
			count: 587,
			bitwidth: 10
		},

		"tagCircle21h7": {
			name: "21h7",
			tagPrefix: "tag21_07_",
			count: 38,
			bitwidth: 9
		}, 

		"tagCircle49h12": {
			name: "49h12",
			tagPrefix: "tag49_12_",
			count: 65698,
			bitwidth: 11
		},

		"tagCustom48h12": {
			name: "48h12",
			tagPrefix: "tag48_12_",
			count: 42211,
			bitwidth: 10
		},

		"tagStandard41h12": {
			name: "41h12",
			tagPrefix: "tag41_12_",
			count: 2115,
			bitwidth: 9
		},

		"tagStandard52h13": {
			name: "52h13",
			tagPrefix: "tag52_13_",
			count: 48714,
			bitwidth: 10
		}
	};
</script>


<script>
	import {config} from '../stores.js';
	
	const imageRepo = "https://github.com/AprilRobotics/apriltag-imgs/blob/master/"; 

	export let index;

	$: fileName = tagData[$config.tagType].tagPrefix + String(index).padStart(5, "0") + ".png";
	$: source = `${imageRepo}${$config.tagType}/${fileName}?raw=true`;
</script>

<section class="tag-section">
	<img class="tag-img" src="{source}" alt="tag {index}">
	{#if $config.dataToggles.enabled}
		{#if $config.dataToggles.type}<p class="tag-info tag-type">{tagData[$config.tagType].name}</p>{/if}
		{#if $config.dataToggles.number}<p class="tag-info tag-index"> {index}</p>{/if}
		{#if $config.dataToggles.dimensions}<p class="tag-info tag-dimensions">{$config.tagDimensions}mm</p>{/if}
	{/if}
	
</section>

<style>
	.tag-section {
    	background-color: white;

    	/* Tag sections should have a dotted line around them to make it easier to cut them out */
    	border-color: gray;
    	border-style: dashed;
    	border-width: 1px;

		padding: var(--tag-padding-y) var(--tag-padding-x);
		width: var(--tag-size);
		height: var(--tag-size);
    	display: flex;
    	flex-direction: column;
    	justify-content: center;
    	align-items: center;
		
		position: relative;

    	flex-shrink: 0;
		overflow: hidden;
		
		aspect-ratio: 1;
	}

	.tag-img {
	    image-rendering: crisp-edges;
	    image-rendering: pixelated;

	    width: var(--tag-size-x);
	    height: var(--tag-size-y);

		/* Add a color behind the image to make sure that the image is the right size */
		background-color: red;
	}

	.tag-info {
	    margin: 0;
	    padding: 0;
	    font-size: calc(var(--tag-padding-y) / 2);
		height: var(--tag-padding-y);
		text-align: center;
		line-height: var(--tag-padding-y);
	}

	.tag-type {
		position: absolute;
		left: var(--tag-padding-x);
		bottom: 0;
		
	}

	.tag-index {
		position: absolute;
		left: 50%;
		bottom: 0;
	}

	.tag-dimensions {
		position: absolute;
		right: var(--tag-padding-x);
		bottom: 0;
	}

</style>