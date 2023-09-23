import {PRIVATE_STRIPE_KEY} from '$env/static/private';
import Stripe from 'stripe';



export const stripe = new Stripe(PRIVATE_STRIPE_KEY, {
    apiVersion: '2023-08-16',
});

