<script>
	import Tag from './Tag.svelte';

	export let start; // The starting index of the tags on this page
	export let length; // The number of tags to have on this page

	let previewWidth;
	let previewHeight;

	$: tags = [...Array(length).keys()].map(i => i + start); // An array of the indexes of tags to be drawn on this page



</script>


<article class="page" >
	
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
			background-color: white;
			margin: 0;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 1em;
			max-width: 8.5in;
			/* Add a shadow to make it stand out a little */
			box-shadow: 0 0 0.5em 0.5em gray;
			
			/* Apply a red stripe to the page background */
			background: repeating-linear-gradient(
  				45deg,
  				var(--padding-visual-red),
  				var(--padding-visual-red) var(--padding-stripe-size),
  				var(--padding-visual-light-red) var(--padding-stripe-size),
  				var(--padding-visual-light-red) calc(var(--padding-stripe-size) * 2)
			);

			/* Add an internal border to show the printer margin (TODO: CHANGE COLOR)*/
			/*box-shadow: 0 0 0 var(--printer-margin) blue;*/
			padding: calc(var(--page-margin) + var(--printer-margin));
		}

		.page-content {

			box-shadow: 0 0 0 min(var(--padding-stripe-size), var(--page-margin)) var(--padding-visual-red);
			
		}
	}

	@media print {
		.page {
			width: 8.5in;
			height: 11in;
			background-color: white;
			break-after: always;
			padding: var(--page-margin);
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

	    
		box-sizing: border-box;
	}
</style>