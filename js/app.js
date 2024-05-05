

window.addEventListener("DOMContentLoaded", () => {
    //Menu lateral nav
    const container_main = document.querySelector(".container-main")
    const container_pay = document.getElementById("container_pay")
    const burguer = document.getElementById("menu_burguer")
    const checkbox = document.getElementById("checkbox")
    const drop_mobile = document.getElementById("menu")
    const body = window.document.body

    checkbox.addEventListener("change", () => {
        const child = container_main.children;
        for (let i = 0; i < child.length; i++) {
            if (checkbox.checked) {
                drop_mobile.style.transform = "translateX(0%)"
                body.classList.add("no-scroll")
                if (child[i].classList.contains("container-sh")) {
                    container_pay.classList.add("no-scroll-payment");
                }
            }
            else {
                drop_mobile.style.transform = ""
                body.classList.remove("no-scroll")
                if (child[i].classList.contains("container-sh")) {
                    container_pay.classList.remove("no-scroll-payment");
                }
            }
        }
    })


    //Menu lateral
    const arrow = document.getElementById("arrow");
    const menu_lateral = document.querySelector(".menu-lateral")

    arrow.addEventListener("click", toggleMenu);

    function toggleMenu() {
        menu_lateral.classList.toggle("active_lateral")
        if (menu_lateral.classList.contains("active_lateral")) {
            container_main.classList.add("grid_switch")
            menu_lateral.style.position = "fixed"
            arrow.style.transform = "rotate(180deg)"
        } else {
            container_main.classList.remove("grid_switch")
            menu_lateral.style.position = ""
            arrow.style.transform = ""
        }
    }

    const widget = document.querySelector(".widget");
    const down_mobile = document.querySelector(".down__mobile")

    widget.addEventListener("click", activeDropdown);

    function activeDropdown() {
        down_mobile.classList.toggle("activar__dropdown")
    }

    //Funciones Index
    funtionIndex(container_main);

    //Funciones ShopCart
    activeShopCart(container_main);
})



function activeShopCart(main) {
    const child = main.children;
    Array.from(child).forEach(children => {
        if (children.classList.contains("container-sh")) {
            activarRezise();
            activarCarrito();
        }
    })
}

function activarCarrito() {
    //Carrito de compras
    const btnSend = document.getElementById("btn-send")

    btnSend.addEventListener("click", () => {
        const storedFont = localStorage.getItem('customFont');

        let swalInstance;
        Swal.fire({
            title: "<strong>La compra ha sido exitosa</strong>",
            imageUrl: "../img/Successfulv2.png",
            imageWidth: 350,
            imageAlt: "Custom image",
            confirmButtonColor: "#4e87d5",
            cancelButtonColor: "#d33",
            confirmButtonText: "<strong>Ver información del vendedor</strong>",
            showCloseButton: true,
            customClass: {
                popup: 'swal2-popup',
                confirmButton: 'confirm-btn'
            }
        }).then((result) => {
            if (result.isConfirmed) {

                window.location.href = '../alerts/sucess.html';
            }
        }).then((instance) => {
            swalInstance = instance;
            const confirmButton = swalInstance.$confirmButton;
            confirmButton.addEventListener('mouseenter', function () {
                confirmButton.classList.add('hover-effect');
            });

            confirmButton.addEventListener('mouseleave', function () {
                confirmButton.classList.remove('hover-effect');
            });
        });

        if (storedFont) {
            changeFontFamily(storedFont);
        }
    });

    //Local storage para fuente de sweetAlerts
    function changeFontFamily(font) {
        document.body.style.fontFamily = font;
        localStorage.setItem('customFont', font);
    }


    //variables
    let subTotal = 0;
    const igvRate = 0.18;

    const allContainers = document.querySelectorAll('.container-products-card');

    // Calcular el subtotal desde el primer instante
    allContainers.forEach(function (container) {
        const quantityElement = container.querySelector('.container-icons-card h4');
        const priceElement = container.querySelector('.cantidad');
        const originalPrice = extractPriceFromElement(priceElement);

        // Actualizar el subtotal
        subTotal += calculateTotalPrice(quantityElement.textContent, originalPrice);

        // Actualizar detalles tarjetas
        updateCardDetails(subTotal);
        updatePaymentSection(subTotal);
    });

    // Evento Tarjetas
    allContainers.forEach(function (container) {
        const quantityElement = container.querySelector('.container-icons-card h4');
        const priceElement = container.querySelector('.cantidad');
        const originalPrice = extractPriceFromElement(priceElement);

        // Evento de suma
        container.querySelector('.fa-plus').addEventListener('click', function () {
            let quantity = parseInt(quantityElement.textContent);
            quantity += 1;
            quantityElement.textContent = quantity;
            updateTotalPrice(container, quantity, originalPrice, 'add');
        });

        // Evento de resta
        container.querySelector('.fa-minus').addEventListener('click', function () {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity -= 1;
                quantityElement.textContent = quantity;
                updateTotalPrice(container, quantity, originalPrice, 'subtract');
            }
        });

        // Evento al eliminar la card
        const deleteIcons = container.querySelectorAll('.fa-trash-can, .fa-xmark');
        deleteIcons.forEach(function (deleteIcon) {
            deleteIcon.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Estás seguro?',
                    text: '¡No podrás revertir esto!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Sí, eliminar',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const quantity = parseInt(quantityElement.textContent);
                        const totalPrice = calculateTotalPrice(quantity, originalPrice);

                        subTotal -= totalPrice;
                        if (subTotal < 0) subTotal = 0;

                        container.remove();

                        updateCardDetails(subTotal);
                        updatePaymentSection(subTotal);

                        Swal.fire('<strong>¡Eliminado!</strong>', '<strong>El producto ha sido eliminada con éxito!</strong>', 'success');
                    }
                });
            });
        });
    });

    // Función para extraer el precio desde el elemento HTML
    function extractPriceFromElement(priceElement) {
        const priceText = priceElement.textContent.replace('S/.', '').trim();
        return parseFloat(priceText);
    }

    // Función para calcular el precio total
    function calculateTotalPrice(quantity, pricePerUnit) {
        return quantity * pricePerUnit;
    }

    function updateCardDetails(subTotal) {
    }

    function updatePaymentSection(subTotal) {
        const igv = subTotal * igvRate;
        const total = subTotal + igv;

        // Actualizar el HTML con el subtotal, IGV y total
        document.querySelector('.pay-price h3:nth-child(1)').textContent = `S/.${subTotal.toFixed(2)}`;
        document.querySelector('.pay-price h3:nth-child(2)').textContent = `S/.${igv.toFixed(2)}`;
        document.querySelector('.pay-price h3:nth-child(3)').textContent = `S/.${total.toFixed(2)}`;

        // Actualizar el enlace de pago
        document.getElementById('btn-send').querySelector('p').textContent = `S/.${total.toFixed(2)}`;
    }

    // Función para actualizar la cantidad total y el precio total
    function updateTotalPrice(container, quantity, originalPrice, operation) {
        const totalPrice = calculateTotalPrice(quantity, originalPrice);

        // Actualizar el subtotal
        if (operation === 'add') {
            subTotal += totalPrice - calculateTotalPrice(quantity - 1, originalPrice);
        } else if (operation === 'subtract') {
            subTotal -= calculateTotalPrice(quantity + 1, originalPrice) - totalPrice;
        }

        updateCardDetails(subTotal);
        updatePaymentSection(subTotal);

        // Actualizar el precio total en la tarjeta específica
        container.querySelector('.cantidad').textContent = `S/.${totalPrice.toFixed(2)}`;
    }
}


function activarRezise() {
    const container_pay = document.getElementById("container_pay")
    const pay_method = document.querySelector(".container-paymethod")
    const observer = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
            let ancho = entry.contentRect.width;
            if (ancho < 920) {
                pay_method.classList.add("margin-payment")
            } else if (ancho > 920) {
                pay_method.classList.remove("margin-payment")
            }
        })
    })

    observer.observe(container_pay);
}


function funtionIndex(main) {
    const child = main.lastElementChild;
    if (child.classList.contains("content-index")) {
        activeResizeIndex();
    }
}



function activeResizeIndex() {
    const cards__help = document.querySelector(".cards__help");
    const offerts = document.querySelector(".offerts");

    const observer = new ResizeObserver(function (entries) {
        entries.forEach(function (entry) {
            let ancho = entry.contentRect.width;
            let repeatGridValue = 1;

            if (ancho > 1100) {
                setTimeout(() => {
                    offerts.classList.remove("grid-template-column");
                }, 100)
                repeatGridValue = 5;
            } else if (ancho > 800) {
                setTimeout(() => {
                    offerts.classList.remove("grid-template-column");
                }, 100)
                repeatGridValue = 3;
            } else if (ancho > 600) {
                setTimeout(() => {
                    offerts.classList.remove("grid-template-column");
                }, 100)
                repeatGridValue = 2;
            } else if (ancho <= 600) {
                setTimeout(() => {
                    offerts.classList.add("grid-template-column");
                }, 100);
                repeatGridValue = 1;
            }

            setTimeout(() => {
                cards__help.style.setProperty("--repeat-grid", repeatGridValue);
            }, 100);
        });
    });

    observer.observe(cards__help);
    observer.observe(offerts);
}