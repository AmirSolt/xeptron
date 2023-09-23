<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	export let detector: Detector;
	export let text: string;

	let hasDetectorStarted:boolean=false;
    let hasDetectorFinished:boolean=false;
	let isDetectorResponseValid:boolean=true;
	let detectorResult:number;

	async function detectText(detector: Detector, text:string) {
		const response = await fetch("/api/detectText", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
                detector,
                text
            })
		});
        const detectorResponse:DetectorResponse = await response.json();
        if(detectorResponse.errorMessage!=null
            && detectorResponse.errorMessage.length > 0){
				isDetectorResponseValid=false
        }else{
			isDetectorResponseValid=true
		}
        return detectorResponse.humanPerc
	}
    async function updateState(detector: Detector, text:string){
		hasDetectorFinished = false
		hasDetectorStarted = true
        detectorResult = await detectText(detector, text)
		hasDetectorFinished = true
    }

	export async function startDetection(){
		await updateState(detector, text)
	}
	export async function resetDetection(){
		hasDetectorFinished = false
		hasDetectorStarted = true
	}

 
</script>

<div class="flex flex-col justify-center items-center">
	<Avatar src={detector.pfpSrc} width="w-20 md:w-24" rounded="rounded-full" />

	<div class="text-center">
		<h3>{detector.name}</h3>

		{#if !hasDetectorStarted && !hasDetectorFinished}
			<p>Waiting to Start</p>
		{:else if hasDetectorStarted && !hasDetectorFinished}
			<div class="flex justify-center items-center">

				<ProgressRadial width="w-6" stroke={100} />
			</div>
		{:else if hasDetectorFinished && !isDetectorResponseValid}
			<span class="text-yellow-400">Error, try again.</span>
		{:else if hasDetectorFinished && isDetectorResponseValid && detectorResult!=null}
			{#if detectorResult>50}
				<p class="text-green-500">%{detectorResult.toFixed(1)} Human</p>
			{:else}
				<p class="text-red-500">%{detectorResult.toFixed(1)} Human</p>
			{/if}
		{:else}
			<span class="text-yellow-400">Error</span>
		{/if}
	</div>
</div>
