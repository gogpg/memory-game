addEventListener('DOMContentLoaded', () => {       //turime parasyti si eevent listeneri, kad veiktu js tada kai uzsikrauna DOM contentas, nes script nuoroda idejau html virsuje.

// card options

const cards = [
    {
        name: 'fries',
        img: 'src/images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'src/images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'src/images/ice-cream.png',
    },
    {
        name: 'pizza',
        img: 'src/images/pizza.png',
    },
    {
        name: 'hotdog',
        img: 'src/images/hotdog.png',
    },
    {
        name: 'milkshake',
        img: 'src/milkshake.png',
    },
    {
        name: 'fries',
        img: 'src/images/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'src/images/cheeseburger.png'
    },
    {
        name: 'ice-cream',
        img: 'src/images/ice-cream.png',
    },
    {
        name: 'pizza',
        img: 'src/images/pizza.png',
    },
    {
        name: 'hotdog',
        img: 'src/images/hotdog.png',
    },
    {
        name: 'milkshake',
        img: 'src/images/milkshake(1).png',
    },
]

cards.sort(() => 0.5 - Math.random())  //masyvo elementu sumaisymo funkcija, kiekveina karta atnaujinus narsykle, korteles masyve susimaisys atsitiktine tvarka.
                                        //0.5 - Math.random() gives random numbers that are roughly 50% negative and 50% positive. This will ensure the array is sorted randomly on each try.
console.log(cards)                      //Math.random() returns a random decimal between 0 and 1 (but never equal to 1).
                                        //0.5 - Math.random() would return a decimal between -0.4999... and 0.5

const grid = document.querySelector('.grid')  //issitraukiu html elementa i kuri desiu korteles

function createBoard() {
    for (let i = 0; i < cards.length; i++) {
        const card = document.createElement('img')  // sukasi ciklas, susikuria korteles
        card.setAttribute('src', 'src/images/blank.png')  //kiekviena kortele gauna value, siuo atveju blank atvaizda, susikuria margos vienodos korteles su individualiais id
        card.setAttribute('data-id', i)  //besisukurdamos corteles cikle gaus kiekviena savo individualu id pradedant nuo 0, baigiant 11, nes is viso yra 12 korteliu.
        card.addEventListener('click', flipCard) //kiekvienai susikurusiais kortelei priskiriamas event listeneris, kad jei ant jos bus paspaust, aktyvuotusi funkcija.
        grid.appendChild(card) //kiekviena kortele idedame i grid elementa.
    }
}


let chosenCards = []; 
let chosenCardsId = [];

function flipCard() {
    let cardId = this.getAttribute('data-id')         //this reiskia bet kokia kortele su kuria bus dirbama, paspaudus kortele gausime jos id
    chosenCards.push(cards[cardId].name)              //i viena nauja masyva renkasi vardai is cards masyvo pagal cardId
    chosenCardsId.push(cardId)                        // i kita id
    this.setAttribute('src', cards[cardId].img)       //paspaudus ant korteles pasirodo jos vaizdas is cards masyvo pagal cardId

    if(chosenCards.length === 2) {
        setTimeout(checkForMatch, 500)
    }
}





createBoard()  //aktyvavimas funkcijos

})