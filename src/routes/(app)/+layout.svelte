<script lang="ts">
	import '../../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
</script>

<svelte:head>
	<title>Xeptron</title>
	<link rel="icon" href="/logo.png" />
</svelte:head>
<!-- App Shell -->
<AppShell>
	<svelte:fragment  slot="header">
		<AppBar gap="gap-1" padding="p-3" slotTrail="space-x-2">
			<svelte:fragment slot="lead">
				<a href="/">
					<p class="text-3xl md:text-4xl font-bold"> Xeptron</p>
				</a>

			</svelte:fragment>
			
			<svelte:fragment  slot="trail" >
				<div class="flex-none flex items-center space-x-2">
					<a class="btn btn-sm md:btn-md variant-ringed" href="/donation/payment">
						Donation 
					</a>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		
		<div class="flex justify-end items-start p-2">
				<LightSwitch />
		</div>
	</svelte:fragment>

	<Toast position="t" />
	<div class="flex justify-center w-full p-4 pt-2">
		<div class="md:max-w-4xl w-full">
			<slot />
		</div>
	</div>


	<div class="px-4 md:px-24 pt-52 md:pt-96 pb-8">
		<hr>
	</div>

	<svelte:fragment slot="pageFooter">
		<div class="flex flex-wrap justify-start items-center px-4 md:px-24 py-8 gap-4">

			<div class="flex flex-col justify-center items-start">
				<img src="/logo.png" alt="Logo" width="80" height="80">
				<p class="text-xl font-bold"> Xeptron</p>
				<p>
					support@xeptron.com
				</p>
			</div>
			

		</div>
	</svelte:fragment>


</AppShell>
