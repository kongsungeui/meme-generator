interface MemeResultProps {
  imageUrl: string
  onNewMeme: () => void
}

export default function MemeResult({ imageUrl, onNewMeme }: MemeResultProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = imageUrl
    link.download = 'meme.jpg'
    link.target = '_blank'
    link.click()
  }

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-linear-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-scale-in">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your Meme is Ready!
        </h2>
        <p className="text-gray-600">Share it with your friends or create another one</p>
      </div>

      <div className="text-center mb-10">
        <div className="inline-block relative group">
          <img
            src={imageUrl}
            alt="Generated Meme"
            className="max-w-2xl w-full mx-auto rounded-2xl shadow-2xl border-4 border-white transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-linear-to-r from-green-500 to-emerald-600 rounded-xl transition-all hover:scale-105 hover:shadow-xl group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
        <button
          onClick={onNewMeme}
          className="flex-1 flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-gray-700 bg-gray-200 rounded-xl transition-all hover:bg-gray-300 hover:scale-105 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Create New
        </button>
      </div>
    </div>
  )
}
