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
		flex-grow: 0;
		flex-shrink: 0;
	}

	#side-panel {
		background-color: white;
	    border-color: gray;
	    border-style: solid;
	    border-width: 1px;

		flex-grow: 1;

	    width: 20%;
	    height: 100%;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		
		position: relative;
		box-sizing: border-box;
	}

	#sidebar-content {
		overflow-y: auto;

		box-sizing: border-box;
		flex-grow: 1;
	}

	h1 {
		text-align: center;
	}
</style>