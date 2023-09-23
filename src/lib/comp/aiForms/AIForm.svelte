<script lang="ts">
	import { useCompletion } from 'ai/svelte';
	import type { GenerateSchemaType } from '$lib/utils/schema';
	import { toastError } from '$lib/utils/toastHelper';
	import LoadingButton from '$lib/comp/tools/LoadingButton.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let aiTextForm: AITextForm;
	export let detectorsComponent: any;
	// =====================================
	async function onResponseCallback(res: Response) {
		if (!res.ok) {
			const data = await res.json();
			toastError(data.message, toastStore);
		} else {
			if (detectorsComponent != null) {
				detectorsComponent.resetDetectors();
			}
		}
	}
	function overCallback() {
		aiTextForm.isStreamingOver = true;
		if (detectorsComponent != null) {
			detectorsComponent.callDetectors().then(() => {
				fetch("/api/reportUsage",
				{
					headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					},
					method: "POST",
					body: JSON.stringify({
						usageReport:{
							input_len:$input.length,
							output_len:$completion.length,
						} as UsageReport
					})
				})
			});
		}
	}
	function errorCallback(error: Error) {
		toastError(error.message, toastStore);
	}
	const { input, handleSubmit, completion } = useCompletion({
		api: aiTextForm.url,
		onFinish: overCallback,
		onError: errorCallback,
		onResponse: onResponseCallback,
		// body: {
		// }
	});

	$: aiTextForm.input = $input;
	$: aiTextForm.response = $completion;
</script>

<form on:submit={handleSubmit} class="card variant-ringed space-y-8">
		<label class="w-full space-y-2">
			<div class="flex justify-between items-end w-full p-2">
				<h1>
					{aiTextForm.title}
				</h1>
			</div>

			<textarea
				class="textarea"
				rows={aiTextForm.formRows}
				placeholder={aiTextForm.placeholder}
				autocomplete="off"
				bind:value={$input}
				required
			/>
		</label>

	<LoadingButton color="variant-filled-primary" text="Submit" />
</form>
