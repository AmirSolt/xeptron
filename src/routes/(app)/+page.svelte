<script lang="ts">
	import Detectors from '$lib/comp/detector/Detectors.svelte';
	import AiForm from '$lib/comp/aiForms/AIForm.svelte';
	import AiAnswer from '$lib/comp/aiForms/AIAnswer.svelte';

	export let data;
	let { detectors } = data;
	let detectorsComponent: any;

	let aiTextForm: AITextForm = {
		url: '/api/generateText',
		title: 'Prompt',
		explanation: 'Prompt AI to generate content.',
		placeholder: 'e.g. Write an article about air polution...',
		isStreamingOver: false,
		input: '',
		response: '',
		formRows: 4
	};

	// =====================================
</script>

<div class="space-y-24">
	<div class="flex flex-col justify-center items-center text-center gap-2">
		<h1 class="text-6xl">
			Bypass
            All
			AI Detectors
            <br>
			<strong
				class="text-7xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-purple-500 via-30% to-pink-500 to-90%"
			>
				For Free
			</strong>
		</h1>
		<div>
			<p class="text-2xl">Generate Undetectable and High Quality Text</p>
		</div>
	</div>

    
	<div class="space-y-12">
		<AiForm bind:aiTextForm {detectorsComponent} >
			<div>
				<h1>
					{aiTextForm.title}
				</h1>
				<small>
					{aiTextForm.explanation}
				</small>
			</div>
		</AiForm>

		<Detectors {detectors} text={aiTextForm.response} bind:this={detectorsComponent} />

		<AiAnswer
			input={aiTextForm.input}
			response={aiTextForm.response}
			isStreamingOver={aiTextForm.isStreamingOver}
		/>
	</div>
</div>
