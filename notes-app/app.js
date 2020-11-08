const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes')

// Yargs builder property is an object and on that object we can define all of the options
// we want ...

// Create add command

yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Body title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        //console.log('Title:', argv.title)
        //console.log('Body:', argv.body)

        notes.addNote(argv.title, argv.body)
    }    
})

// Create remove command

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        notes.removeNote(argv.title)
        //console.log('Remove note with title:', argv.title)
    }
})

// Create list command

yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: () => {
        //console.log('Listing out all notes!')
        notes.listNotes()
    }
})

// Create read command

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        //console.log('Reading a note!')
        notes.readNote(argv.title)
    }
})

// Parse the process. It's necessary ...

yargs.parse()
