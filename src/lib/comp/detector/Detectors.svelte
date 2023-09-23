

<script lang="ts">
    import DetectionProfile from '$lib/comp/detector/DetectorProfile.svelte';

    export let detectors:Detector[];
    export let text:string;
    let detectorComps:any[] = []

    export async function callDetectors(){
        await Promise.allSettled(detectorComps.map(detectorComp=>detectorComp.startDetection()))
    }
    export async function resetDetectors(){
        await Promise.allSettled(detectorComps.map(detectorComp=>detectorComp.resetDetection()))
    }

</script>


<div class="card">
    <div class="flex flex-col justify-center items-start gap-4">

        <h1>Detectors</h1>

        <div class="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8">
            {#each detectors as detector, i}
                <DetectionProfile {detector} text={text} bind:this={detectorComps[i]} />
            {/each}
        </div>
    </div>
</div>
