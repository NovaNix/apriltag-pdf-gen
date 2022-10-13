<script>
	import ConfigPanel from "./config/ConfigPanel.svelte";
	import DistanceEstimationPanel from "./DistanceEstimationPanel.svelte";
    import PreviewInfo from "./preview/PreviewInfo.svelte";
    import PrintInfoPanel from "./PrintInfoPanel.svelte";
</script>

<aside id="side-panel">
	<h1>Apriltags PDF Generator</h1>
	<ConfigPanel/>
	<DistanceEstimationPanel/>
	<PrintInfoPanel/>
	<PreviewInfo/>
</aside>

<style>

	#side-panel {
		background-color: white;
	    border-color: gray;
	    border-style: solid;
	    border-width: 1px;

		flex-grow: 1;

	    width: 20%;
	    height: 100%;

		overflow-y: auto;
	}

	h1 {
		text-align: center;
	}
</style>