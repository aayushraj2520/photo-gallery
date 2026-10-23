export default function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col cursor-pointer border border-gray-100">

            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                <img
                    src={photo.download_url}
                    alt={`Captured by ${photo.author}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>

            {/* Card Footer */}
            <div className="p-4 flex justify-between items-center bg-white">
                <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Photographer</span>
                    <p className="font-bold text-gray-800 truncate pr-2 text-lg">
                        {photo.author}
                    </p>
                </div>

                <button
                    onClick={() => onToggleFavourite(photo)}
                    className="p-2 rounded-full hover:bg-gray-50 focus:outline-none transform active:scale-90 transition-all duration-200 z-10"
                    aria-label="Toggle Favourite"
                >
                    {isFavourite ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 drop-shadow-md" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-300 hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}