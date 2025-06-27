import React, { useState } from 'react';
import Spinner from './Spinner';

const Sidebar = ({ onCreateGroup, groupList = [], loading, onReset, inGroupView, selectionMode, onDeleteGroup, activeGroupName }) => {
  const [creating, setCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [error, setError] = useState('');

  const handleCreateClick = () => {
    setCreating(true);
    setNewGroupName('');
    setError('');
  };

  const handleCancel = () => {
    setCreating(false);
    setNewGroupName('');
    setError('');
  };

  const handleConfirm = () => {
    if (!newGroupName.trim()) {
      setError('Group name cannot be empty.');
      return;
    }
    onCreateGroup(newGroupName.trim());
    setCreating(false);
  };

  return (
    <div id="sidebar" className="h-full w-64 bg-white/80 backdrop-blur-md border-r border-gray-100 shadow-md p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Groups</h2>

      {!creating && !selectionMode ? (
        <button
          id="crtGroup"
          onClick={handleCreateClick}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 w-full mb-4 flex items-center gap-2 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
          </svg>
          New Group
        </button>
      ) : (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter group name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
          <div className="flex justify-end space-x-2">
            <button onClick={handleCancel} className="px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
            <button onClick={handleConfirm} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Create</button>
          </div>
        </div>
      )}

      {inGroupView && (
        <button
          onClick={onReset}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-black hover:bg-gray-300 w-full mb-4 flex items-center gap-2 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to All Media
        </button>
      )}

      {loading ? (
        <div className="text-center py-4">
          <Spinner />
        </div>
      ) : (
        <div id="groupList" className="flex flex-col">
          {groupList.length === 0 && <p className="text-sm text-gray-500">No groups available.</p>}
          {groupList.map((group) => (
            <div
              key={group.groupName}
              className={`flex justify-between items-center border-2 rounded-lg shadow border-blue-700 px-2 py-2 mb-2 w-full
                ${selectionMode ? '' : 'cursor-pointer hover:bg-blue-800 hover:text-white transition-transform duration-300 hover:scale-105'}
                ${activeGroupName === group.groupName ? 'bg-blue-200 text-blue-900 font-bold' : ''}
              `}
            >
              <span onClick={() => group.onClick(group.groupName)} className="flex-grow">
                {group.groupName}
              </span>
              <button
                onClick={() => onDeleteGroup(group.id)}
                className="ml-2 px-2 py-1 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white transition-colors duration-200 flex items-center"
                title="Delete group"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
