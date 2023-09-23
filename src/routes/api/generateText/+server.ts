export const config = {
    runtime: 'edge'
};

// import * as AI from '$lib/funcs/server/AI/index'
import {getSystemPromptGenerator} from '$lib/funcs/server/openai/systemPrompt.js'
import {getChatStream} from '$lib/funcs/server/openai/index.js'
import { json, error } from '@sveltejs/kit';
import { StreamingTextResponse } from 'ai';
import  {generateSchema , type GenerateSchemaType } from '$lib/utils/schema';

export const POST = async ({request}) => {

    const req = await request.json();
    const userPrompt:string = req.prompt
    const generateInput = {
        userPrompt,
    } as GenerateSchemaType
    const zodParse = generateSchema.safeParse(generateInput)
    if(!zodParse.success){
        throw error(400, {
            message: `Schema: ${zodParse.error.issues[0].message}`,
        })
    }

    const systemPrompt = await getSystemPromptGenerator()
    let stream = await getChatStream(systemPrompt, userPrompt)
    if(stream == null){
        return json({success:false, errorMessage:"Stream creation has failed. Generation."})
    }
    return new StreamingTextResponse(stream);
}




