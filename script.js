const gameData = {
    "preguntas": [
      {
        "id": 1,
        "pregunta": "Nombra algo que la gente suele olvidar al salir de casa",
        "respuestas": [
          {
            "texto": "Llaves",
            "puntos": 40
          },
          {
            "texto": "Teléfono móvil",
            "puntos": 30
          },
          {
            "texto": "Billetera/Cartera",
            "puntos": 20
          },
          {
            "texto": "Paraguas",
            "puntos": 5
          },
          {
            "texto": "Gafas",
            "puntos": 5
          }
        ],
        "categoria": "Vida cotidiana"
      },
      {
        "id": 2,
        "pregunta": "Nombra una profesión donde se trabaje principalmente de noche",
        "respuestas": [
          {
            "texto": "Guardia de seguridad",
            "puntos": 35
          },
          {
            "texto": "Enfermero/a",
            "puntos": 25
          },
          {
            "texto": "Bartender",
            "puntos": 20
          },
          {
            "texto": "Taxista",
            "puntos": 15
          },
          {
            "texto": "DJ",
            "puntos": 3
          },
          {
            "texto": "cariñosa",
            "puntos": 2
          }
        ],
        "categoria": "Trabajos"
      },
      {
        "id": 3,
        "pregunta": "Nombra un animal que puede vivir tanto en agua como en tierra",
        "respuestas": [
          {
            "texto": "Rana",
            "puntos": 35
          },
          {
            "texto": "Cocodrilo",
            "puntos": 25
          },
          {
            "texto": "Tortuga",
            "puntos": 20
          },
          {
            "texto": "Hipopótamo",
            "puntos": 15
          },
          {
            "texto": "Nutria",
            "puntos": 5
          }
        ],
        "categoria": "Animales"
      },
      {
        "id": 4,
        "pregunta": "Nombra un postre típico de cumpleaños",
        "respuestas": [
          {
            "texto": "Pastel/Tarta",
            "puntos": 45
          },
          {
            "texto": "Helado",
            "puntos": 20
          },
          {
            "texto": "Cupcakes",
            "puntos": 15
          },
          {
            "texto": "Gelatina",
            "puntos": 10
          },
          {
            "texto": "Brownies",
            "puntos": 10
          }
        ],
        "categoria": "Alimentos"
      },
      {
        "id": 5,
        "pregunta": "Nombra algo que la gente hace para relajarse después del trabajo",
        "respuestas": [
          {
            "texto": "Ver televisión",
            "puntos": 30
          },
          {
            "texto": "Tomar una ducha/baño",
            "puntos": 25
          },
          {
            "texto": "Escuchar música",
            "puntos": 20
          },
          {
            "texto": "Hacer ejercicio",
            "puntos": 15
          },
          {
            "texto": "Leer un libro",
            "puntos": 10
          }
        ],
        "categoria": "Actividades"
      }
    ]
  };
  
function seleccionarPreguntaAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * gameData.preguntas.length);
    const preguntaSeleccionada = gameData.preguntas[indiceAleatorio];
    const textoPregunta = preguntaSeleccionada.pregunta;
    const respuestas = [];

    preguntaSeleccionada.respuestas.forEach(respuesta => {
      respuestas.push({
        texto: respuesta.texto,
        puntos: respuesta.puntos
      });
    });

    const cantidadRespuestas = respuestas.length;
    
    return {
      id: preguntaSeleccionada.id,
      pregunta: textoPregunta,
      respuestas: respuestas,
      cantidadRespuestas: cantidadRespuestas,
      categoria: preguntaSeleccionada.categoria
    };
  }

  function generarSlotsRespuestas(pregunta) {
    const answerContainer = document.querySelector('.answer-container');
    answerContainer.innerHTML = '';
    const respuestas = pregunta.respuestas;
    console.log(respuestas)

    const slotsContainer = document.createElement('div');
    slotsContainer.className = 'answer-slots';
    
    respuestas.forEach((respuesta, index) => {
      const slot = document.createElement('div');
      slot.className = 'answer-slot';
      slot.id = `respuesta-slot-${index + 1}`;
      slot.textContent = `Respuesta ${index + 1}`;
      slot.dataset.respuesta = respuesta.texto; 
      slot.dataset.puntos = respuesta.puntos;
      slotsContainer.appendChild(slot);
    });
    answerContainer.appendChild(slotsContainer);
  }
  
  const preguntaActual = seleccionarPreguntaAleatoria();
  
  console.log("Pregunta seleccionada:", preguntaActual.pregunta);
  console.log("Categoría:", preguntaActual.categoria);
  console.log("Cantidad de respuestas:", preguntaActual.cantidadRespuestas);
  console.log("Respuestas:", preguntaActual.respuestas);

  const gameQuestionDiv = document.getElementById("gameQuestion");
  gameQuestionDiv.textContent = preguntaActual.pregunta;

  const numberAnswersSpan = document.getElementById("numberAnswers");
  numberAnswersSpan.textContent = preguntaActual.cantidadRespuestas;

  const categoryQuestionSpan = document.getElementById("categoryQuestion");
  categoryQuestionSpan.textContent = preguntaActual.categoria;

  generarSlotsRespuestas(preguntaActual)


function compararRespuesta() {
    const respuestaUsuario = document.getElementById('answerInput').value.trim().toLowerCase();
    if (respuestaUsuario === '') {
        return;
    }
    const respuestasCorrectas = preguntaActual.respuestas;
    let coincidencia = false;
    let respuestaEncontrada = null;
    
    for (let i = 0; i < respuestasCorrectas.length; i++) {
        if (respuestasCorrectas[i].texto.toLowerCase() === respuestaUsuario) {
            coincidencia = true;
            respuestaEncontrada = respuestasCorrectas[i];
            break;
        }
    }
    
  
    if (coincidencia) {
        console.log("¡Respuesta correcta! Coincide con:", respuestaEncontrada.texto);
        console.log("Puntos:", respuestaEncontrada.puntos);
    } else {
        console.log("No hay coincidencia con ninguna respuesta.");
    }
 
    document.getElementById('answerInput').value = '';
}

document.getElementById('submitAnswer').addEventListener('click', compararRespuesta);

document.getElementById('answerInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        compararRespuesta();
    }
});
