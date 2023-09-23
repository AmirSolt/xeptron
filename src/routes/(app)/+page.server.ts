// import { fetchProfileData } from '$lib/funcs/server/database/index.js';
import { detectors } from '$lib/funcs/server/detectors/index.js';

export async function load() {
    
    return {
        detectors,
    }
}