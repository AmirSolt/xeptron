<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { donationSchema } from '$lib/utils/schema';
	import { toastError } from '$lib/utils/toastHelper.js';
	import { getToastStore } from '@skeletonlabs/skeleton';
    import {DollarSign} from 'lucide-svelte';
	import { onMount } from 'svelte';
	let toastStore = getToastStore();

	export let data;
	const { form, errors, enhance } = superForm(data.form, {
		validators: donationSchema,
		onError: (result) => {
			toastError(result.result.error.message, toastStore);
		},
		taintedMessage: null
	});

    onMount(()=>{
        $form.amount = 5
    })


</script>



<SuperDebug data={form}/>

<div class="card">


	<h1>Donation</h1>

	<form method="POST" class="flex flex-col justify-center items-start gap-8 w-full" use:enhance>

        <div class="flex flex-col justify-center items-start gap-2 w-full">
            <label class="label w-full" for="email">
                <h2>Email</h2>
                <input
                        class="input"
                        type="email"
                        name="email"
                        id="email"
                        class:input-error={$errors.email}
                        data-invalid={$errors.email}
                        bind:value={$form.email}
                        required
                    />
            </label>
    
            <label class="label w-full" for="amount">
                <h2>Amount</h2>
                <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                    <div class="input-group-shim"><DollarSign/></div>
                   
                    <input
                        type="text"
                        name="amount"
                        id="amount"
                        class:input-error={$errors.amount}
                        data-invalid={$errors.amount}
                        bind:value={$form.amount}
                        required
                    />
                </div>  
            </label>
        </div>


		<button class="btn variant-filled w-36" type="submit">Checkout</button>
	</form>

</div>

