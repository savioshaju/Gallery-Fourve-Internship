import React from 'react';

const MediaModal = ({ isVisible, fileChange, upload, closeModal, previewContent }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add image/video</h3>

        <div id="previewContainer" className={`mb-4 text-center ${!previewContent ? 'hidden' : ''}`}>
          {previewContent}
        </div>

        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            <label htmlFor="fileUpload" className="cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500">
              Upload a file
            </label>
            <input
              id="fileUpload"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={fileChange}
            />
            <p className="text-xs text-gray-600 mt-2">PNG, JPG, GIF, MP4, WEBM up to 10MB</p>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={upload}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-400"
          >
            Upload
          </button>
          <button
            onClick={closeModal}
            className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-800 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaModal;
