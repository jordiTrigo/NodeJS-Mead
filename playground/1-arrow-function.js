// First example. Són equivalents:

// Cas 1) 
// const square = function (x) {
//     return x * x
// }

// Cas 2)
// const square = (x) => {
//     return x * x
// }

// Cas 3)
//const square = (x) => x * x

// console.log(square(9))

// Second Example. Són equivalents:

// Cas 1) 
// const event = {
//     name: 'Birthday party',
//     printGuestList: function () {
//         console.log('Guest list for ' + this.name)
//     }   
// }

// event.printGuestList()

// Cas 2). In this case we get an undefined value for this.name.
// The arrow function is not able to find the name property. It
// is because arrow functions they don't bind their own THIS value,
// ie we don't have access to THIS as a reference to this object 
// because of the fact we are using an arrow function. Aquest cas
// NO FUNCIONA !!!!!

// const event = {
//     name: 'Birthday party',
//     printGuestList: () => {
//         console.log('Guest list for ' + this.name)
//     }   
// }

// event.printGuestList()

// Cas 3). Aquest cas també funciona. Compte amb que hem de definir
// la funció directament, sense arrow i sense un key: value ...

// const event = {
//     name: 'Birthday party',
//     printGuestList() {
//        console.log('Guest list for ' + this.name)
//    }   
// }

// event.printGuestList()

// Third Example.

// Cas 1) Això dona problemes de binding un altre cop degut al THIS que
// hi ha a console.log(guest + ' is attending ' + this.name), aquest 
// this.name retorna undefined ...

// const event = {
//     name: 'Birthday party',
//     guestList: ['Jordi', 'Ariadna', 'Mireia'],
//     printGuestList() {
//         console.log('Guest list for ' + this.name)

//         this.guestList.forEach(function (guest) {
//             console.log(guest + ' is attending ' + this.name)            
//         })
//    }   
// }

// event.printGuestList()

// Cas 2) Primera manera d'evitar el undefined. Definir una variable
// const that = this que conté una referència al THIS i utilitzar-la
// a dins del forEach. Ara ja funciona però és molt cutre.

// const event = {
//     name: 'Birthday party',
//     guestList: ['Jordi', 'Ariadna', 'Mireia'],
//     printGuestList() {
//         const that = this
        
//         console.log('Guest list for ' + this.name)

//         this.guestList.forEach(function (guest) {
//             console.log(guest + ' is attending ' + that.name)            
//         })
//    }   
// }

// event.printGuestList()

// Cas 3) Segona manera d'evitar el undefined. Definir una funció
// arrow en el forEach i màgicament tot funciona ...

const event = {
    name: 'Birthday party',
    guestList: ['Jordi', 'Ariadna', 'Mireia'],
    printGuestList() {        
        console.log('Guest list for ' + this.name)

        this.guestList.forEach((guest) => {
            console.log(guest + ' is attending ' + this.name)            
        })
   }   
}

event.printGuestList()