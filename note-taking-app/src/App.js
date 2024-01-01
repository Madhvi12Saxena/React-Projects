// src/App.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './App.css';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [noteContent, setNoteContent] = useState('');

  const handleNoteClick = (note, index) => {
    setActiveNote(index);
    setNoteContent(note.content);
  };

  const handleNoteChange = (content) => {
    setNoteContent(content);
  };

  const handleAddNote = () => {
    const newNote = {
      content: '',
    };
    setNotes([...notes, newNote]);
    setActiveNote(notes.length);
    setNoteContent('');
  };

  const handleDeleteNote = () => {
    if (activeNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes.splice(activeNote, 1);
      setNotes(updatedNotes);
      setActiveNote(null);
      setNoteContent('');
    }
  };

  return (
    <div className="note-app">
      <div className="note-list">
        <button onClick={handleAddNote}>Add Note</button>
        <button onClick={handleDeleteNote} disabled={activeNote === null}>
          Delete Note
        </button>
        <ul>
          {notes.map((note, index) => (
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
        <ReactQuill value={noteContent} onChange={handleNoteChange} />
      </div>
    </div>
  );
};

export default NoteApp;
