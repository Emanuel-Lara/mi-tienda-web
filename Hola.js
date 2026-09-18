var carrito = [];
var NUMERO_WHATSAPP = "584120000000";

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarritoUI();
}

function actualizarCarritoUI() {
    document.getElementById("cart-count").innerText = carrito.length;

    var cartItemsList = document.getElementById("cart-items");
    cartItemsList.innerHTML = "";

    var total = 0;
    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        total = total + producto.precio;
        
        var li = document.createElement("li");
        li.innerText = producto.nombre + " - $" + producto.precio.toFixed(2);
        cartItemsList.appendChild(li);
    }

    document.getElementById("cart-total").innerText = total.toFixed(2);
}

function toggleCarrito() {
    var modal = document.getElementById("cart-modal");
    if (modal.style.display === "flex") {
        modal.style.display = "none";
    } else {
        modal.style.display = "flex";
    }
}

function filtrarCategoria(categoria, botonSeleccionado) {
    var productos = document.querySelectorAll(".product-card");
    var botones = document.querySelectorAll(".category-btn");

    // Quitar la clase active de todos los botones
    for (var j = 0; j < botones.length; j++) {
        botones[j].classList.remove("active");
    }

    // Marcar el botón presionado
    if (botonSeleccionado) {
        botonSeleccionado.classList.add("active");
    }

    // Filtrar productos agregando o quitando la clase 'hidden'
    for (var i = 0; i < productos.length; i++) {
        var prod = productos[i];
        var catProducto = prod.getAttribute("data-category");

        if (categoria === "todos" || catProducto === categoria) {
            prod.classList.remove("hidden");
        } else {
            prod.classList.add("hidden");
        }
    }
}

function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    var mensaje = "Hola, me gustaría consultar la disponibilidad de los siguientes productos:\n\n";
    var total = 0;

    for (var i = 0; i < carrito.length; i++) {
        var producto = carrito[i];
        mensaje = mensaje + (i + 1) + ". " + producto.nombre + " - $" + producto.precio.toFixed(2) + "\n";
        total = total + producto.precio;
    }

    mensaje = mensaje + "\nMonto Total Estimado: $" + total.toFixed(2) + "\n\n¿Tienen disponibilidad de estos artículos?";

    var url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    
    window.open(url, "_blank");
}