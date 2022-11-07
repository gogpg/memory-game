addEventListener('DOMContentLoaded', () => {       //turime parasyti si eevent listeneri, kad veiktu js tada kai uzsikrauna DOM contentas, nes script nuoroda idejau html virsuje.

// card options

const cardArray = [
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
        img: 'src/images/milkshake.png',
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
        img: 'src/images/milkshake.png',
    },
]

cardArray.sort(() => 0.5 - Math.random())  //masyvo elementu sumaisymo funkcija, kiekveina karta atnaujinus narsykle, korteles masyve susimaisys atsitiktine tvarka.
                                        //0.5 - Math.random() gives random numbers that are roughly 50% negative and 50% positive. This will ensure the array is sorted randomly on each try.
console.log(cardArray)                      //Math.random() returns a random decimal between 0 and 1 (but never equal to 1).
                                        //0.5 - Math.random() would return a decimal between -0.4999... and 0.5

const grid = document.querySelector('.grid')  //issitraukiu html elementa i kuri desiu korteles
const resultDisplay = document.querySelector('#result')

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')  // sukasi ciklas, susikuria korteles
        card.setAttribute('src', 'src/images/blank.png')  //kiekviena kortele gauna value, siuo atveju blank atvaizda, susikuria margos vienodos korteles su individualiais id
        card.setAttribute('data-id', i)  //besisukurdamos corteles cikle gaus kiekviena savo individualu id pradedant nuo 0, baigiant 11, nes is viso yra 12 korteliu.
        card.addEventListener('click', flipCard) //kiekvienai susikurusiais kortelei priskiriamas event listeneris, kad jei ant jos bus paspaust, aktyvuotusi funkcija.
        grid.appendChild(card) //kiekviena kortele idedame i grid elementa.
    }
}


let chosenCards = [];    //cia rinksis pasirinktu korteliu name
let chosenCardsId = [];  //pasirinktu krteliu id
let cardsWon = []        //pasirinktu korteliu name, kurios sutapo 

function flipCard() {
    let cardId = this.getAttribute('data-id')         //this reiskia bet kokia kortele su kuria bus dirbama, paspaudus kortele gausime jos id
    chosenCards.push(cardArray[cardId].name)              //i viena nauja masyva renkasi vardai is cards masyvo pagal cardId
    chosenCardsId.push(cardId)                        // i kita id
    this.setAttribute('src', cardArray[cardId].img)       //paspaudus ant korteles pasirodo jos vaizdas is cards masyvo pagal cardId

    if(chosenCards.length === 2) {     //kai pasirinktu korteliu masyve yra 2 korteles, aktyvuojasi korteliu palyginimo gunkcija po 500 milisekundziu
        setTimeout(checkForMatch, 500)
    }
}

function checkForMatch(){

    const cards = document.querySelectorAll('img') //issitraukiame visus img
    
    const optionOneId = chosenCardsId[0]   //nustatome, kokia bus pirma kortele, ieskosime chosencardsId masyve
    const optionTwoId = chosenCardsId[1]   //antra pazymeta kortele

    if (optionOneId === optionTwoId){   //jeigu pasirinktas pirmas ir antras elementas sutampa, id yra tokie patys, tai paspaude du kartus ant tos pacios korteles
        alert('You have clicked the same image!')  //pasirodo uzrasas
        cards[optionOneId].setAttribute('src', 'src/images/blank.png')  //kortelems priskiriame nauja value, ji vel apsivercia ir neberodo vaizdo
        cards[optionTwoId].setAttribute('src', 'src/images/blank.png')

    } else if (chosenCards[0] === chosenCards[1]) {  //jei korteliu vardai sutampa, tokios pacios korteles yra po du kartus, todel ju id skirtingi, bet sutampa vardai. vadinasi paspausta ne ant tos pacios korteles du kartus. chosenCards masyve renkasi names.
        alert('You have found a match!')
        cards[optionOneId].setAttribute('src', 'src/images/white.png')  //kortelems priskiriame nauja value, jos pasidaro baltos
        cards[optionTwoId].setAttribute('src', 'src/images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)  //ir pasaliname event listeneri, kad nebegalima butu ant tos korteles paspausti
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(chosenCards)
        console.log(cardsWon)
    } else if (chosenCards[0] != chosenCards[1]) {  //jei korteles nesutampa, chosenCards masyve, kur renkami vardai
        cards[optionOneId].setAttribute('src', 'src/images/blank.png')  //kortelems priskiriame nauja value, jos pasidaro vel margos
        cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
        alert('Sorry try again!')
    }
    chosenCards = [];  //po pirmu dvieju paspaudimu masyvas, kur renkami pasirinktu korteliu vardai ir masyvas, kur renkami pasirinktu korteliu id vel tampa tusti, nes vel spejama is naujo ar dvi pasirinktos korteles sutampa.
    chosenCardsId = [];
    resultDisplay.textContent = cardsWon.length;  //kadangi i cardsWon arreju renkasi atskiri masyvai, kuriuose yra po dvi sutampancias korteles, tai kiek tu masyvu yra tiek ir bus tasku, pagal bendra masyvo ilgi.

    if (cardsWon.length === cardArray.length / 2) {  //jei atpsetu korteliu masyvo ilgis lygus originalaus korteliu masyvo ilgiui pasalintui is 2, reiskia visos korteles atverstos ir atspetos.
        resultDisplay.textContent = 'Congratulations you have won!'
    }
}

createBoard()  //aktyvavimas funkcijos

})