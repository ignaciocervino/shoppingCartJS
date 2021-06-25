//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


//Funcion para listar todos los event listeners
cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    //Elimina cursos del carrito
    carrito.addEventListener('click',eliminarCurso);
    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

}

//Funciones
function agregarCurso(e){
    e.preventDefault();//Para que no se me vaya al href de arriba
    if(e.target.classList.contains('agregar-carrito')){
        //console.log(`Agregando al carrito ${this.previousElementSibling}`);
        const cursoSeleccionado = e.target.parentElement.parentElement;
        const objCurso = leerDatosCurso(cursoSeleccionado);
    }
}

//Leer contenido de los cursos
function leerDatosCurso(curso){
    //console.log(curso);
    //Creo un bojeto con el contenido del curso actual
    const infoCurso={
        image: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        price: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        quantity: 1
    }
    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if(!existe){
        //Agrega curso al arreglo de carrito
        articulosCarrito = [...articulosCarrito,infoCurso];
    }else{
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso=>{
            if (curso.id===infoCurso.id) {
                curso.quantity++;
            }
            return curso;
        });//Crea nuevo arreglo
    }
    
    //console.table(articulosCarrito);
    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso =>{
        //Distructoring
        const{image,title,price,quantity,id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${image}" width="100">
            </td>
            <td>
                ${title}
            </td>
            <td>
                ${price}
            </td>
            <td>
                ${quantity}
            </td>
            <td>
               <a href="#" class="borrar-curso" data-id=${id}> X </a>
            </td>
        `;
        //Agregael HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);//Agrega pero no limpia los previos
    });
    
    //console.log(contenedorCarrito);
}

//Funcion para eliminar curso del carrito
function eliminarCurso(e){
    //console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')) {
        console.log('here');
        const cursoId = e.target.getAttribute('data-id');
        //Elimina del arreglo con filter
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        //Debo llamar la funcion que imprime el html
        carritoHTML();
    }
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //contenedorCarrito.innerHTML = ''; // una forma
    //Otra forma eliminando los hijos, mas rapida que eliminar con innerHTML
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function vaciarCarrito(e){
    console.log(e.target.classList);
    console.log('Vaciando el carrito...');
    while(articulosCarrito.length > 0) {
        articulosCarrito.pop();
    }
    e.preventDefault();
    carritoHTML();
    limpiarHTML();
}

