
const apellidosRadio = document.querySelector('input[value="apellidos"]');
const cedulaRadio = document.querySelector('input[value="cedula"]');
const inputApellido = document.getElementById('input-apellido');
const inputCedula = document.getElementById('input-cedula');
const errorContainer = document.querySelector('#error-container');
const errorText = document.querySelector('#error-container p');

inputApellido.style.display = 'inline-block';
inputCedula.style.display = 'none';


cedulaRadio.addEventListener('click', () => {
  const inputApellido = document.getElementById('apellidos');
  inputApellido.value = '';
  errorContainer.style.display = 'none';
});


apellidosRadio.addEventListener('click', () => {
  const inputCedula = document.getElementById('cedula');
  inputCedula.value = '';
  errorContainer.style.display = 'none';
});




apellidosRadio.addEventListener('click', () => {
  inputApellido.style.display = 'inline-block';
});

cedulaRadio.addEventListener('click', () => {
  inputCedula.style.display = 'inline-block';
});

apellidosRadio.addEventListener('change', () => {
  inputCedula.style.display = 'none';
});

cedulaRadio.addEventListener('change', () => {
  inputApellido.style.display = 'none';
});


const form = document.querySelector('form');
const resultsContainer = document.getElementById('results-container');


let apellido = '';
let cedula = '';

inputApellido.addEventListener('input', (event) => {
  apellido = event.target.value;
});

inputCedula.addEventListener('input', (event) => {
  cedula = event.target.value;
});





form.addEventListener('submit', (event) => {

  const returnToResultsButton = document.getElementsByClassName('secondary-button');
  returnToResultsButton.enabled
  event.preventDefault(); // Evita el comportamiento predeterminado del formulario

  const dataCedula = document.getElementById('data-cedula');
  const dataNombres = document.getElementById('data-nombres');
  const dataGenero = document.getElementById('data-genero');
  const dataNacionalidad = document.getElementById('data-nacionalidad');
  const personalInfoContainer = document.getElementById('personal-info');
  // Verifica si al menos uno de los campos es válido
  if (validarCedula(cedula) || validarApellidos(apellido)) {

    const searchInput = validarCedula(cedula) ? cedula : apellido;
    const tableBody = document.querySelector('#results-container tbody');
    tableBody.innerHTML = '';

    fetch('data/personal-data.csv')
      .then(response => response.text())
      .then(data => {

        const rows = data.split('\n');
        rows.forEach(row => {
          const columns = row.split(',');
          if (validarCedula(cedula)) {
            if (columns[0] === searchInput) {
              const newRow = document.createElement('tr');
              const idColumn = document.createElement('td');
              const nameColumn = document.createElement('td');
              const viewColumn = document.createElement('td');
              const viewButton = document.createElement('a');



              idColumn.textContent = columns[0];
              nameColumn.textContent = columns[1] + ' ' + columns[2];
              viewButton.textContent = 'Ver Información';
              viewButton.href = '#personal-info';
              viewButton.tabIndex = 0;


              viewButton.addEventListener('click', () => {

                const titlesLinked = columns[5].split('-');
                let ThirdLevelTitles = [];
                let FourthLevelTitles = [];
                titlesLinked.forEach(element => {
                  if (element.startsWith('3')) {
                    ThirdLevelTitles.push(element);
                  }
                });
                titlesLinked.forEach(element => {
                  if (element.startsWith('4')) {
                    FourthLevelTitles.push(element);
                  }
                });

                const myTLTableBody = document.querySelector('#third-level-titles-container tbody');
                const myFLTableBody = document.querySelector('#fourth-level-titles-container tbody');
                // Array con los títulos a buscar
                searchAndPopulateTable(myTLTableBody, ThirdLevelTitles);
                searchAndPopulateTable(myFLTableBody, FourthLevelTitles);

                event.preventDefault();

                resultsContainer.style.display = 'none';

                moreDetailsContainer.style.display = 'flex';
                moreDetailsContainer.style.textAlign = 'center';
                moreDetailsContainer.scrollIntoView({ behavior: 'smooth' });

                dataCedula.textContent = columns[0];
                dataNombres.textContent = columns[1] + ' ' + columns[2];
                dataGenero.textContent = columns[3];
                dataNacionalidad.textContent = columns[4];

                personalInfoContainer.focus();
                // Hacer que la pantalla se desplace al contenedor de información personal
                personalInfoContainer.scrollIntoView({ behavior: 'smooth' });

                if (FourthLevelTitles.length == 0) {
                  document.getElementById('cuatro').style.display = 'none';
                } else {
                  document.getElementById('cuatro').style.display = 'flex';
                }

                if (ThirdLevelTitles.length == 0) {
                  document.getElementById('tres').style.display = 'none';
                } else {
                  document.getElementById('tres').style.display = 'flex';
                }


              });

              viewColumn.appendChild(viewButton);
              newRow.appendChild(idColumn);
              newRow.appendChild(nameColumn);
              newRow.appendChild(viewColumn);
              tableBody.appendChild(newRow);
            }

          } else
            if (validarApellidos(apellido)) {
              console.log(columns[1] === apellido.toLocaleUpperCase());
              titlesLinked = columns[5].split('-');
              const myTLTableBody = document.querySelector('#third-level-titles-container tbody');
              const myFLTableBody = document.querySelector('#fourth-level-titles-container tbody');
              let ThirdLevelTitles = [];
              let FourthLevelTitles = [];
              titlesLinked.forEach(element => {
                if (element.startsWith('3')) {
                  ThirdLevelTitles.push(element);
                }
              });
              titlesLinked.forEach(element => {
                if (element.startsWith('4')) {
                  FourthLevelTitles.push(element);
                }
              });
              if (columns[1] === searchInput.toLocaleUpperCase()) {
                const newRow = document.createElement('tr');
                const idColumn = document.createElement('td');
                const nameColumn = document.createElement('td');
                const viewColumn = document.createElement('td');
                const viewButton = document.createElement('a');

                idColumn.textContent = columns[0];
                nameColumn.textContent = columns[1] + ' ' + columns[2];
                viewButton.textContent = 'Ver Información';

                viewButton.addEventListener('click', () => {

                  console.log(`Mostrando información para ${columns[1] + columns[2]}`);

                  searchAndPopulateTable(myTLTableBody, ThirdLevelTitles);
                  searchAndPopulateTable(myFLTableBody, FourthLevelTitles);
                  event.preventDefault();

                  resultsContainer.style.display = 'none';

                  moreDetailsContainer.style.display = 'flex';
                  moreDetailsContainer.style.textAlign = 'center';
                  moreDetailsContainer.scrollIntoView({ behavior: 'smooth' });

                  dataCedula.textContent = columns[0];
                  dataNombres.textContent = columns[1] + ' ' + columns[2];
                  dataGenero.textContent = columns[3];
                  dataNacionalidad.textContent = columns[4];

                  personalInfoContainer.focus();
                  // Hacer que la pantalla se desplace al contenedor de información personal
                  personalInfoContainer.scrollIntoView({ behavior: 'smooth' });

                });

                viewColumn.appendChild(viewButton);
                newRow.appendChild(idColumn);
                newRow.appendChild(nameColumn);
                newRow.appendChild(viewColumn);
                tableBody.appendChild(newRow);
              }

              if (FourthLevelTitles.length == 0) {
                document.getElementById('cuatro').style.display = 'none';
              } else {
                document.getElementById('cuatro').style.display = 'flex';
              }

              if (ThirdLevelTitles.length == 0) {
                document.getElementById('tres').style.display = 'none';
              } else {
                document.getElementById('tres').style.display = 'flex';
              }
            }
        });
      });




    // Muestra el contenedor de resultados
    resultsContainer.style.display = 'block';

    // Colocar el foco en el contenedor de resultados
    resultsContainer.focus();
    resultsContainer.scrollIntoView({ behavior: 'smooth' });

    // Haz cualquier otra cosa que necesites hacer para mostrar los resultados
    // ...
  } else if (!cedula && !apellido) {
    // Si no hay campos válidos, muestra un mensaje de error
    alert('Por favor completa al menos uno de los campos.');
  } else {

    // Si los campos no son válidos, muestra un mensaje de error indicando cuál es el campo inválido
    if (!validarCedula(cedula) && cedula !== '') {
      errorText.textContent = 'La cédula ingresada no es válida.';


    } else {
      errorText.textContent = 'El apellido ingresado no es válido.';
    }

    errorContainer.style.display = 'block';
    errorContainer.scrollIntoView({ behavior: 'smooth' });
    errorContainer.focus();
    errorContainer.setAttribute('aria-live', 'assertive');

  }
});


function searchAndPopulateTable(tableBody, titlesArray) {
  fetch('data/titles-data.csv')
    .then(response => response.text())
    .then(data => {
      const rows = data.split('\n');
      tableBody.innerHTML = ''; // Limpiamos el contenido actual del tbody
      rows.forEach(row => {
        const columns = row.split(',');
        if (titlesArray.includes(columns[0])) {
          const newRow = document.createElement('tr');
          const titleColumn = document.createElement('td');
          const iesColumn = document.createElement('td');
          const typeColumn = document.createElement('td');
          const recongnizedByColumn = document.createElement('td');
          const registerNumberColumn = document.createElement('td');
          const registerDateColumn = document.createElement('td');

          titleColumn.textContent = columns[1];
          iesColumn.textContent = columns[2];
          typeColumn.textContent = columns[3];
          recongnizedByColumn.textContent = columns[4] === 'empty' ? '' : columns[4];
          if (columns[4] === 'empty') {
            recongnizedByColumn.appendChild(document.createElement('br'));
          }
          registerNumberColumn.textContent = columns[5];
          registerDateColumn.textContent = columns[6];

          newRow.appendChild(titleColumn);
          newRow.appendChild(iesColumn);
          newRow.appendChild(typeColumn);
          newRow.appendChild(recongnizedByColumn);
          newRow.appendChild(registerNumberColumn);
          newRow.appendChild(registerDateColumn);
          tableBody.appendChild(newRow);
        }
      });
    })
    .catch(error => {
      console.log('Error fetching CSV data', error);
    });
}







const verInformacionLinks = document.querySelectorAll('.ver-informacion');
const moreDetailsContainer = document.getElementById('more-details');

verInformacionLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    // Ocultar el contenedor de resultados
    resultsContainer.style.display = 'none';

    // Mostrar el contenedor de más detalles
    moreDetailsContainer.style.display = 'block';

    // Enfocar el contenedor de información personal
    const personalInfoContainer = document.getElementById('personal-info');
    personalInfoContainer.focus();

    // Hacer que la pantalla se desplace al contenedor de información personal
    personalInfoContainer.scrollIntoView({ behavior: 'smooth' });
  });
});





function validarApellidos(apellidos) {
  // Expresión regular para validar si la cadena tiene dos palabras separadas por un espacio
  const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;

  // Validar si la cadena cumple con la expresión regular y no contiene números ni caracteres especiales
  if (regex.test(apellidos) && !/[^\w\s]/.test(apellidos) && !/\d/.test(apellidos)) {
    return true;
  } else {
    return false;
  }
}

function validarCedula(cedula) {
  // Verificar que la cédula tenga exactamente 10 caracteres
  if (cedula.length !== 10) {
    return false;
  }

  // Verificar que todos los caracteres sean dígitos
  if (!/^\d+$/.test(cedula)) {
    return false;
  }

  // Verificar que los primeros dos dígitos formen un número válido de provincia
  const provincia = parseInt(cedula.substring(0, 2));
  if (provincia < 1 || provincia > 24) {
    return false;
  }

  // Verificar el último dígito
  const ultimoDigito = parseInt(cedula.charAt(9));
  const sumaPonderada = cedula.substring(0, 9).split('')
    .map(d => parseInt(d))
    .reduce((acc, d, i) => {
      const peso = i % 2 === 0 ? 2 : 1;
      const producto = d * peso;
      return acc + (producto > 9 ? producto - 9 : producto);
    }, 0);
  const digitoComprobacion = sumaPonderada % 10 === 0 ? 0 : 10 - (sumaPonderada % 10);

  return ultimoDigito === digitoComprobacion;
}

//cambiar idioma

const languageSelect = document.getElementById("language-select");

languageSelect.addEventListener("change", function () {
  const selectedLanguage = this.value;
  if (selectedLanguage == "es") {
    location.href = "index.html";
  }
  if (selectedLanguage == "en") {
    location.href = "index_en.html"
  }
  if (selectedLanguage == "quz") {
    location.href = "index_quz.html"
  }
  if (selectedLanguage == "sh") {
    location.href = "index_sh.html"
  }

  console.log(`El idioma seleccionado es ${selectedLanguage}`);
});








// Path: index.html

