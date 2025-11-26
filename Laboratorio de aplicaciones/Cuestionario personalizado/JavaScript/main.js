let boton = document.getElementById("btn");
boton.addEventListener("click", () => {
    let puntos = 0;
    let respuestas = document.querySelectorAll("input[type='checkbox']:checked");
    respuestas.forEach(r => {puntos += parseInt(r.value);});
    localStorage.setItem("total", puntos);

    window.location.href = "./resultados.html";
});