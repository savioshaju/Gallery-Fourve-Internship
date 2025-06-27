import React from 'react';

const MediaGrid = ({ mediaData, selectionMode, selectedMediaIds, toggleSelect, onView }) => {
  if (!mediaData || mediaData.length === 0) {
    return (
      <div className="w-full text-center text-gray-500 py-10">
        <p>No media found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-24 px-4 md:px-8">
      {mediaData.map((media, index) => {
        const selected = selectedMediaIds.includes(media.id);
        const isImage = media.type.startsWith('image/');
        return (
          <div
            key={media.id}
            className={`
              group relative h-72 w-full contain overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center shadow-md
              border border-gray-200
              ${selected ? 'ring-4 ring-blue-500' : ''}
              ${!selectionMode ? 'hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer' : ''}
            `}
            onClick={() => selectionMode ? toggleSelect(media.id) : onView(index)}
          >

            {isImage ? (
              <img
                src={`http://localhost:3000/media/${media.id}`}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                alt={media.filename}
              />
            ) : (
              <>
                <video
                  className="h-full w-full object-cover pointer-events-none opacity-80"
                  muted
                  loop
                  playsInline
                  poster="/video-placeholder.png"
                >
                  <source src={`http://localhost:3000/media/${media.id}`} type={media.type} />
                </video>

                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-14 h-14 text-white opacity-80" fill="currentColor" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="22" fill="rgba(0,0,0,0.4)" />
                    <polygon points="20,16 34,24 20,32" fill="white" />
                  </svg>
                </div>
              </>
            )}

            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
              <div className="text-xs text-white truncate">{media.filename}</div>
              <div className="text-[10px] text-gray-200">{new Date(media.uploadedAt).toLocaleString()}</div>
            </div>


            {selected && (
              <div className="absolute top-2 right-2 bg-blue-600 rounded-full p-1 shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaGrid;
