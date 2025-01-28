document.getElementById('emprendedorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const descripcion = document.getElementById('descripcion').value;
    const imagenInput = document.getElementById('imagenInput');
    
    // Crear un objeto de FileReader para leer la imagen
    const reader = new FileReader();
    reader.onload = function(e) {
        const imagen = e.target.result; // Obtener la URL de la imagen

        agregarEmprendedor(nombre, descripcion, imagen);
        document.getElementById('emprendedorForm').reset(); // Limpiar el formulario
    };

    // Leer el archivo como una URL de datos
    reader.readAsDataURL(imagenInput.files[0]);
});

function agregarEmprendedor(nombre, descripcion, imagen) {
    const tableBody = document.getElementById('emprendedoresTable').querySelector('tbody');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${nombre}</td>
        <td>${descripcion}</td>
        <td><img src="${imagen}" alt="${nombre}"></td>
        <td class="action-buttons">
            <button onclick="modificarEmprendedor(this)">Modificar</button>
            <button onclick="eliminarEmprendedor(this)">Eliminar</button>
        </td>
    `;

    tableBody.appendChild(row);
}

function modificarEmprendedor(button) {
    const row = button.closest('tr');
    const nombre = row.cells[0].innerText;
    const descripcion = row.cells[1].innerText;
    const imagen = row.cells[2].querySelector('img').src;

    // Rellenar el formulario con los datos actuales
    document.getElementById('nombre').value = nombre;
    document.getElementById('descripcion').value = descripcion;

    // Para modificar la imagen, vamos a necesitar un input adicional
    const imagenInput = document.getElementById('imagenInput');
    imagenInput.value = ''; // Limpiar el input de archivo

    // Mostrar la imagen actual en el input
    const imgPreview = document.createElement('img');
    imgPreview.src = imagen;
    imgPreview.alt = nombre;
    imgPreview.style.maxWidth = '100px';
    imgPreview.style.display = 'block';
    row.cells[2].innerHTML = ''; // Limpiar la celda de imagen
    row.cells[2].appendChild(imgPreview); // Mostrar la imagen actual

    // Eliminar la fila después de modificar
    eliminarEmprendedor(button);
}

function eliminarEmprendedor(button) {
    const row = button.closest('tr');
    row.remove(); // Eliminar la fila de la tabla
}