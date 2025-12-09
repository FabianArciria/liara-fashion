function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
}

function order(productName) {

    const phone = "573217147358"; // Número oficial de LIARA Fashion

    const message = `Hola, deseo más información sobre el producto: ${productName}.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}
