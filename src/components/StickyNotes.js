import React, { memo } from 'react';
import StickyNote from './StickyNote';

const StickyNotes = ({
  stickyNotes,
  setCurrentFocus,
  focusValue,
  setActiveNote,
}) => {
  return (
    <React.Fragment>
      {stickyNotes.map((stickyNote) => (
        <StickyNote
          key={stickyNote.id}
          stickyNote={stickyNote}
          currentFocus={focusValue}
          setCurrentFocus={setCurrentFocus}
          setActiveNote={setActiveNote}
        />
      ))}
    </React.Fragment>
  );
};

export default memo(StickyNotes);
