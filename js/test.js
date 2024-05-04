const btn = document.querySelector(".btn");
const dropdown = document.getElementById("myDropdown");



btn.addEventListener("click", toggleDropdown);


function toggleDropdown() {
    dropdown.classList.toggle("activar-dropdown");
}