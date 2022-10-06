import React, { memo, useRef } from 'react';

function StickyNote({
  stickyNote: { id, content, style },
  currentFocus,
  setCurrentFocus,
  setActiveNote,
}) {
  const stickyNoteRef = useRef(null);
  const editableNoteRef = useRef(null);

  const isResizing = useRef(false);
  const currentX = useRef(null);
  const currentY = useRef(null);

  const onStickyNoteMouseDown = (e) => {
    if (isResizing.current) return;
    currentX.current = e.clientX;
    currentY.current = e.clientY;

    const winMouseUp = () => {
      setNoteFocus();
      window.removeEventListener('mousemove', winMouseMove);
      window.removeEventListener('mouseup', winMouseUp);
    };

    const winMouseMove = (e) => {
      const newX = currentX.current - e.clientX;
      const newY = currentY.current - e.clientY;

      const { top, left } = stickyNoteRef.current.getBoundingClientRect();
      const newLeft = left - newX + 'px';
      const newTop = top - newY + 'px';

      stickyNoteRef.current.style.left = newLeft;
      stickyNoteRef.current.style.top = newTop;

      currentX.current = e.clientX;
      currentY.current = e.clientY;
    };

    window.addEventListener('mousemove', winMouseMove);
    window.addEventListener('mouseup', winMouseUp);
  };

  const resizerMouseDown = (e, resizer) => {
    isResizing.current = true;
    currentX.current = e.clientX;
    currentY.current = e.clientY;
    window.addEventListener('mousemove', winMouseMove);
    window.addEventListener('mouseup', winMouseUp);

    function winMouseMove(e) {
      if (
        parseInt(stickyNoteRef.current.style.width) < 50 ||
        parseInt(stickyNoteRef.current.style.height) < 50
      ) {
        stickyNoteRef.current.style.width = '160px';
        stickyNoteRef.current.style.height = '160px';
        editableNoteRef.current.style.width = stickyNoteRef.current.style.width;
        editableNoteRef.current.style.height =
          stickyNoteRef.current.style.height;
      }
      const { top, left, width, height } =
        stickyNoteRef.current.getBoundingClientRect();

      if (resizer === 'se') {
        stickyNoteRef.current.style.width = `${
          width - (currentX.current - e.clientX)
        }px`;
        stickyNoteRef.current.style.height = `${
          height - (currentY.current - e.clientY)
        }px`;
      } else if (resizer === 'sw') {
        stickyNoteRef.current.style.width = `${
          width + (currentX.current - e.clientX)
        }px`;
        stickyNoteRef.current.style.height = `${
          height - (currentY.current - e.clientY)
        }px`;
        stickyNoteRef.current.style.left = `${
          left - (currentX.current - e.clientX)
        }px`;
      } else if (resizer === 'ne') {
        stickyNoteRef.current.style.width = `${
          width - (currentX.current - e.clientX)
        }px`;
        stickyNoteRef.current.style.height = `${
          height + (currentY.current - e.clientY)
        }px`;
        stickyNoteRef.current.style.top = `${
          top - (currentY.current - e.clientY)
        }px`;
      } else {
        stickyNoteRef.current.style.width = `${
          width + (currentX.current - e.clientX)
        }px`;
        stickyNoteRef.current.style.height = `${
          height + (currentY.current - e.clientY)
        }px`;
        stickyNoteRef.current.style.top = `${
          top - (currentY.current - e.clientY)
        }px`;
        stickyNoteRef.current.style.left = `${
          left - (currentX.current - e.clientX)
        }px`;
      }

      editableNoteRef.current.style.width = stickyNoteRef.current.style.width;
      editableNoteRef.current.style.height = stickyNoteRef.current.style.height;

      currentX.current = e.clientX;
      currentY.current = e.clientY;
    }

    function winMouseUp() {
      setNoteFocus();
      window.removeEventListener('mousemove', winMouseMove);
      window.removeEventListener('mouseup', winMouseUp);
      isResizing.current = false;
    }
  };

  const setNoteFocus = () => {
    stickyNoteRef.current.style.zIndex = currentFocus + 1;
    setCurrentFocus(currentFocus + 1);
    setActiveNote(id);
  };

  return (
    <div
      ref={stickyNoteRef}
      className="sticky"
      style={style}
      onMouseDown={onStickyNoteMouseDown}
      onClick={setNoteFocus}
    >
      <div className="writable-container">
        <div
          className="editable-area"
          style={{ height: style.height, width: style.width }}
          contentEditable={'true'}
          ref={editableNoteRef}
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </div>
      <div
        className="resizer nw"
        onMouseDown={(e) => resizerMouseDown(e, 'nw')}
      ></div>
      <div
        className="resizer ne"
        onMouseDown={(e) => resizerMouseDown(e, 'ne')}
      ></div>
      <div
        className="resizer se"
        onMouseDown={(e) => resizerMouseDown(e, 'se')}
      ></div>
      <div
        className="resizer sw"
        onMouseDown={(e) => resizerMouseDown(e, 'sw')}
      ></div>
    </div>
  );
}

export default memo(StickyNote);
