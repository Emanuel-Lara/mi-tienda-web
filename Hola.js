var carrito = [];
var NUMERO_WHATSAPP = "584120000000"; // Reemplaza con tu número de teléfono de WhatsApp

// 1. AÑADIR AL CARRITO (Sin abrir el panel automáticamente)
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre: nombre, precio: precio });
    actualizarCarritoUI();
    
    // NOTA: Se eliminó la apertura automática del carrito
}

// 2. ELIMINAR UN ARTÍCULO ESPECÍFICO DEL CARRITO
function eliminarDelCarrito(indice) {
    // Elimina 1 elemento en la posición dada
    carrito.splice(indice, 1);
    actualizarCarritoUI();
}

// 3. ACTUALIZAR INTERFAZ DEL CARRITO
function actualizarCarritoUI() {
    // Actualizar el número flotante de la barra superior
    var countElem = document.getElementById("cart-count");
    if (countElem) {
        countElem.innerText = carrito.length;
    }

    var cartItemsList = document.getElementById("cart-items");
    if (cartItemsList) {
        cartItemsList.innerHTML = "";
        var total = 0;
        
        if (carrito.length === 0) {
            cartItemsList.innerHTML = '<li style="text-align: center; color: #94a3b8; border: none; padding: 20px 0;">El carrito está vacío.</li>';
        } else {
            for (var i = 0; i < carrito.length; i++) {
                var producto = carrito[i];
                total += producto.precio;
                
                var li = document.createElement("li");
                li.innerHTML = 
                    '<div style="display: flex; flex-direction: column; gap: 2px;">' +
                        '<span style="font-weight: 600;">' + producto.nombre + '</span>' +
                        '<span style="color: #22c55e; font-weight: 700;">$' + producto.precio.toFixed(2) + '</span>' +
                    '</div>' +
                    '<button onclick="eliminarDelCarrito(' + i + ')" title="Eliminar artículo" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid #ef4444; padding: 4px 8px; border-radius: 8px; cursor: pointer; font-size: 0.8em; transition: all 0.2s;">✕ Eliminar</button>';
                
                cartItemsList.appendChild(li);
            }
        }

        var totalElem = document.getElementById("cart-total");
        if (totalElem) {
            totalElem.innerText = total.toFixed(2);
        }
    }
}

// 4. ABRIR / CERRAR CARRITO
function toggleCarrito() {
    var sidebar = document.getElementById("cart-sidebar");
    var overlay = document.getElementById("overlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
}

// 5. FILTRAR POR CATEGORÍAS
function filtrarCategoria(categoria, elementoBoton) {
    var productos = document.querySelectorAll(".product-card");
    var botones = document.querySelectorAll(".category-btn");

    for (var j = 0; j < botones.length; j++) {
        botones[j].classList.remove("active");
    }

    if (elementoBoton) {
        elementoBoton.classList.add("active");
    } else if (window.event && window.event.target) {
        window.event.target.classList.add("active");
    }

    for (var i = 0; i < productos.length; i++) {
        var card = productos[i];
        var cat = card.getAttribute("data-category");

        if (categoria === "todos" || cat === categoria) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    }
}

// 6. BUSCADOR EN TIEMPO REAL
function buscarProducto() {
    var input = document.getElementById("search-input").value.toLowerCase();
    var productos = document.querySelectorAll(".product-card");

    for (var i = 0; i < productos.length; i++) {
        var card = productos[i];
        var titulo = card.querySelector("h3").innerText.toLowerCase();

        if (titulo.indexOf(input) !== -1) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    }
}

// 7. ENVIAR ORDEN A WHATSAPP
function enviarWhatsApp() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega algún producto antes de enviar tu orden.");
        return;
    }

    var mensaje = "Hola, me gustaría consultar la disponibilidad de los siguientes productos:\n\n";
    var total = 0;

    for (var i = 0; i < carrito.length; i++) {
        mensaje += (i + 1) + ". " + carrito[i].nombre + " - $" + carrito[i].precio.toFixed(2) + "\n";
        total += carrito[i].precio;
    }

    mensaje += "\nMonto Total Estimado: $" + total.toFixed(2) + "\n\n¿Tienen disponibilidad de estos artículos?";

    var url = "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(mensaje);
    window.open(url, "_blank");
}
