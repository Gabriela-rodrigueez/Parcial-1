const btnCart= document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () =>{
    containerCartProducts.classList.toggle('hidden-cart');
});

// 
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');
// lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');
// arregles de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');



productsList.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const product = e.target.parentElement;

        const infoProduct = {
            quantity:1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exits = allProducts.some(product => product.title === infoProduct.title);

        if (exits){
            const products = allProducts.map(product =>{
                if(product.title === infoProduct.title){
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }

            });
            allProducts = [...products]
        } else {
            allProducts = [...allProducts, infoProduct];
        }
        

        showHTML(); 

    }

});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter( product => product.title !== title

        );
        console.log(allProducts);

        showHTML();
    }
});

// para mostrar html
const showHTML = () =>{

    if(!allProducts.length){
        cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
    }


    // limpiar html
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product =>{
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

        containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>    
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        `;

        rowProduct.append(containerProduct);


    //     total = 
    //         total + parseInt(product.quantity * product.price.slice(1));
    //     totalOfProducts = totalOfProducts + product.quantity;

    // });

    // valorTotal.innerText = `$${total}`;
    // countProducts.innerText = totalOfProducts;

        // convertir el precio a número sin comas ni símbolos
        const priceNumber = parseFloat(product.price.replace(/[$.]/g, '').replace(',','.'));
        total += product.quantity * priceNumber;
        totalOfProducts += product.quantity;

    });

    // Convertir el total a formato moneda
    const formattedTtotal = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(total)

    valorTotal.innerText = formattedTtotal;

    // actualizar contador de productos para que se vea el signo + y no el 0
countProducts.innerText = totalOfProducts === 0 ? '+' : totalOfProducts;

};


// buscador
// const btnSearch= document.querySelector('.icon-search');
// const searchInput = document.querySelector('.search-input');

// btnSearch.addEventListener('click', () =>{
//     searchInput.classList.toggle('hidden-search');
// })

document.addEventListener('DOMContentLoaded', function() {
    // Variables de elementos del DOM
    const searchInput = document.querySelector('.search_input-text');
    const searchIcon = document.querySelector('.icon-search');
    const searchResults = document.getElementById('search-results');

    // Mostrar/Cerrar el campo de búsqueda al hacer clic en el ícono
    searchIcon.addEventListener('click', function() {
        const searchContainer = document.querySelector('.search-input');
        searchContainer.classList.toggle('hidden-search');
        searchInput.focus();
    });

    // Manejar el evento de búsqueda
    searchInput.addEventListener('keyup', function() {
        const searchTerm = searchInput.value.toUpperCase();
        searchResults.innerHTML = ''; // Limpiar resultados previos

        const items = document.querySelectorAll('.item'); // Asume que los elementos a buscar tienen la clase 'item'
        items.forEach(item => {
            const itemText = item.textContent.toUpperCase();
            if (itemText.includes(searchTerm)) {
                const resultItem = item.cloneNode(true);
                searchResults.appendChild(resultItem);
            }
        });

        if (!searchTerm) {
            searchResults.innerHTML = ''; // Limpiar resultados si no hay término de búsqueda
        }
    });
});





// menu
const btnMenu= document.querySelector('.container-menu-icon');
const menuList = document.querySelector('.menu-list');

btnMenu.addEventListener('click', () =>{
    menuList.classList.toggle('hidden-menu');
})



// boton cerrar sesión al logearse
document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", function() {
        // Clear the login state
        localStorage.removeItem("loggedIn");
        // Redirect to the login page
        window.location.href = ".html";
    });
});

document.getElementById("logout").addEventListener("click", function() {
    // Clear the login state
    localStorage.removeItem("loggedIn");
    // Redirigir a la página de inicio de sesión
    window.location.href = "registro.html";
});

