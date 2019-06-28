const yargs = require('yargs');
const notesUtility = require('./notes');


// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note description',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtility.addNote(argv.title, argv.body);
    }
});

yargs.command({
    command: 'remove',
    describe: 'Removes new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtility.removeNote(argv.title);
    }
});

yargs.command({
    command: 'list',
    describe: 'Listing the notes',
    handler() {
        notesUtility.listNotes();
    }
});

yargs.command({
    command: 'open',
    describe: 'Reading the note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(args) {
        notesUtility.openNote(args.title);
    }
});

yargs.parse();

