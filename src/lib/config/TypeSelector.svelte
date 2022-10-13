<script>
    import {config} from '../stores.js';
	import {tagData} from "../preview/Tag.svelte";
</script>

<section>
    <!-- <label for="type-selector">Type</label> -->
	

    <details>
		<summary>
			<label for="type-selector">Type</label>
			<select name="type" id="type-selector" bind:value={$config.tagType}>
				<option value="tag16h5">tag16h5</option>
				<option value="tag25h9">tag25h9</option>
				<option value="tag36h11">tag36h11</option>
				<option value="tagCircle21h7">tagCircle21h7</option>
				<option value="tagCircle49h12">tagCircle49h12</option>
				<option value="tagCustom48h12">tagCustom48h12</option>
				<option value="tagStandard41h12" selected>tagStandard41h12</option>
				<option value="tagStandard52h13">tagStandard52h13</option>
			</select>
			<p>({tagData[$config.tagType].count} Tags)</p> 
		</summary>
		<div>
			<p>Max tags: {tagData[$config.tagType].count}</p>
			<p>Dimensions: {tagData[$config.tagType].bitwidth}px x {tagData[$config.tagType].bitwidth}px</p>
		</div>
	</details>	
</section>

<style>
	summary p {
		display: inline;
		white-space:nowrap
	}
</style>