# Sticky Notes

## Architecture
- src
  - App.js - parent component
  - index.js - entry file
  - style.css - contains component style
  - package.json
  - components 
    - Layout - dumb container component that renders children component
    - NoteMenu - menu component that holds create button, color selector, and delete button
    - StickyNotes - dumb component that renders all sticky notes using StickyNote component
    - StickyNote - component handle most stick note functionality

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## How to use the App
### How to create a note
- Select note color from the select input (just three colors for now)
- Click on the Create Note button
- Click anywhere on the screen to create note at that spot
- Start writing

### How to delete a note
- Select a note to make it active
- Click on the Delete Active Note button to delete the note

### TODO
- Drag and Drop to delete feature (currently has a delete button for deleting active notes)
- Saving and retrieving notes
