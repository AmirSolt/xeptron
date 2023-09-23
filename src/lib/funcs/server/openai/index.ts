import OpenAI from 'openai';
import { PRIVATE_OPENAI_KEY } from '$env/static/private';
import { OpenAIStream } from 'ai';

const openai = new OpenAI({
  apiKey: PRIVATE_OPENAI_KEY,
});


const defaultModel = "gpt-4"
const defaultTemp = 1
const defaultFrequencyPenalty = 0.6
const defaultPresencePenalty = 0.6




export async function getChatStream(systemPrompt: string, userPrompt: string) {
  let response = await createChat(systemPrompt, userPrompt)
  if (response == null){
    console.log("Response is null")
    return null
  }
  return OpenAIStream(response)
}

export async function createChat(systemPrompt: string, userPrompt: string) {
  let messages: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[] = []
  messages.push({ role: "system", content: systemPrompt })
  messages.push({ role: "user", content: userPrompt })

  if (!await getOpenAIModeration(messages)) return null

  const completion = openai.chat.completions.create({
    messages: messages,
    model: defaultModel,
    temperature: defaultTemp,
    frequency_penalty:defaultFrequencyPenalty,
    presence_penalty:defaultPresencePenalty,
    stream: true,
  });
  return completion
}

async function getOpenAIModeration(messages: OpenAI.Chat.Completions.CreateChatCompletionRequestMessage[]): Promise<boolean> {
  // =================== OpenAI Moderation ===================

  const moderationRes = await fetch('https://api.openai.com/v1/moderations', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${PRIVATE_OPENAI_KEY}`
    },
    method: 'POST',
    body: JSON.stringify({
      input: JSON.stringify(messages)
    })
  })
  if (!moderationRes.ok) {
    const err = await moderationRes.json()
    
    return false
  }

  const moderationData = await moderationRes.json()
  const [results] = moderationData.results

  if (results.flagged) {
    
    return false
  }

  return true

}



