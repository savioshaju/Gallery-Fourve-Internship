import React, { useEffect, useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import MediaModal from '../components/MediaModal';
import MediaViewer from '../components/MediaViewer';
import MediaGrid from '../components/MediaGrid';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mediaViewerVisible, setMediaViewerVisible] = useState(false);
  const [previewContent, setPreviewContent] = useState(null);
  const [mediaData, setMediaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [inGroupView, setInGroupView] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedMediaIds, setSelectedMediaIds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentMedia, setCurrentMedia] = useState(null);
  const [type, setType] = useState('all');
  const [groupLoading, setGroupLoading] = useState(false);
  const [grpName, setGrpName] = useState('');
  const sidebarRef = useRef(null);

  //Fetch media

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3000/media?type=${type}`);
      const data = await res.json();
      setMediaData(
        data.files.map(file => ({
          id: file._id,
          type: file.mimetype,
          filename: file.filename,
          uploadedAt: file.uploadedAt
        }))
      );
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  //Fetch groups

  const fetchGroups = async () => {
    try {
      setGroupLoading(true);
      const res = await fetch('http://localhost:3000/group/all');
      const groups = await res.json();
      setGroupList(groups.map(g => ({
        id: g._id,
        groupName: g.groupName,
        onClick: handleGroupClick
      })));
    } catch (err) {
      console.error('Group fetch error:', err);
    } finally {
      setGroupLoading(false);
    }
  };
  
useEffect(() => {
  if (!inGroupView) fetchMedia();
  setMobileMenuVisible(false); 
  setSidebarVisible(false);   
}, [type, inGroupView]);

  // Fetch media IDs from a selected group and load their full details

  const handleGroupClick = async (groupName) => {
    setGrpName(groupName);
    setMobileMenuVisible(false);
    try {
      const res = await fetch(`http://localhost:3000/group/getMediaIds?groupName=${encodeURIComponent(groupName)}`);
      const { mediaIds } = await res.json();
      const detailRes = await fetch('http://localhost:3000/media/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaIds })
      });
      const detailData = await detailRes.json();
      setMediaData(detailData.files.map(file => ({
        id: file._id,
        type: file.mimetype,
        filename: file.filename,
        uploadedAt: file.uploadedAt
      })));
      setInGroupView(true);
      setSidebarVisible(false);
    } catch (err) {
      console.error('Group view error:', err);
    }
  };

  const handleResetToAll = () => {
    setInGroupView(false);
    setSelectionMode(false);
    setSelectedMediaIds([]);
    setMobileMenuVisible(false);
    fetchMedia();
  };

  //Create Group

  const handleCreateGroup = async (groupName) => {
    if (!groupName.trim()) {
      alert('Group name cannot be empty.');
      return;
    }
    setGrpName(groupName);
    setSelectionMode(true);
    setInGroupView(false);
    setSelectedMediaIds([]);
    fetchMedia();
    setSidebarVisible(false);
  };

  // group creation calcelled

  const handleCancelSelection = () => {
    setSelectionMode(false);
    setSelectedMediaIds([]);
    setGrpName('');
    fetchMedia();
  };

  // save group

  const handleSaveSelection = async () => {
    if (!grpName.trim() || selectedMediaIds.length === 0) {
      alert('Please enter a valid group name and select media.');
      return;
    }
    try {
      const res = await fetch('http://localhost:3000/group/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName: grpName, mediaIds: selectedMediaIds })
      });
      if (!res.ok) throw new Error('Group save failed');
      alert('Group saved successfully!');
      setSelectionMode(false);
      setSelectedMediaIds([]);
      setGrpName('');
      fetchMedia();
    } catch (err) {
      console.error('Save error:', err);
      alert('Error saving group.');
    }
  };

  // open / close slidebar for group

  const handleToggleSidebar = async () => {
    setSidebarVisible(false); 
    setGroupLoading(true);    
    await fetchGroups();     
    setSidebarVisible(true);  
    setGroupLoading(false);   
  };

  const toggleSelect = (id) => {
    setSelectedMediaIds(prev =>
      prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
    );
  };

  // file upload preview 

  const fileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return setPreviewContent(null);
    const fileURL = URL.createObjectURL(file);
    const type = file.type;
    if (type.startsWith('image/')) {
      setPreviewContent(<img src={fileURL} alt="Preview" className="mx-auto max-h-40 rounded" />);
    } else if (type.startsWith('video/')) {
      setPreviewContent(<video controls className="mx-auto max-h-40 rounded"><source src={fileURL} type={type} /></video>);
    } else {
      setPreviewContent(<p className="text-red-500">Unsupported file type selected.</p>);
    }
  };

  const upload = async () => {
    const input = document.getElementById('fileUpload');
    const file = input.files[0];
    if (!file) return alert('Select a file first!');
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://localhost:3000/media/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      alert('File uploaded successfully');
      setModalVisible(false);
      setPreviewContent(null);
      input.value = '';
      fetchMedia();
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }
  };

  const handleView = (index) => {
    setCurrentIndex(index);
    setCurrentMedia(mediaData[index]);
    setMediaViewerVisible(true);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setCurrentMedia(mediaData[newIndex]);
    }
  };

  const handleNext = () => {
    if (currentIndex < mediaData.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setCurrentMedia(mediaData[newIndex]);
    }
  };

  // Delete media

  const handleDeleteMedia = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;

    try {
      const res = await fetch(`http://localhost:3000/media/delete/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      setMediaData(prev => prev.filter(item => item.id !== id));
      setMediaViewerVisible(false);
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete media.');
    }
  };

  //delete group

  const handleDeleteGroup = async (groupId, groupName) => {
    if (!window.confirm(`Delete this group?`)) return;

    try {
      const res = await fetch(`http://localhost:3000/group/delete/${groupId}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete group');

      setGroupList(prev => prev.filter(g => g.id !== groupId));

      if (inGroupView && groupName === grpName) {
        handleResetToAll();
      }
    } catch (err) {
      console.error('Delete group error:', err);
      alert('Failed to delete group');
    }
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!sidebarVisible) return;
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [sidebarVisible]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-sky-100 via-60% to-pink-100 px-2 sm:px-6 pt-20">
      <Navbar
        openModal={() => setModalVisible(true)}
        toggleSidebar={handleToggleSidebar}
        toggleMobileMenu={() => setMobileMenuVisible(prev => !prev)}
        mobileMenuVisible={mobileMenuVisible}
        setType={setType}
        activeType={type}
        inGroupView={inGroupView}
        selectionMode={selectionMode}
        onCancelSelection={handleCancelSelection}
        onSaveSelection={handleSaveSelection}
        setMobileMenuVisible={setMobileMenuVisible}
      />

      {groupLoading && (
        <div className="fixed top-0 left-0 z-50 w-64 h-full flex items-center justify-center bg-white/80">
          <Spinner />
        </div>
      )}
      {sidebarVisible && !groupLoading && (
        <div
          className="fixed top-0 left-0 z-50 w-64 h-full transition-transform duration-300"
          ref={sidebarRef}
        >
          <Sidebar
            onCreateGroup={handleCreateGroup}
            groupList={groupList}
            loading={groupLoading}
            inGroupView={inGroupView}
            onReset={handleResetToAll}
            selectionMode={selectionMode}
            onDeleteGroup={handleDeleteGroup}
            activeGroupName={grpName}
          />
        </div>
      )}

      <MediaModal
        isVisible={modalVisible}
        fileChange={fileChange}
        upload={upload}
        closeModal={() => setModalVisible(false)}
        previewContent={previewContent}
      />

      {mediaViewerVisible && (
        <MediaViewer
          isVisible={mediaViewerVisible}
          media={currentMedia}
          onClose={() => setMediaViewerVisible(false)}
          onPrev={handlePrev}
          onNext={handleNext}
          onDelete={handleDeleteMedia}
          currentIndex={currentIndex}
          total={mediaData.length}
        />
      )}

      {loading ? (
        <Spinner />
      ) : (
        <MediaGrid
          mediaData={mediaData}
          selectionMode={selectionMode}
          selectedMediaIds={selectedMediaIds}
          toggleSelect={toggleSelect}
          onView={handleView}
        />
      )}
    </div>
  );
};

export default HomePage;