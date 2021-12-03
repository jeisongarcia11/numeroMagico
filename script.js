let randomNumber = Math.floor(Math.random() * 1000) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;

function checkGuess() {
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
      guesses.textContent = 'Intentos anteriores: ';
    }
    guesses.textContent += userGuess + ' ';
  
    if (userGuess === randomNumber) {
      lastResult.textContent = '¡Felicidades! ¡'+ Name + ' ¡Lo adivinaste!';
      lastResult.style.backgroundColor = 'green';
      lowOrHi.textContent = '';
      setGameOver();
    } else if (guessCount === 10) {
      lastResult.textContent = '!!!Fin del juego!!! El numero era: ' + randomNumber ;
      setGameOver();
    } else {
      lastResult.textContent = '¡Incorrecto!';
      lastResult.style.backgroundColor = 'red';
      if(userGuess < randomNumber) {
        lowOrHi.textContent = '¡El número es muy bajo!';
      } else if(userGuess > randomNumber) {
        lowOrHi.textContent = '¡El número es muy grande!';
      }
    }
  
    guessCount++;
    guessField.value = '';
    guessField.focus();
  }

  guessSubmit.addEventListener('click', checkGuess);

  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button');
    resetButton.textContent = 'Iniciar nuevo juego';
    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
  }

  function resetGame() {
    guessCount = 1;
  
    const resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0 ; i < resetParas.length ; i++) {
      resetParas[i].textContent = '';
    }
  
    resetButton.parentNode.removeChild(resetButton);
  
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
  
    lastResult.style.backgroundColor = 'white';
  
    randomNumber = Math.floor(Math.random() * 1000) + 1;
  }

  $(function(){

    // Caché algunos selectores

    var clock = $('#clock'),
        alarm = clock.find('.alarm'),
        ampm = clock.find('.ampm');

    // Asigne dígitos a sus nombres (esto será una matriz)
    var digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');

    // Este objeto contendrá los elementos de dígitos
    var digits = {};

    // Posiciones para las horas, minutos y segundos
    var positions = [
        'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
    ];

    // Se generan los dígitos con el marcado necesario,
    // y se agregan al reloj

    var digit_holder = clock.find('.digits');

    $.each(positions, function(){

        if(this == ':'){
            digit_holder.append('<div class="dots">');
        }
        else{

            var pos = $('<div>');

            for(var i=1; i<8; i++){
                pos.append('<span class="d' + i + '">');
            }

            // Se establece los dígitos como pares clave: valor en el objeto dígitos
            digits[this] = pos;

            // Se añade los elementos de dígitos a la página
            digit_holder.append(pos);
        }

    });

    // Se agrega el nombre del día de la semana

    var weekday_names = 'LUN MAR MIE JUE VIE SAB DOM'.split(' '),
        weekday_holder = clock.find('.weekdays');

    $.each(weekday_names, function(){
        weekday_holder.append('<span>' + this + '</span>');
    });

    var weekdays = clock.find('.weekdays span');

    // Se ejecuta un temporizador cada segundo y se actualiza el reloj

    (function update_time(){

        // Se usa moment.js para generar la hora actual como una cadena
        // hh corresponde a las horas en formato de 12 horas,
        // mm - minutos, ss-segundos (todos con ceros a la izquierda),
        // d es para el día de la semana y A es para AM / PM

        var now = moment().format("hhmmssdA");

        digits.h1.attr('class', digit_to_name[now[0]]);
        digits.h2.attr('class', digit_to_name[now[1]]);
        digits.m1.attr('class', digit_to_name[now[2]]);
        digits.m2.attr('class', digit_to_name[now[3]]);
        digits.s1.attr('class', digit_to_name[now[4]]);
        digits.s2.attr('class', digit_to_name[now[5]]);

        // La biblioteca devuelve el domingo como primer día de la semana.
        // Se cambia todos los días una posición hacia abajo 
        // y se hace que el domingo dure

        var dow = now[6];
        dow--;

        // Domingo!
        if(dow < 0){
            // Haz que dure
            dow = 6;
        }

        // Se marca el día activo de la semana
        weekdays.removeClass('active').eq(dow).addClass('active');

        // Se configura el texto am / pm:
        ampm.text(now[7]+now[8]);

        // Se programa esta función para que se ejecute nuevamente en 1 segundo
        setTimeout(update_time, 1000);

    })();

});