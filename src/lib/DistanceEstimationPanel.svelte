<script>

	import {config} from './stores.js';
	import {tagData} from "./preview/Tag.svelte";
	import LengthInput from "./config/LengthInput.svelte"

	// All of this is pulled from https://optitag.io/blogs/news/designing-your-perfect-apriltag

	let hFOV = 90;
	let hResolution = 1920;
	let pixelsPerBitDetection = 5; // The number of pixels to detect a bit

	$: hFOVRadians = hFOV * (Math.PI / 180); // The horizontal field of view in radians

	$: maxDetectionDistance = ($config.tagDimensions / 1000) / (2 * Math.tan((tagData[$config.tagType].bitwidth * hFOVRadians * pixelsPerBitDetection) / (2 * hResolution)));

</script>

<details>
	<summary>Distance Estimation</summary>
	<div>
		<p>This section lets you estimate the maximum detection range of your tag based on its size and the specs of your camera.</p>
		
		<fieldset>
			<legend>Camera Specs</legend>
			<LengthInput name="hfov-input" step="0.5" max="180" unit="°" bind:value={hFOV}>Horizontal FOV: </LengthInput>
			<LengthInput name="hres-input" step="1" max="10000" unit="px" bind:value={hResolution}>Horizontal Resolution</LengthInput>
		</fieldset>
		
		<p>Maximum Detection Distance: <output>{Math.round((maxDetectionDistance + Number.EPSILON) * 100) / 100}m</output></p>
	</div>
</details>

<style>
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

	details div {
		padding: 0.5em;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		justify-content: flex-start;
		gap: 5px 0px;
	}

	p {
		margin: 0;

	}
</style>