'use client'

import { useState, useEffect } from 'react'
import MemeGrid from '@/components/MemeGrid'
import MemeEditor from '@/components/MemeEditor'
import MemeResult from '@/components/MemeResult'

const GET_MEMES_URL = 'https://api.imgflip.com/get_memes'

interface Meme {
  id: string
  name: string
  url: string
  width: number
  height: number
  box_count: number
}

export default function Home() {
  const [memes, setMemes] = useState<Meme[]>([])
  const [selectedMeme, setSelectedMeme] = useState<Meme | null>(null)
  const [generatedMemeUrl, setGeneratedMemeUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMemes()
  }, [])

  const fetchMemes = async () => {
    try {
      setLoading(true)
      const response = await fetch(GET_MEMES_URL)
      const data = await response.json()

      if (data.success) {
        setMemes(data.data.memes.slice(0, 20))
      } else {
        alert('밈 데이터를 가져오는데 실패했습니다.')
      }
    } catch (error) {
      console.error('Error fetching memes:', error)
      alert('네트워크 오류가 발생했습니다.')
    } finally {
      setLoading(false)
    }
  }

  const handleSelectMeme = (meme: Meme) => {
    setSelectedMeme(meme)
    setGeneratedMemeUrl(null)
  }

  const handleBackToList = () => {
    setSelectedMeme(null)
    setGeneratedMemeUrl(null)
  }

  const handleMemeGenerated = (url: string) => {
    setGeneratedMemeUrl(url)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20">
        <div className="mb-10 text-center animate-fade-in">
          <div className="inline-block mb-4">
            <div className="text-6xl mb-3 animate-scale-in">🎭</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-3">
            Meme Generator
          </h1>
          <p className="text-gray-600 text-lg">Create amazing memes in seconds</p>
        </div>

        {!selectedMeme && !generatedMemeUrl && (
          <MemeGrid
            memes={memes}
            loading={loading}
            onSelectMeme={handleSelectMeme}
          />
        )}

        {selectedMeme && !generatedMemeUrl && (
          <MemeEditor
            meme={selectedMeme}
            onBack={handleBackToList}
            onMemeGenerated={handleMemeGenerated}
          />
        )}

        {generatedMemeUrl && (
          <MemeResult
            imageUrl={generatedMemeUrl}
            onNewMeme={handleBackToList}
          />
        )}
      </div>
    </div>
  )
}
