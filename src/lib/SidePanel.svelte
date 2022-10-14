<script>
	import ConfigPanel from "./config/ConfigPanel.svelte";
	import DistanceEstimationPanel from "./DistanceEstimationPanel.svelte";
    import PreviewInfo from "./preview/PreviewInfo.svelte";
    import PrintInfoPanel from "./PrintInfoPanel.svelte";
</script>

<aside id="side-panel">
	<h1>Apriltags PDF Generator</h1>
	<div id="sidebar-content">
		<ConfigPanel/>
		<DistanceEstimationPanel/>
		<PrintInfoPanel/>
	</div>
	<PreviewInfo/>
</aside>

<style>

	h1 {
		margin: 0.5em;
	}

	#side-panel {
		background-color: white;
	    border-color: gray;
	    border-style: solid;
	    border-width: 1px;

		flex-grow: 1;

	    width: 20%;
	    height: 100%;

		
		position: relative;
		box-sizing: border-box;
	}

	#sidebar-content {
		overflow-y: auto;
		/* height: calc(100% - 2em); */
		max-height: 100%;
		
		box-sizing: border-box;
	}

	h1 {
		text-align: center;
	}
</style>