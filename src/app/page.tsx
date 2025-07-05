'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function MedicineChatPage() {
  const [input, setInput] = useState('')
  const [responseMessage, setResponseMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResponseMessage(null)

    try {
      const formData = new FormData()
      formData.append('message', input)

      const res = await fetch('/api/hf?type=comp', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        throw new Error('Failed to fetch')
      }

      const data = await res.json()
      setResponseMessage(data.message || 'No content')
    } catch (err) {
      console.error(err)
      setResponseMessage('Error communicating with API')
    } finally {
      setLoading(false)
    }
  }

  const handleClear = () => {
    setResponseMessage(null)
  }

  return (
    <div className='p-4 flex-1 flex flex-col h-screen justify-center items-center'>
      <div className='w-full max-w-[420px]'>
        <h1 className='text-xl font-bold mb-4'>Medicine Chat</h1>
        <form onSubmit={handleSubmit} className='space-y-2'>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            className='w-full border p-2 rounded'
            rows={4}
            placeholder='Type your medical question...'
          />
          <div className='flex space-x-2'>
            <Button type='submit' className='bg-green-500 text-white px-4 py-2 rounded' disabled={loading}>
              {loading ? 'Sending...' : 'Send'}
            </Button>
            <Button type='button' className='bg-gray-300 text-black px-4 py-2 rounded' onClick={handleClear}>
              Clear results
            </Button>
          </div>
        </form>

        {responseMessage && (
          <div className='mt-4 p-2 border rounded text-amber-50'>
            <strong>AI Response:</strong>
            <p>{responseMessage}</p>
          </div>
        )}
      </div>
    </div>
  )
}
