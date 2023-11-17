

let deck = [],
    tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A','J', 'Q', 'K'],
    puntosJugador = 0, puntosComputadora = 0;

//desordena un array
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push( i + tipo );
        }
    }

    for(let especial of especiales){
        for(let tipo of tipos){
            deck.push( especial + tipo );
        }
    }
    return shuffle(deck);
}
crearDeck();

const pedirCarta = () => deck.length > 0 ? deck.pop() : console.log('No ya cartas en el deck');

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length -1);
    return isNaN(valor) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

//Referencias al HTML
const newGame = document.querySelector('#btn-newGame');
const getCard = document.querySelector('#btn-getCard');
const stop = document.querySelector('#btn-stop');
const puntos = document.querySelectorAll('small');
const jugadorCartas = document.querySelectorAll('.jugador-cartas');
const winOrlose = document.querySelector('.winOrlose');

//mensaje perdedor
const messageLose = () => {
    const lose = document.createElement('h3');
    lose.innerText = 'You Lose!!';
    lose.className = 'lose';
    winOrlose.append(lose);
}

//mensaje ganador
const messageWin = () => {
    const win = document.createElement('h3');
    win.innerText = 'You Win!!';
    win.className = 'win';
    winOrlose.append(win);
}

//mensaje empate
const messageNobody = () => {
    const nobody = document.createElement('h3');
    nobody.innerText = 'Nobody Win';
    nobody.className = 'nobody';
    winOrlose.append(nobody);
}

//turno computadora
const turnComputer = (puntosJugador) => {
    do{
        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `/cartas/${carta}.png`;
        imgCarta.className = 'carta';
        jugadorCartas[1].append(imgCarta);
    }while(puntosJugador > puntosComputadora && puntosJugador <= 21);
    puntos[1].innerText = puntosComputadora;
}

//pedir carta
getCard.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador += valorCarta(carta);
    puntos[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `/cartas/${carta}.png`;
    imgCarta.className = 'carta';
    jugadorCartas[0].append(imgCarta);

    if(puntosJugador > 21){
        turnComputer(puntosJugador);
        messageLose();
        getCard.disabled = true;
        stop.disabled = true;
    }else if(puntosJugador === 21 ){
        turnComputer(puntosJugador);
        if(puntosComputadora === 21){
            messageNobody();
            getCard.disabled = true;
            stop.disabled = true;
        }else{
            messageWin();
            getCard.disabled = true;
            stop.disabled = true;
        }
    }
})

//detener juego
stop.addEventListener('click', () => {
    if(puntosJugador > 21){
        turnComputer(puntosJugador);
        messageLose();
        getCard.disabled = true;
        stop.disabled = true;
    }else if(puntosJugador === 21 ){
        turnComputer(puntosJugador);
        if(puntosComputadora === 21){
            messageNobody();
            getCard.disabled = true;
            stop.disabled = true;
        }else{
            messageWin();
            getCard.disabled = true;
            stop.disabled = true;
        }
    }else{
        turnComputer(puntosJugador);
        if(puntosComputadora < puntosJugador || puntosComputadora >21){
            messageWin();
            getCard.disabled = true;
            stop.disabled = true;
        }else if(puntosComputadora === puntosJugador){
            messageNobody();
            getCard.disabled = true;
            stop.disabled = true;
        }else{
            messageLose();
            getCard.disabled = true;
            stop.disabled = true;
        }
    }
})

//nuevo juego
newGame.addEventListener('click', () => {
    puntosJugador = 0;
    puntosComputadora = 0;

    jugadorCartas[0].innerHTML = '';
    jugadorCartas[1].innerHTML = '';

    puntos[0].innerText = '0';
    puntos[1].innerText = '0';

    winOrlose.innerText = '';

    getCard.disabled = false;
    stop.disabled = false;

    deck = [];
    crearDeck();
})