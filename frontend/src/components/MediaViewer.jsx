import React from 'react';

const MediaViewer = ({ isVisible, media, onPrev, onNext, onClose, onDelete, currentIndex, total }) => {
  if (!isVisible || !media) return null;

  const mediaUrl = `http://localhost:3000/media/${media.id}`;
  const isImage = media.type.startsWith('image/');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-full max-w-5xl h-[90vh] bg-black flex flex-col">
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <a
            href={mediaUrl}
            download={media.filename}
            className="p-2 rounded-full bg-white/20 hover:bg-blue-600 text-white transition flex items-center justify-center"
            title="Download"
          >
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v12" />
            </svg>
          </a>
          <button
            onClick={() => onDelete(media.id)}
            className="p-2 rounded-full bg-white/20 hover:bg-red-600 text-white transition flex items-center justify-center"
            title="Delete"
          >
            
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h2a2 2 0 012 2v2" />
            </svg>
          </button>
          <button onClick={onClose} className="p-2 rounded-full bg-white/20 hover:bg-gray-700 text-white transition flex items-center justify-center" title="Close">
          
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        
        <button
          onClick={onPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-4"
          title="Previous"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M20 8L12 16L20 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-4"
          title="Next"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M12 8L20 16L12 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="flex-grow flex justify-center items-center">
          {isImage ? (
            <img src={mediaUrl} alt={media.filename} className="max-h-full max-w-full object-contain" />
          ) : (
            <video src={mediaUrl} controls className="max-h-full max-w-full object-contain" />
          )}
        </div>
        {typeof currentIndex === 'number' && typeof total === 'number' && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
            <span className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
              {currentIndex + 1} / {total}
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 text-sm sm:text-base">
          <p className="font-semibold">{media.filename}</p>
          <p>{new Date(media.uploadedAt).toLocaleString('en-IN')}</p>
        </div>
      </div>
    </div>
  );
};

export default MediaViewer;
