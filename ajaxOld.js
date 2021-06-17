const resultado = document.getElementById('resultado');
const seleccion = document.getElementById('seleccion');
let pokes = 0;


resultado.addEventListener('dragstart', e => {
  //console.log(e)
  e.dataTransfer.setData("text", e.target.id)
})

seleccion.addEventListener('dragover', e => {
  if (seleccion.childElementCount == 6) {
    return
  }
  e.preventDefault();
})

seleccion.addEventListener('drop', e => {
  e.preventDefault();
  // MAXIMO DE SELECCION DEBE SER 6
  if (seleccion.childElementCount == 6) {
    return console.error('Maximo alcanzado')
  }
  let newItem = document.getElementById(e.dataTransfer.getData("text"));
  newItem.classList.remove('card');
  newItem.classList.add('pokeTeam');
  seleccion.appendChild(newItem)
})


document.querySelector('BUTTON').addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();

  let pokemonSelect = document.getElementById('pokeInput').value

  if (isNaN(pokemonSelect)) {
    pokemonSelect = pokemonSelect.toLowerCase()
  } else {
    pokemonSelect = parseInt(pokemonSelect)
  }

  add(pokemonSelect);
  document.getElementById('pokeInput').value = '';
})

//version funcion + callback
function add(poke) {
  const pURL = 'https://pokeapi.co/api/v2/pokemon';
  const xhr = new XMLHttpRequest();
  xhr.open("get", pURL + '/' + poke);
  xhr.send();

  xhr.addEventListener("load", e => {
    if (resultado.childElementCount == 14) {
      return console.warn('Limite alcanzado, no se agrego la seleccion')
    }
    if (e.target.status != 200) {
      console.warn(`No encontrado ${poke}`)
    }

    if (e.target.status == 200) {
      pokes++;

      const selectionJSON = JSON.parse(e.target.response)
      const dataPokeId = selectionJSON.id;
      const dataPokeName = selectionJSON.name;
      const dataPokeSprite = selectionJSON.sprites;
      const dataPokeMoveList = selectionJSON.moves;

      const frag = document.createDocumentFragment()
      const li = document.createElement('LI');


      let moves = 0;
      let movesAdded = '';
      let pokeMoves = moveGenerator()

      function moveGenerator() {
        if (dataPokeMoveList.length == 0) {
          return '-'
        }
        try {
          while (moves < 4) {
            let newMove = dataPokeMoveList[Math.floor(Math.random() * dataPokeMoveList.length)].move['name'];
            if (movesAdded.includes(newMove)) {
              dataPokeMoveList.length == 1 ? dataPokeMoveList.move[0] : moveGenerator();
            }
            else {
              movesAdded += `<li class='moves'>${newMove}</li>`
              moves++;
              moveGenerator();
            }
          }
        }
        catch {
          return '-'
        }
        finally {
          return movesAdded
        }
      }

      li.classList.add('card');
      li.classList.add('newCard');
      li.dataset.pokeId = dataPokeId;
      li.dataset.pokeName = dataPokeName;
      li.dataset.pokeSprite = dataPokeSprite.front_default
      li.draggable = true;
      li.id = `_${pokes}`;
      li.innerHTML = `
      <span class='idPoke'>#${pokes}</span>
      <div class="card-title">
        <h4>${dataPokeId}</h4>
        <h3>${dataPokeName}</h3>
      </div>

      <img src="${dataPokeSprite.front_default}" alt="${dataPokeName}" title='${dataPokeName + ' #' + pokes}' class='sprite' draggable="false">
    
      <ul>
        ${pokeMoves}
      </ul>
      `;
      //<li class='moves'>${selectionJSON.moves[Math.floor(Math.random() * selectionJSON.moves.length)].move['name']}</li>
      frag.appendChild(li)
      resultado.appendChild(frag)
      setTimeout(() => {
        document.getElementById(li.id).classList.remove('newCard')
      }, 1000)
    }
  })
}




/*
const button = document.querySelector("BUTTON");
const seccion = document.getElementById("algo");

const URL = "http://localhost:3000";

setTimeout(() => {
  requestGet(`${ URL } / users`, (e) => {
    console.log("USERS");
    console.table(JSON.parse(e.target.response));
  });
  requestGet(`${ URL } / comments`, (e) => {
    console.log("COMMENTS");
    console.table(JSON.parse(e.target.response));
  });
  requestGet(`${ URL } / articles`, (e) => {
    console.log("ARTICLES");
    console.table(JSON.parse(e.target.response));
  });
}, 0);

const promesaUsuarios = new Promise(function (resolve, reject) {
  //resolver(); // resuelve promesa como 'afirmativa' o cumplida
  //reject(); // resuelve promesa como rechazado (no cumplida)

  const xhr = new XMLHttpRequest();
  xhr.open("get", URL + "/articles");
  xhr.send();
  xhr.addEventListener("load", (e) => {
    if (xhr.status == 200) {
      resolve(xhr.response);
    } else {
      reject("malardo");
    }
  });
});

promesaUsuarios
  .then((msj) => console.log(JSON.parse(msj)))
  .catch((err) => console.error(err));


// Infierno de callbacks?
requestGet(`${ URL } / comments`, e => {
    let comments = JSON.parse(e.target.response);
    let postId_pos1 = comments[1].postId; // de la segunda posicion de los comentarios obtenidos, obtengo su postId (18)

    requestGet(`${ URL } / articles ? userId = 64`, e => { // Envio consulta a articles, articles cuyo id es de 18 (postId para otras tablas)
        console.log( (JSON.parse(e.target.response)));
        console.log( (JSON.parse(e.target.response)).forEach(a => console.warn(a.title)));
    });

    requestGet(`${ URL } / articles ? id = ${ postId_pos1 }`, e => { // Envio consulta a articles, articles cuyo id es de 18 (postId para otras tablas)
        let rtaid = JSON.parse(e.target.response);
        let idart = rtaid[0].userId; // Al primer articulo cuyo id es de 18, obtengo su userId (64)

        requestGet(`${ URL } / users ? id = ${ idart }`, e => { // hago otro request para los usuarios cuyo id = userId = 64
            let a = JSON.parse( e.target.response);
            console.log(a[0].name); // imprimo el name del primer resutado con id=64 (Lucas)
        });
    });
});


function requestGet(url, callbackFn) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", url);
  xhr.send();

  xhr.addEventListener("load", callbackFn);
}

---------------------------------------------------

const promUser = requestGet(URL + "/users");

promUser
  .then((cadenaUsuario) => {
    let users = JSON.parse(cadenaUsuario);
    console.info(users)
    let idUser = users[1].id;
    const promArts = requestGet(`${ URL } / articles ? userId = ${ idUser }`);
    return promArts;
  })
  .then((cadenaArticulo) => {
    let articles = JSON.parse(cadenaArticulo);
    console.info(articles)
    let idArt = articles[1].id;
    return requestGet(`${ URL } / comments ? postId = ${ idArt }`);
  })
  .then((cadenaComentario) => {
    let comms = JSON.parse(cadenaComentario);
    console.table(comms);
  })
  .catch((msj) => console.error(msj))
  // Tambien puede ser then
  .finally(() => {
    alert("final de ejecucion de promesas");
  });

function requestGet(url) {
  const promesaRespuesta = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", url);
    xhr.send();
    xhr.addEventListener("load", (e) => {
      if (xhr.status == 200) {
        resolve(xhr.response);
      } else {
        reject("Fallo ajax", url);
      }
    });
  });
  return promesaRespuesta;
}
*/