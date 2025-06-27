import React, { useRef, useEffect, useState } from 'react';

const Navbar = ({
  openModal,
  toggleSidebar,
  toggleMobileMenu,
  mobileMenuVisible,
  setType,
  activeType,
  inGroupView,
  selectionMode,
  onCancelSelection,
  onSaveSelection,
  setMobileMenuVisible 
}) => {
  const mobileMenuRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuVisible) return;
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuVisible, setMobileMenuVisible]);

  const handleFilter = (type) => {
    setType(type);
  };

  const baseButton = "rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-2 transition";
  const activeClass = "bg-blue-600 text-white shadow";
  const inactiveClass = "text-gray-700 hover:bg-blue-100";

  if (selectionMode) {
    return (
      <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex justify-end p-2 shadow z-40">
        <button onClick={onCancelSelection} className="flex items-center gap-1 px-4 py-2 bg-gray-500 hover:bg-gray-600 mr-2 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
          Cancel
        </button>
        <button onClick={onSaveSelection} className="flex items-center gap-1 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
          Save
        </button>
      </div>
    );
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300
          ${scrolled
            ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-gray-200'
            : 'bg-white/60 backdrop-blur-md shadow-none border-b border-gray-100'
          }`}
        id="navbar"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200 transition"
                onClick={toggleMobileMenu}
                aria-label="Open menu"
              >
                <span className="text-lg font-bold">Menu</span>
              </button>
            </div>
            <div className="hidden sm:flex flex-1 items-center justify-between">
              <div className="flex items-center space-x-2">
                <button onClick={() => handleFilter('all')} className={`${baseButton} ${activeType === 'all' ? activeClass : inactiveClass}`}>
                  All
                </button>
                <button onClick={() => handleFilter('image')} className={`${baseButton} ${activeType === 'image' ? activeClass : inactiveClass}`}>
                  Images
                </button>
                <button onClick={() => handleFilter('video')} className={`${baseButton} ${activeType === 'video' ? activeClass : inactiveClass}`}>
                  Videos
                </button>
              </div>
              <div className="ml-auto flex space-x-2">
                {!inGroupView && (
                  <button onClick={openModal} className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-500 flex items-center gap-1 transition">
                    Add
                  </button>
                )}
                <button onClick={toggleSidebar} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 flex items-center gap-1 transition">
                  View Group
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {mobileMenuVisible && (
        <div
          ref={mobileMenuRef}
          className="fixed top-16 left-0 w-full sm:hidden z-30 bg-white/90 border-b border-gray-100 shadow-md px-4 py-4 space-y-3 transition"
        >
          <div className="flex flex-wrap gap-2">
            <button onClick={() => handleFilter('all')} className={`${baseButton} ${activeType === 'all' ? activeClass : inactiveClass}`}>All</button>
            <button onClick={() => handleFilter('image')} className={`${baseButton} ${activeType === 'image' ? activeClass : inactiveClass}`}>Images</button>
            <button onClick={() => handleFilter('video')} className={`${baseButton} ${activeType === 'video' ? activeClass : inactiveClass}`}>Videos</button>
          </div>
          <div className="flex flex-col gap-2">
            {!inGroupView && (
              <button
                onClick={() => {
                  openModal();
                  setMobileMenuVisible(false);
                }}
                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-500 flex items-center gap-1 transition"
              >
                Add
              </button>
            )}
            <button
              onClick={() => {
                toggleSidebar();
                setMobileMenuVisible(false);
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500 flex items-center gap-1 transition"
            >
              View Group
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
