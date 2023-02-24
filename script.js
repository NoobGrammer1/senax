
const apellidosRadio = document.querySelector('input[value="apellidos"]');
const cedulaRadio = document.querySelector('input[value="cedula"]');
const inputApellido = document.getElementById('input-apellido');
const inputCedula = document.getElementById('input-cedula');


inputApellido.style.display = 'inline-block';
inputCedula.style.display = 'none';

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

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita el comportamiento predeterminado del formulario

  // Mostrar el contenedor de resultados
  resultsContainer.style.display = 'block';

  // Colocar el foco en el contenedor de resultados
  resultsContainer.focus();
  resultsContainer.scrollIntoView({ behavior: 'smooth' });
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



// Path: index.html

