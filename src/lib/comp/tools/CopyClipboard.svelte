<script lang="ts">

    export let text:string
    export let extraStyle:string

    function copy(){

        navigator.clipboard.writeText(text);
        alert("Copied to clipboard!");
    }

</script>


<button class="btn {extraStyle} text-xl" on:click={copy}>copy</button>
