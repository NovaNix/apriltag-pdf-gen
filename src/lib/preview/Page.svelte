<script>
	import Tag from './Tag.svelte';

	export let start; // The starting index of the tags on this page
	export let length; // The number of tags to have on this page

	$: tags = [...Array(length).keys()].map(i => i + start); // An array of the indexes of tags to be drawn on this page
</script>


<article class="page">
	
	<!-- Page content exists to keep the background of the page white while the border is colored in the preview -->
	<div class="page-content">
		{#each tags as tag}
			<Tag index={tag}/>
		{/each}
	</div>
	
	
</article>

<style>
	@media screen {
		.page {
			/* Apply a red stripe to the page background */
			background: repeating-linear-gradient(
  				45deg,
  				var(--padding-visual-red),
  				var(--padding-visual-red) 10px,
  				var(--padding-visual-light-red) 10px,
  				var(--padding-visual-light-red) 20px
			);

			
		}

		.page-content {

			box-shadow: 0 0 0 min(var(--padding-stripe-size), var(--page-margin)) var(--padding-visual-red);
			
		}
	}

	.page-content {
		background: white;
		display: flex;
	    flex-direction: row;
	    flex-wrap: wrap;

	    justify-content: center;
	    align-content: center;

	    overflow: hidden;

	    width: 100%;
		height: 100%;

		
	}

	.page {
	    
	    aspect-ratio: var(--page-aspect-ratio);

	    padding: var(--page-margin);
		box-sizing: border-box;
	}
</style>