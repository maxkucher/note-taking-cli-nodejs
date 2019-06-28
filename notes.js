const fs = require('fs');
const chalk = require('chalk');


const getNotes =  () => 'get notes';


const addNote =  (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find( (note) => note.title === title);
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes);
        console.log(chalk.green('Note was added'));
    } else {
        console.log(chalk.red('Note title taken'));
    }

};

const openNote = (title) => {
  const note = loadNotes().find((note) => note.title === title);
  if (note) {
      console.log(chalk.green.bold(note.title));
      console.log(chalk.blue(note.body));
  } else {
      console.log(chalk.red(`No note found with title ${title}`));
  }
};

const removeNote =  (title) => {
    const notesList = loadNotes();
    const newNotesList = notesList.filter( (note) => note.title !== title);
    const notesRemoved = notesList.length - newNotesList.length;
    console.log(chalk.green(`${notesRemoved} note(s) were removed.`));
    saveNotes(newNotesList);

};

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }

};

const listNotes = () => {
    console.log(chalk.bgWhiteBright.black('Your notes:'));
  loadNotes().forEach((note) => {
      console.log(chalk.green(note.title));
  })
};

const saveNotes =  (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
};

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    openNote: openNote
};