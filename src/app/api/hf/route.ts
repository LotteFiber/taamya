import { inference } from '@/utils/huggingface'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const url = new URL(req.url)
  const type = url.searchParams.get('type')

  const formData = await req.formData()

  try {
    if (type == 'comp') {
      const message = formData.get('message')
      const messageContent = typeof message === 'string' ? message : ''

      const out = await inference.chatCompletion({
        model: 'Intelligent-Internet/II-Medical-8B-1706',
        messages: [
          {
            role: 'user',
            content: messageContent
          }
        ],
        max_tokens: 2048
      })

      const rawContent = out.choices[0].message.content ?? ''
      console.log('RAW:', rawContent)

      const cleanedContent = rawContent.replace(/<think>[\s\S]*?<\/think>\s*/gi, '').trim()

      console.log('CLEANED:', cleanedContent)

      return NextResponse.json(
        {
          message: cleanedContent
        },
        { status: 200 }
      )
    }
  } catch (err) {
    console.error('Error querying Hugging Face:', err)
    return NextResponse.json({ error: 'Error querying Hugging Face API' }, { status: 500 })
  }
}
