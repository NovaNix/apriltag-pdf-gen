<script>
	import {config} from '../stores.js';
	import Page from './Page.svelte';

	$: range = [...Array($config.tagCount).keys()].map(i => i + $config.startingIndex);

</script>

<main id="pages">
	<Page tags={range}/>
</main>