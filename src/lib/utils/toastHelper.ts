import type { ToastSettings } from '@skeletonlabs/skeleton';
import { error } from '@sveltejs/kit';


export function toastError(message:string="Something went wrong!", toastStore:any, isErr:boolean=false){

    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-error',

    };
    toastStore.trigger(t);
    if(isErr)
		throw error(400, message);
}


export function toastSuccess(message:string, toastStore:any){
    const t: ToastSettings = {
        message: message,
        background: 'variant-filled-success',
    };
    toastStore.trigger(t);
}