<script>
	import ConfigPanel from "./config/ConfigPanel.svelte";
    import PrintInfoPanel from "./PrintInfoPanel.svelte";
</script>

<aside id="side-panel">
	<ConfigPanel/>
	<PrintInfoPanel/>
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
</style>