<script context="module">
	export const pageWidth = 215.9; // The width of a page in mm
	export const pageHeight = 279.4; // The height of a page in mm
</script>

<script>
	import Tag from './Tag.svelte';

	export let start; // The starting index of the tags on this page
	export let length; // The number of tags to have on this page

</script>


<article class="page">
	
	<div class="printable-area" >
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
			background-color: var(--printer-margin-color);
			margin: 0;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 1em;
			max-width: 8.5in;
			/* Add a shadow to make it stand out a little */
			box-shadow: 0 0 0.5em 0.5em gray;
			
			padding: var(--printer-margin-y) var(--printer-margin-x);

		}

		.printable-area {
			/* Apply a red stripe to the page background */
			background: repeating-linear-gradient(
  				45deg,
  				var(--padding-visual),
  				var(--padding-visual) var(--padding-stripe-size),
  				white var(--padding-stripe-size),
  				white calc(var(--padding-stripe-size) * 2)
			);

			padding: var(--page-margin-y) var(--page-margin-x);
		}

		.page-content {
			box-sizing: border-box;
			
			

			box-shadow: 0 0 0 min(var(--padding-stripe-size), var(--page-margin-x)) var(--padding-visual);
			
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

		/* box-shadow: inset 0 0 0 calc(1mm * var(--sim-scale)) black; */

		width: 100%;
		height: 100%;
		border: calc(var(--page-border) * var(--sim-scale)) solid black;
		

		box-sizing: border-box;
	}

	.page {
	    
	    aspect-ratio: var(--page-aspect-ratio);

		box-sizing: border-box;
	}

	@media print {
		.page {
			width: 8.5in;
			height: 11in;
			break-after: always;
			padding: var(--page-margin-y) var(--page-margin-x);
			
			border-top: calc(var(--page-border) * var(--y-scale)) solid black;
			border-bottom: calc(var(--page-border) * var(--y-scale)) solid black;
			border-left: calc(var(--page-border) * var(--x-scale)) solid black;
			border-right: calc(var(--page-border) * var(--x-scale)) solid black;
		}
	}
</style>