let botaoTopo = document.getElementById("botao-topo");

window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
});

botaoTopo.addEventListener("click", function () {
    window.scrollTo(0, 0);
});

let botaoConverter = document.getElementById("botao-converter");

botaoConverter.addEventListener("click", async function () {
    let valor = Number(document.getElementById("valor").value);
    let moeda = document.getElementById("moeda").value;
    let resultado = document.getElementById("resultado-conversao");

    if (valor <= 0) {
        resultado.textContent = "Digite um valor maior que zero.";
        resultado.style.color = "red";
        return;
    }

    resultado.textContent = "Buscando cotação...";
    resultado.style.color = "#1f5f8b";

    try {
        let resposta = await fetch("https://economia.awesomeapi.com.br/json/last/" + moeda + "-BRL");
        let dados = await resposta.json();

        let cotacao = Number(dados[moeda + "BRL"].bid);
        let convertido = valor / cotacao;

        resultado.textContent = "R$ " + valor.toFixed(2).replace(".", ",") + " = " +
            convertido.toFixed(2).replace(".", ",") + " " + moeda +
            " (cotação: R$ " + cotacao.toFixed(2).replace(".", ",") + ")";
    } catch (erro) {
        resultado.textContent = "Não foi possível buscar a cotação. Tente novamente.";
        resultado.style.color = "red";
    }
});


let campoNome = document.getElementById("nome");
let campoEmail = document.getElementById("email");
let campoCep = document.getElementById("cep");
let campoCidade = document.getElementById("cidade");

function emailValido(email) {
    return email.includes("@") && email.includes(".");
}

campoNome.addEventListener("input", function () {
    let textoErro = document.getElementById("erro-nome");

    if (campoNome.value.trim().length < 3) {
        textoErro.textContent = "O nome precisa ter pelo menos 3 letras.";
        campoNome.style.borderColor = "red";
    } else {
        textoErro.textContent = "";
        campoNome.style.borderColor = "green";
    }
});

campoEmail.addEventListener("input", function () {
    let textoErro = document.getElementById("erro-email");

    if (emailValido(campoEmail.value)) {
        textoErro.textContent = "";
        campoEmail.style.borderColor = "green";
    } else {
        textoErro.textContent = "Digite um e-mail válido. Ex: nome@gmail.com";
        campoEmail.style.borderColor = "red";
    }
});

campoCep.addEventListener("blur", async function () {
    let textoErro = document.getElementById("erro-cep");
    let cep = campoCep.value.replace("-", ""); 

    if (cep.length !== 8) {
        textoErro.textContent = "O CEP precisa ter 8 números.";
        campoCep.style.borderColor = "red";
        return;
    }

    try {
        let resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/");
        let dados = await resposta.json();

        if (dados.erro) {
            textoErro.textContent = "CEP não encontrado.";
            campoCep.style.borderColor = "red";
            campoCidade.value = "";
            return;
        }

        document.getElementById("rua").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        campoCidade.value = dados.localidade + " - " + dados.uf;

        textoErro.textContent = "";
        campoCep.style.borderColor = "green";
    } catch (erro) {
        textoErro.textContent = "Não foi possível buscar o CEP. Preencha o endereço manualmente.";
        campoCep.style.borderColor = "red";
    }
});

let formulario = document.getElementById("form-voluntario");

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); 

    let mensagem = document.getElementById("mensagem-formulario");

    if (campoNome.value.trim().length < 3 || !emailValido(campoEmail.value) || campoCidade.value === "") {
        mensagem.textContent = "Preencha nome, e-mail e CEP corretamente.";
        mensagem.style.color = "red";
        return;
    }

    mensagem.textContent = "Obrigado, " + campoNome.value.trim() + "! Entraremos em contato pelo e-mail " + campoEmail.value + ".";
    mensagem.style.color = "green";

    formulario.reset();
    campoNome.style.borderColor = "";
    campoEmail.style.borderColor = "";
    campoCep.style.borderColor = "";
});


let latitude = -6.8900;   
let longitude = -38.5619;

let mapa = L.map("mapa").setView([latitude, longitude], 15);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
}).addTo(mapa);

L.marker([latitude, longitude])
    .addTo(mapa)
    .bindPopup("<b>Instituto Caminho das Águas</b><br>Rua Anísio Rolim, 110 - Cajazeiras/PB")
    .openPopup();
