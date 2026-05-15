<script context="module">
	export let pageWidth = 215.9; // The width of a page in mm
	export let pageHeight = 279.4; // The height of a page in mm
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
            width: var(--page-width);
            height: var(--page-height);
            aspect-ratio: var(--page-aspect-ratio);
            box-sizing: border-box;
			background-color: var(--printer-margin-color);
			margin: 0;
			margin-left: auto;
			margin-right: auto;
			margin-bottom: 1em;
            display: block; /* Ensures auto-margins work on a block-level element */
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
			border: calc(var(--page-border) * var(--sim-scale)) solid black;
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
		width: 100%;
		height: 100%;
		
		box-sizing: border-box;
	}

	.page {
	    
	    aspect-ratio: var(--page-aspect-ratio);

		box-sizing: border-box;
	}

	@media print {
        @page {
            size: var(--page-height) var(--page-width);
        }

		.page {
			width: var(--page-width);
            height: var(--page-height);
			break-after: always;
			padding: var(--page-margin-y) var(--page-margin-x);
			box-sizing: border-box !important;
			border-top: calc(var(--page-border) * var(--y-scale)) solid black;
			border-bottom: calc(var(--page-border) * var(--y-scale)) solid black;
			border-left: calc(var(--page-border) * var(--x-scale)) solid black;
			border-right: calc(var(--page-border) * var(--x-scale)) solid black;
		}
	}
</style>