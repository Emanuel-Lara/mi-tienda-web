var carrito = [];
var NUMERO_WHATSAPP = "584120000000";

function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarritoUI();
    
    var sidebar = document.getElementById("cart-sidebar");
    var overlay = document.getElementById("overlay");
    if (sidebar && overlay) {
        sidebar.classList.add("open");
        overlay.classList.add("active");
    }
}

function actualizarCarritoUI() {
    var countElem = document.getElementById("cart-count");
    if (countElem) {
        countElem.innerText = carrito.length;
    }

    var cartItemsList = document.getElementById("cart-items");
    if (cartItemsList) {
        cartItemsList.innerHTML = "";
        var total = 0;
        
        for (var i = 0; i < carrito.length; i++) {
            var producto = carrito[i];
            total += producto.precio;
            
            var li = document.createElement("li");
            li.innerHTML = "<span>" + producto.nombre + "</span> <strong>$" + producto.precio.toFixed(2) + "</strong>";
            cartItemsList.appendChild(li);
        }

        var totalElem = document.getElementById("cart-total");
        if (totalElem) {
            totalElem.innerText = total.toFixed(2);
        }
    }
}

function toggleCarrito() {
    var sidebar = document.getElementById("cart-sidebar");
    var overlay = document.getElementById("overlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
}

// FUNCIÓN DE FILTRADO DE CATEGORÍAS ROBUSTA Y CORREGIDA
function filtrarCategoria(categoria, botonSeleccionado) {
    var productos = document.querySelectorAll(".product-card");
    var botones = document.querySelectorAll(".category-btn");

    // Limpiar clase 'active' de todos los botones
    for (var j = 0; j < botones.length; j++) {
        botones[j].classList.remove("active");
    }

    // Activar el botón presionado
    if (botonSeleccionado) {
        botonSeleccionado.classList.add("active");
    } else if (window.event && window.event.target) {
        window.event.target.classList.add("active");
    }

    // Mostrar u ocultar productos según la categoría seleccionada
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

// FUNCIÓN DE BÚSQUEDA EN TIEMPO REAL
function buscarProducto() {
    var input = document.getElementById("search-input").value.toLowerCase();
    var productos = document.querySelectorAll(".product-card");

    for (var i = 0; i < productos.length; i++) {
        var prod = productos[i];
        var titulo = prod.querySelector("h3").innerText.toLowerCase();

        if (titulo.includes(input)) {
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
        mensaje += (i + 1) + ". " + producto.nombre + " - $" + producto.precio.toFixed(2) + "\n";
        total += producto.precio;
    }

    mensaje += "\nMonto Total Estimado: $" + total.toFixed(2) + "\n\n¿Tienen disponibilidad de estos artículos?";

    var url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}
