
const apellidosRadio = document.querySelector('input[value="apellidos"]');
const cedulaRadio = document.querySelector('input[value="cedula"]');
const inputApellido = document.getElementById('input-apellido');
const inputCedula = document.getElementById('input-cedula');


inputApellido.style.display = 'inline-block';
inputCedula.style.display = 'none';


cedulaRadio.addEventListener('click', () => {
  inputApellido.value = '';
});

apellidosRadio.addEventListener('click', () => {
  inputCedula.value = '';
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
  event.preventDefault(); // Evita el comportamiento predeterminado del formulario


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




          if (columns[0] === searchInput) {
            const newRow = document.createElement('tr');
            const idColumn = document.createElement('td');
            const nameColumn = document.createElement('td');
            const viewColumn = document.createElement('td');
            const viewButton = document.createElement('button');
  
            idColumn.textContent = columns[0];
            nameColumn.textContent = columns[1];
            viewButton.textContent = 'Ver Información';
  
            viewButton.addEventListener('click', () => {
              // aquí puedes agregar la lógica para mostrar la información completa
              console.log(`Mostrando información para ${columns[1]}`);
            });
  
            viewColumn.appendChild(viewButton);
            newRow.appendChild(idColumn);
            newRow.appendChild(nameColumn);
            newRow.appendChild(viewColumn);
            tableBody.appendChild(newRow);
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
      alert('La cédula ingresada no es válida.');
    } else {
      alert('El apellido ingresado no es válido.');
    }
  }
});





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


// const searchButton = document.getElementById('search-button');

// searchButton.addEventListener('click', () => {
//   const searchInput = document.getElementById('search-input').value;
//   const tableBody = document.querySelector('#results-table tbody');
//   tableBody.innerHTML = '';

//   fetch('datos.csv')
//     .then(response => response.text())
//     .then(data => {
//       const rows = data.split('\n');
//       rows.forEach(row => {
//         const columns = row.split(',');
//         if (columns[0] === searchInput) {
//           const newRow = document.createElement('tr');
//           const idColumn = document.createElement('td');
//           const nameColumn = document.createElement('td');
//           const viewColumn = document.createElement('td');
//           const viewButton = document.createElement('button');

//           idColumn.textContent = columns[0];
//           nameColumn.textContent = columns[1];
//           viewButton.textContent = 'Ver Información';

//           viewButton.addEventListener('click', () => {
//             // aquí puedes agregar la lógica para mostrar la información completa
//             console.log(`Mostrando información para ${columns[1]}`);
//           });

//           viewColumn.appendChild(viewButton);
//           newRow.appendChild(idColumn);
//           newRow.appendChild(nameColumn);
//           newRow.appendChild(viewColumn);
//           tableBody.appendChild(newRow);
//         }
//       });
//     });
// });




// Path: index.html

