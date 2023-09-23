import { error, fail, redirect } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { stripe } from '$lib/utils/stripeHelper.server.js'
import { donationSchema } from '$lib/utils/schema'
import {PUBLIC_DOMAIN} from '$env/static/public';


export const load = async (event) => {
	const form = await superValidate(event, donationSchema)
	return { form }
}

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, donationSchema)
		
		if (!form.valid) {
			return fail(400, { form })
		}

        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
              {
                price_data:{
                    currency:"USD",
                    unit_amount:Math.round(form.data.amount*100),
                    product_data:{
                        name:`Donation $${Math.round(form.data.amount)}`,
                    },
                },
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${PUBLIC_DOMAIN}/donation/success`,
            cancel_url: `${PUBLIC_DOMAIN}/donation/payment`,
            customer_email:form.data.email,
        });

        

        if (checkoutSession.url==null) {
            throw error(400, {
                message: "Sorry there was an issue",
            })
        }
    
        throw redirect(303, checkoutSession.url);
	}
}