// src/NoteApp.js
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import marked from 'marked';
import './NoteApp.css';
const NoteApp = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [folders, setFolders] = useState(() => {
    const storedFolders = localStorage.getItem('folders');
    return storedFolders ? JSON.parse(storedFolders) : [{ name: 'Default', notes: [] }];
  });
  const [activeFolder, setActiveFolder] = useState(0);
  const [activeNote, setActiveNote] = useState(null);
  const [noteContent, setNoteContent] = useState('');
  const [renamingFolder, setRenamingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [shareableLink, setShareableLink] = useState('');
  const [markdownPreview, setMarkdownPreview] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    const autosave = setInterval(() => {
      localStorage.setItem('autosave', JSON.stringify(folders));
    }, 5000);

    return () => clearInterval(autosave);
  }, [folders]);

  const handleNoteClick = (note, index) => {
    setActiveNote(index);
    setNoteContent(note.content);
  };

  const handleNoteChange = (content) => {
    setNoteContent(content);
    updateNoteContent(content);
  };

  const handleAddNote = () => {
    const newNote = {
      content: '',
    };
    const updatedFolders = [...folders];
    updatedFolders[activeFolder].notes.push(newNote);
    setFolders(updatedFolders);
    setActiveNote(updatedFolders[activeFolder].notes.length - 1);
    setNoteContent('');
    clearRedoStack(); // Clear redo stack on new action
  };

  const handleDeleteNote = () => {
    if (activeNote !== null) {
      const updatedFolders = [...folders];
      const deletedNote = updatedFolders[activeFolder].notes.splice(activeNote, 1)[0];
      setFolders(updatedFolders);
      setActiveNote(null);
      setNoteContent('');
      addToUndoStack({ action: 'delete', note: deletedNote, index: activeNote });
      clearRedoStack(); // Clear redo stack on new action
    }
  };

  const updateNoteContent = (content) => {
    if (activeNote !== null) {
      const updatedFolders = [...folders];
      const previousContent = updatedFolders[activeFolder].notes[activeNote].content;
      updatedFolders[activeFolder].notes[activeNote].content = content;
      setFolders(updatedFolders);
      addToUndoStack({ action: 'edit', noteIndex: activeNote, previousContent });
      clearRedoStack(); // Clear redo stack on new action
    }
  };

  const handleFolderChange = (index) => {
    setActiveFolder(index);
    setActiveNote(null);
    setNoteContent('');
  };

  const handleRenameFolder = () => {
    if (newFolderName && renamingFolder) {
      const updatedFolders = [...folders];
      const previousName = updatedFolders[activeFolder].name;
      updatedFolders[activeFolder].name = newFolderName;
      setFolders(updatedFolders);
      setRenamingFolder(false);
      setNewFolderName('');
      addToUndoStack({ action: 'rename', folderIndex: activeFolder, previousName });
      clearRedoStack(); // Clear redo stack on new action
    } else {
      setRenamingFolder(true);
      setNewFolderName(folders[activeFolder].name);
    }
  };

  const addToUndoStack = (action) => {
    setUndoStack((prevStack) => [...prevStack, action]);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const lastAction = undoStack[undoStack.length - 1];
      const updatedFolders = [...folders];
      switch (lastAction.action) {
        case 'edit':
          updatedFolders[activeFolder].notes[lastAction.noteIndex].content =
            lastAction.previousContent;
          break;
        case 'delete':
          updatedFolders[activeFolder].notes.splice(lastAction.index, 0, lastAction.note);
          setActiveNote(lastAction.index);
          break;
        case 'add':
          updatedFolders[activeFolder].notes.pop();
          setActiveNote(null);
          break;
        case 'rename':
          updatedFolders[lastAction.folderIndex].name = lastAction.previousName;
          break;
        default:
          break;
      }
      setFolders(updatedFolders);
      setUndoStack((prevStack) => prevStack.slice(0, -1));
      setRedoStack((prevStack) => [...prevStack, lastAction]);
    }
  };

  const clearRedoStack = () => {
    setRedoStack([]);
  };

  const generateShareableLink = () => {
    const encodedFolders = encodeURIComponent(JSON.stringify(folders));
    setShareableLink(`${window.location.origin}/share/${encodedFolders}`);
  };

  const toggleMarkdownPreview = () => {
    setMarkdownPreview(!markdownPreview);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredNotes = folders[activeFolder].notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`note-app ${darkMode ? 'dark-mode' : ''}`}>
      {authenticated ? (
        <>
          <div className="note-list">
            <button onClick={handleAddNote}>Add Note</button>
            <button onClick={handleDeleteNote} disabled={activeNote === null}>
              Delete Note
            </button>
            <button onClick={handleRenameFolder}>
              {renamingFolder ? 'Save Folder Name' : 'Rename Folder'}
            </button>
            {renamingFolder && (
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
              />
            )}
            <button onClick={undo} disabled={undoStack.length === 0}>
              Undo
            </button>
            <button onClick={redo} disabled={redoStack.length === 0}>
              Redo
            </button>
            <button onClick={generateShareableLink}>Generate Shareable Link</button>
            <button onClick={toggleMarkdownPreview}>
              {markdownPreview ? 'Disable Markdown Preview' : 'Enable Markdown Preview'}
            </button>
            <button onClick={toggleDarkMode}>
              {darkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
            </button>
            <div>
              Shareable Link:{' '}
              {shareableLink ? (
                <a href={shareableLink} target="_blank" rel="noopener noreferrer">
                  {shareableLink}
                </a>
              ) : (
                'No link generated yet.'
              )}
            </div>
            <input
              type="text"
              placeholder="Search Notes"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select value={activeFolder} onChange={(e) => handleFolderChange(Number(e.target.value))}>
              {folders.map((folder, index) => (
                <option key={index} value={index}>
                  {folder.name}
                </option>
              ))}
            </select>
            <ul>
              {filteredNotes.map((note, index) => (
                <li
                  key={index}
                  onClick={() => handleNoteClick(note, index)}
                  className={activeNote === index ? 'active' : ''}
                >
                  Note {index + 1}
                </li>
              ))}
            </ul>
          </div>
          <div className="note-editor">
            {markdownPreview ? (
              <div dangerouslySetInnerHTML={{ __html: marked(noteContent) }} />
            ) : (
              <ReactQuill value={noteContent} onChange={handleNoteChange} />
            )}
          </div>
        </>
      ) : (
        <div className="login-container">
          <div className="login-box">
            <h2>Login</h2>
            <button onClick={() => setAuthenticated(true)}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteApp;
