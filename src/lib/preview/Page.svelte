<script>
	import Tag from './Tag.svelte';

	export let tags; // An array of the indexes of tags to be drawn on this page
</script>


<article class="page">
	{#each tags as tag}
		<Tag index={tag}/>
	{/each}
</article>

<style>
	.page {
	    display: flex;
	    flex-direction: row;
	    flex-wrap: wrap;

	    justify-content: center;
	    align-content: center;

	    box-sizing: border-box;

	    overflow: hidden;

	    width: 100%;
	    aspect-ratio: var(--page-aspect-ratio);

	    padding: var(--tag-margin);
	}
</style>