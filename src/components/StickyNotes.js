import React, { memo } from 'react';
import PropTypes from "prop-types";
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

StickyNotes.propTypes = {
  stickyNotes: PropTypes.array,
  setCurrentFocus: PropTypes.func,
  focusValue: PropTypes.number,
  setActiveNote: PropTypes.func,
};

export default memo(StickyNotes);
