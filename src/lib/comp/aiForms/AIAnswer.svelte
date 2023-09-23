
<script lang="ts">
    import CopyClipboard from '$lib/comp/tools/CopyClipboard.svelte';

    export let input:string
    export let response:string
    export let isStreamingOver:boolean


</script>

    
<div class="card variant-ringed flex flex-col justify-center items-start" >

    <div class="flex flex-col justify-start items-start md:flex-row md:justify-between md:items-center gap-4 md:gap-0 w-full">
        <h1>
            Output
        </h1>
        

        <div class="flex justify-between md:justify-end items-center w-full gap-4">
            <CopyClipboard text={response} extraStyle={isStreamingOver? 'variant-filled-primary':'variant-ringed pointer-events-none opacity-50'} />
            
            <span class="text-xl badge p-3 variant-soft">
                {input.length+response.length}/10000 char
            </span>
        </div>
    
    </div>
    
    

    <div class="card h-96 w-full overflow-y-scroll">
        <p>
            {response}
        </p>
    </div>
</div>