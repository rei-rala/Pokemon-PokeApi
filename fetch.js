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


//version fetch comparado con callback version
function add(poke) {
  const pURL = 'https://pokeapi.co/api/v2/pokemon';
  fetch(pURL + '/' + poke,
    { method: 'get' }
  )
    .then(r => r.json())
    .then(r => {
      if (resultado.childElementCount == 14) {
        return console.warn('Limite alcanzado, no se agrego la seleccion')
      }

      pokes++;

      const selectionJSON = r //JSON.parse(e.target.response)
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
          throw ('')
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

      // vago?
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


      frag.appendChild(li)
      resultado.appendChild(frag)
      setTimeout(() => {
        document.getElementById(li.id).classList.remove('newCard')
      }, 1000)
    }
    )
    .catch(err => console.warn('No encontrado' + err))
}