<script>
	import Tag from './Tag.svelte';

	export let start; // The starting index of the tags on this page
	export let length; // The number of tags to have on this page

</script>


<article class="page" >
	
	<div class="printable-area">
		<div class="page-content">
			{#each Array(length) as _, i}
				<Tag index={i + start}/>
			{/each}
		</div>
	</div>
	
</article>

<style>
	@media screen {
		.page {
			background-color: var(--padding-visual-red);
			margin: 0;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 1em;
			max-width: 8.5in;
			/* Add a shadow to make it stand out a little */
			box-shadow: 0 0 0.5em 0.5em gray;
			
			

			/* Add an internal border to show the printer margin (TODO: CHANGE COLOR)*/
			/*box-shadow: 0 0 0 var(--printer-margin) blue;*/
			
			padding: var(--printer-margin);

		}

		.printable-area {
			/* Apply a red stripe to the page background */
			background: repeating-linear-gradient(
  				45deg,
  				var(--padding-visual-red),
  				var(--padding-visual-red) var(--padding-stripe-size),
  				var(--padding-visual-light-red) var(--padding-stripe-size),
  				var(--padding-visual-light-red) calc(var(--padding-stripe-size) * 2)
			);

			padding: var(--page-margin);
		}

		.page-content {
			box-sizing: border-box;
			
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

	.printable-area {
		/* border-color: black;
		border-width: calc(1mm * var(--sim-scale));
		border-style: solid; */

		box-shadow: inset 0 0 0 calc(1mm * var(--sim-scale)) black;

		width: 100%;
		height: 100%;

		box-sizing: border-box;
	}

	.page {
	    
	    aspect-ratio: var(--page-aspect-ratio);

		
	    
		box-sizing: border-box;
	}
</style>