var nombres = [];
var modoDeJuego = '';
var cartones = [];
var turnoActual = 0;
var numerosGenerados = [];
var puntajes = [0, 0, 0, 0]; //  para llevar un registro de los puntajes
var turnos = 0
var victorias = [0, 0, 0, 0]; // Inicializar las victorias de cada jugador


function mostrarModosDeJuego() {
    // lógica para mostrar los modos de juego
    nombres.push(document.getElementById('nombre1').value);
    nombres.push(document.getElementById('nombre2').value);
    nombres.push(document.getElementById('nombre3').value);
    nombres.push(document.getElementById('nombre4').value);
    document.getElementById('vista1').style.display = 'none';
    document.getElementById('vistaModos').style.display = 'block';
}

function iniciarJuego(modo) {
    //la lógica para iniciar el juego
    modoDeJuego = modo;
    generarCartones();
    mostrarVista2();
}

function generarCartones() {
    for (var i = 0; i < nombres.length; i++) {
        var carton = [];
        for (var j = 0; j < modoDeJuego; j++) {
            carton.push([]);
            for (var k = 0; k < modoDeJuego; k++) {
                var numero;
                do {
                    numero = Math.floor(Math.random() * 50) + 1;
                } while (carton.flat().includes(numero));
                carton[j].push(numero);
                var casilla = document.createElement('span');
                casilla.id = 'jugador' + i + 'fila' + j + 'columna' + k;
                console.log('ID generado: ' + casilla.id); // Imprime el ID generado ya funcionando borrar 
                casilla.textContent = numero;
                document.getElementById('carton' + (i + 1)).appendChild(casilla), console.log(casilla);
            }
        }
        cartones.push(carton);
    }
}

function marcarNumeroEnCartones(numero) {
    console.log('Número generado: ' + numero);
    for (var i = 0; i < cartones.length; i++) {
        for (var j = 0; j < cartones[i].length; j++) {
            for (var k = 0; k < cartones[i][j].length; k++) {
                console.log('Número en el cartón: ' + cartones[i][j][k]); 
                if (cartones[i][j][k] === numero) {
                    console.log('Número encontrado en el cartón del jugador ' + i); 
                    cartones[i][j][k] = 0;
                    var casilla = document.getElementById('jugador' + i + 'fila' + j + 'columna' + k); 
                    console.log('ID de la casilla: ' + casilla); 
                    if (casilla) {
                        casilla.style.backgroundColor = 'lightgreen';
                    }
                    verificarLineas(i);
                }
            }
        }
    }
}

function siguienteTurno() {
    //lógica para el siguiente turno
    var numeroAleatorio;
    do {
        numeroAleatorio = Math.floor(Math.random() * 50) + 1;
    } while (numerosGenerados.includes(numeroAleatorio));
    numerosGenerados.push(numeroAleatorio);
    document.getElementById('numeroAleatorio').innerText = 'Número generado: ' + numeroAleatorio;
    marcarNumeroEnCartones(numeroAleatorio);
    if (comprobarGanador() || ++turnos >= 50) { // Incrementa los turnos y verifica si se alcanzaron los 25 turnos ahora 50 psra verificar
        victorias[turnoActual]++; // Incrementa las victorias del jugador ganador
        guardarVictorias(); // Guarda las victorias en localStorage
        mostrarVista3();
    } else {
        // Actualiza los puntajes y las victorias
        for (var i = 0; i < nombres.length; i++) {
            var nombre = document.getElementById('carton' + (i + 1)).getElementsByTagName('h2')[0];
            nombre.textContent = nombres[i] + ' - Puntaje: ' + puntajes[i] + ' - Victorias: ' + victorias[i];
        }
    }
}




/**MATRIZ LLENAAA  funciona*/
function comprobarGanador() {
    // lógica para comprobar si hay un ganador
    for (var i = 0; i < cartones.length; i++) {
        if (cartones[i].flat().every(num => num === 0)) {
            return true;
        }
    }
    return false;
}


// Inicializa una matriz para verificar las líneas completadas ????????????
var lineasCompletadas = [
    { horizontales: [], verticales: [], diagonalIzq: false, diagonalDer: false },
    { horizontales: [], verticales: [], diagonalIzq: false, diagonalDer: false },
    { horizontales: [], verticales: [], diagonalIzq: false, diagonalDer: false },
    { horizontales: [], verticales: [], diagonalIzq: false, diagonalDer: false }
];

function verificarLineas(jugador) {
    var carton = cartones[jugador];
    // Verifica líneas horizontales
    for (var i = 0; i < carton.length; i++) {
        if (!lineasCompletadas[jugador].horizontales[i] && carton[i].every(num => num === 0)) {
            puntajes[jugador] += 1;
            lineasCompletadas[jugador].horizontales[i] = true; // Marca la línea como completada
            console.log('Línea horizontal completada por el jugador ' + jugador + ' en la fila ' + i); 
        }
    }
    // Verifica líneas verticales
    for (var i = 0; i < carton.length; i++) {
        if (!lineasCompletadas[jugador].verticales[i] && carton.map(fila => fila[i]).every(num => num === 0)) {
            puntajes[jugador] += 1;
            lineasCompletadas[jugador].verticales[i] = true; // Marca la línea como completada
        }
    }
    // Verifica líneas diagonales
    if (!lineasCompletadas[jugador].diagonalIzq && carton.map((fila, i) => fila[i]).every(num => num === 0)) {
        puntajes[jugador] += 3;
        lineasCompletadas[jugador].diagonalIzq = true; // Marca la línea como completada
    }
    if (!lineasCompletadas[jugador].diagonalDer && carton.map((fila, i) => fila[carton.length - 1 - i]).every(num => num === 0)) {
        puntajes[jugador] += 3;
        lineasCompletadas[jugador].diagonalDer = true; // Marca la línea como completada
    }
    // Verifica si el cartón está completamente lleno
    if (carton.flat().every(num => num === 0)) {
        puntajes[jugador] += 5;
        console.log('hola soy carton lleno lol' + jugador);
    }
}

function mostrarVista2() {
    // Para la vista 2 de los cartones funcionando 
    document.getElementById('vistaModos').style.display = 'none';
    document.getElementById('vista2').style.display = 'block';

    // datos del jugador funcc
    for (var i = 0; i < nombres.length; i++) {
        var cartonDiv = document.getElementById('carton' + (i + 1));
        cartonDiv.innerHTML = ''; // Limpia el cartón

        // Datos jugador funcc
        var nombre = document.createElement('h2');
        nombre.textContent = nombres[i] + ' - Puntaje: ' + puntajes[i] + ' - Victorias: ' + victorias[i];
        cartonDiv.appendChild(nombre);

        // Muestra el carton
        for (var j = 0; j < cartones[i].length; j++) {
            var fila = document.createElement('div');
            for (var k = 0; k < cartones[i][j].length; k++) {
                var celda = document.createElement('span');
                celda.id = 'jugador' + i + 'fila' + j + 'columna' + k; // Asigna el mismo ID que en generarCartones()
                celda.textContent = cartones[i][j][k];
                fila.appendChild(celda);
            }
            cartonDiv.appendChild(fila);
        }
    }
}

// Funciones para guardar y cargar vict funccc LS
function guardarVictorias() {
    localStorage.setItem('victorias', JSON.stringify(victorias));
}

function cargarVictorias() {
    victorias = JSON.parse(localStorage.getItem('victorias')) || [0, 0, 0, 0];
}

// Carga las victorias cuando se carga la página funcc
window.onload = function() {
    cargarVictorias();
    cargarPuntajes();
};


function mostrarVista3() {
    // Para ver la pantalla final, felicitacion bbla bla
    document.getElementById('vista2').style.display = 'none';
    document.getElementById('vista3').style.display = 'block';
    document.getElementById('botonesVista3').style.display = 'block'; // Muestra los botones
    document.getElementById('ganador').innerText = 'El ganador es ' + nombres[turnoActual] + ' con ' + puntajes[turnoActual] + ' puntos!';
}


function reiniciarJuego() {
    // Guarda el puntaje y las victorias del jugador ganador funcc
    var puntajeGanador = puntajes[turnoActual];
    var victoriasGanador = victorias[turnoActual];

    // Reinicia el juego func
    cartones = [];
    turnoActual = 0;
    numerosGenerados = [];
    turnos = 0;

    // Restaura el puntaje y las victorias del jugador ganador listo
    puntajes[turnoActual] = puntajeGanador;
    victorias[turnoActual] = victoriasGanador;

    // Guarda los puntajes y las victorias listo
    guardarPuntajes();
    guardarVictorias();

    // Limpiar los cartones en la vista
    for (var i = 0; i < nombres.length; i++) {
        var cartonDiv = document.getElementById('carton' + (i + 1));
        while (cartonDiv.firstChild) {
            cartonDiv.removeChild(cartonDiv.firstChild);
        }
    }

    document.getElementById('vista3').style.display = 'none';
    document.getElementById('botonesVista3').style.display = 'none'; // para quitar los botones hecho 
    iniciarJuego(modoDeJuego); // Genera nuevos cartones y muestra la vista 2
}




function volverAlMenu() {
    // esto es para la lógica reiniciar el juego desde 0
    nombres = [];
    modoDeJuego = '';
    cartones = [];
    turnoActual = 0;
    numerosGenerados = [];
    puntajes = [0, 0, 0, 0]; // Reinicia los puntajes
    turnos = 0;
    guardarPuntajes(); // guardar punt
    victorias = [0, 0, 0, 0]; // resetttt
    guardarVictorias(); // para guardar en LS funcccc
    document.getElementById('vista3').style.display = 'none';
    document.getElementById('vista1').style.display = 'block';
}

// esto es para guardar y cargar los puntajes usando localStorage ver un ejemplo stackoverflow
function guardarPuntajes() {
    localStorage.setItem('puntajes', JSON.stringify(puntajes));
}

function cargarPuntajes() {
    puntajes = JSON.parse(localStorage.getItem('puntajes')) || [0, 0, 0, 0];
}

// para cargar punt al cargar pag
window.onload = cargarPuntajes;
