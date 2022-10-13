<script>
    export let name;
    export let checked;
</script>

<div>
    <input type="checkbox" id={name} name={name} bind:checked>
    <label for={name}><slot></slot></label>
</div>

<style>
    
</style>
