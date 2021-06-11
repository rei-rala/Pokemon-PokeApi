const pURL = 'https://pokeapi.co/api/v2/pokemon'
const resultado = document.getElementById('resultado')
document.querySelector('BUTTON').addEventListener('click', e => {
  let pokemonSelect = document.getElementById('pokeInput').value

  isNaN(pokemonSelect) ? {} : (
    pokemonSelect = parseInt(pokemonSelect)
  )

  e.stopPropagation();
  e.preventDefault();
  add(pokemonSelect)
  pokemonSelect = ''
})

//version funcion + callback
function add(poke) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", pURL + '/' + poke);
  xhr.send();

  xhr.addEventListener("load", e => {
    if (e.target.status != 200) {
      console.warn(`No encontrado ${e.target.response}`)
    }

    if (e.target.status == 200) {
      const selectionJSON = JSON.parse(e.target.response)
      const frag = document.createDocumentFragment()

      const li = document.createElement('LI');

      let moves = 0;
      let movesAdded = '';
      function moveGenerator() {
        if (selectionJSON.moves.length == 0) {
          return ''
        }

        //let generados = [];

        try {
          while (moves < 4) {
            let newMove = selectionJSON.moves[Math.floor(Math.random() * selectionJSON.moves.length)].move['name'];
            if (movesAdded.includes(newMove)) {
              moveGenerator()
            }
            else {
              movesAdded += `<li class='moves'>${newMove}</li>`
              moves++;
              moveGenerator();
            }
          }
        }
        finally {
          return movesAdded
        }
      }


      li.classList.add('card')
      li.draggable = true
      li.innerHTML = `
      <div class="card-title">
        <h4>${selectionJSON.id}</h4>
        <h3>${selectionJSON.name}</h3>
      </div>

      <img src="${selectionJSON.sprites.front_default}" alt="${selectionJSON.name}" title='${selectionJSON.name}' draggable="false">
    
      <ul>
        ${moveGenerator()}
      </ul>
      `;
      //<li class='moves'>${selectionJSON.moves[Math.floor(Math.random() * selectionJSON.moves.length)].move['name']}</li>
      frag.appendChild(li)
      resultado.appendChild(frag)

      console.log(selectionJSON.id)
      console.info(selectionJSON.name)
      console.log(selectionJSON.moves[0].move['name'])
      console.log(selectionJSON.moves[1].move['name'])
      console.log(selectionJSON.moves[2].move['name'])
      console.log(selectionJSON.moves[3].move['name'])
      console.log(selectionJSON.moves[4].move['name'])
      console.log(selectionJSON.moves[4].move['name'])
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