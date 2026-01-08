interface Meme {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

interface MemeGridProps {
  memes: Meme[];
  loading: boolean;
  onSelectMeme: (meme: Meme) => void;
}

export default function MemeGrid({
  memes,
  loading,
  onSelectMeme,
}: MemeGridProps) {
  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mb-4"></div>
        <p className="text-xl font-semibold text-gray-600">Loading templates...</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-up">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Choose Your Meme Template
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {memes.map((meme, index) => (
          <div
            key={meme.id}
            onClick={() => onSelectMeme(meme)}
            className="group bg-linear-to-br from-white to-gray-50 border-2 border-gray-200 rounded-2xl p-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-purple-400 hover:-translate-y-1"
            style={{
              animationDelay: `${index * 30}ms`,
              animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards'
            }}
          >
            <div className="relative overflow-hidden rounded-xl mb-3 bg-gray-100">
              <img
                src={meme.url}
                alt={meme.name}
                className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <p className="text-center text-sm font-semibold text-gray-700 truncate group-hover:text-purple-600 transition-colors">
              {meme.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
