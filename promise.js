const pURL = 'https://pokeapi.co/api/v2/pokemon'



//version funcion + callback
function showConsole(poke) {
  const xhr = new XMLHttpRequest();
  xhr.open("get", pURL + '/' + poke);
  xhr.send();
  xhr.addEventListener("load", e => {
    if (e.target.status == 200) {
      console.info(JSON.parse(e.target.response).name)
      console.warn(JSON.parse(e.target.response).moves[0].move['name'])
      console.warn(JSON.parse(e.target.response).moves[1].move['name'])
      console.warn(JSON.parse(e.target.response).moves[2].move['name'])
      console.warn(JSON.parse(e.target.response).moves[3].move['name'])
      console.warn(JSON.parse(e.target.response).moves[4].move['name'])
    }
  })
}


showConsole(prompt('Ingrese'))
showConsole(prompt('Ingrese'))
showConsole(prompt('Ingrese'))
showConsole(prompt('Ingrese'))
showConsole(prompt('Ingrese'))






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