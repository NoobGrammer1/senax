
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




