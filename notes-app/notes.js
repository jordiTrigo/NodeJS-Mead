const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()

    // Now we have an array of javascript objects that 
    // represents notes. We have a new note so we need
    // to push this new note into our array of notes.
    // But before we need to check out if a note with
    // the same title exists, because in that case we
    // will not allow to save the new note in the list
    // in order to prevent duplicates. Array have the 
    // filter method. It will help us to search for 
    // an existing note in the array. Improvement: we
    // will use the method find() that returns the value
    // of the FIRST ELEMENT in the provided array that
    // SATISFIES the provided testing function ...
    
    // const duplicateNotes = notes.filter(currentNote => currentNote.title === title)

    // if (duplicateNotes.length === 0) {
    //     notes.push({
    //         title: title, 
    //         body: body
    //     })
    
    //     // We are going to save the new array of notes using
    //     // the saveNotes function ...
    
    //     saveNotes(notes)

    //     console.log('New note added!')
    // } else {
    //     console.log('Note title taken!')
    // }

    // debugger ens permet debugar el codi. Per això necessitem 
    // còrrer Node.js amb l'instrucció inspect, per exemple:
    // node inspect app.js add --title='Courses' --body='Node.js'
    // Si aquesta instrucció dona un error de l'estil: 
    // Timeout (2000) waiting for 127.0.0.1:9229 to be free
    // aleshores, utilitzarem la instrucció --inspect-brk, ie:
    // node --inspect-brk app.js add --title='Courses' --body='Node.js' 
    // Una vegada queda aturat el procés, hem d'anar al Google Chrome, 
    // tancar totes les pestanyes menys una de neta, i escriure
    // chrome://inspect/ 
    // a sota de Remot target, cliquem al link: inspect 
    // se'ns obre una finestra de Chrome amb els developers tools.
    // Els tabs important són Console i Sources. 
    // A sota de Filesystem podem clicar a l'icona + i escollir
    // el directori a on tenim el codi que estem debuggant. 
    // Fent Esc ens surt la finestra de Console.
    // Una vegada acabat de debugar si volem tornar a fer-ho
    // desde línia de comandes podem fer $ debug> restart.
    // Si volem sortir del debug hem d'anar a la línia de comandes
    // i fer ctrl+c dues vegades.

    debugger

    const duplicateNote = notes.find((currentNote) => currentNote.title === title)

    if (!duplicateNote) {
        notes.push({
        title: title, 
        body: body
        })
            
        // We are going to save the new array of notes using
        // the saveNotes function ...
            
        saveNotes(notes)
        
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }

    //console.log(notes)
}

const saveNotes = (notes) => {
    // We stringify the data and after that we save it to
    // the file system (fs) 

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    // We have a file named notes.json with all the notes.
    // We want to return a javascript array with every single
    // note converted into a javascript object. But if the
    // file notes.json does not exists we will get an error.
    // That's why we need to use try/catch block and if we 
    // get an error, we will return an empty array [] ...

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)    
    } catch (e) {
        // We return an empty array, because the file does not exists yet

        return []   
    }
}

const removeNote = (title) => {
    const notes = loadNotes()    

    // Hem de cercar dins l'array notes la/les notes amb title igual al que 
    // volem eliminar. El mètode filter retorna un array amb els que verifiquen
    // que la seva propietat title no és igual a la propietat title de passem 

    const notesToKeep = notes.filter((currentNote) => currentNote.title !== title)

    // Ara guardem si cal el nou array ...

    if (notes.length > notesToKeep.length) {
        saveNotes(notesToKeep)
        console.log(chalk.inverse.green(`Note with title \'${title}\' removed!`))
    } else {
        console.log(chalk.inverse.red(`Does not exists a note with the title \'${title}\'!`))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.green.inverse('Your notes:'))

    notes.forEach(note => {
        console.log(chalk.yellow.inverse(`Note title: ${note.title}`))        
    })
}

const readNote = (title) => {
    const notes = loadNotes()

    const noteToRead = notes.find((currentNote) => currentNote.title === title)

    if (noteToRead) {        
        console.log(chalk.inverse(`Title: ${noteToRead.title}`))
        console.log(`Body: ${noteToRead.body}`)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }    
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}