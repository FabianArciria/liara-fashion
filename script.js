function order(productName) {

    const phone = "573217147358"; // <-- pon aquí el número oficial de LIARA Fashión

    const message = `Hola, deseo más información sobre el producto: ${productName}.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}
