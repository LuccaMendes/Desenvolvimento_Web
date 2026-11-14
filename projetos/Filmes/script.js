document.addEventListener("DOMContentLoaded", renderizarCards);

const filmesTerror = [
    {
        id: 1,
        titulo: "Sexta-Feira 13",
        descricao: "Um grupo de jovens acampadores é perseguido por um assassino misterioso no acampamento Crystal Lake.",
        ano: 1980,
        diretor: "Sean S. Cunningham",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjSnA7a6mdPSlH5JVFNdUm9nvMynpmgfzdZFD5ufLWCQ&s=10"
    },
    {
        id: 2,
        titulo: "O Iluminado",
        descricao: "Um escritor e sua família ficam isolados em um hotel assombrado durante o inverno.",
        ano: 1980,
        diretor: "Stanley Kubrick",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNnu0YPj_QwtHc4etDSMTijhmdTa_yhOEbnN8N90Pd1Q&s=10"
    },
    {
        id: 3,
        titulo: "A Hora do Pesadelo",
        descricao: "Um espírito maligno chamado Freddy Krueger aterroriza adolescentes em seus sonhos.",
        ano: 1984,
        diretor: "Wes Craven",
        imagem: "https://aventurasnahistoria.com.br/wp-content/uploads/2024/03/a-hora-do-pesadelo-1984.jpg"
    },
    {
        id: 4,
        titulo: "O Exorcista",
        descricao: "Uma mãe desesperada busca a ajuda de dois padres para salvar sua filha possuída.",
        ano: 1973,
        diretor: "William Friedkin",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNG0GpsbZHvLgl872jgymWWUHKHUiDzLwvSfL8ZYw7eqxeAzBbcjEwG8DO&s=10"
    },
    {
        id: 5,
        titulo: "Halloween",
        descricao: "Na noite de Halloween, um assassino mascarado escapa de um manicômio e retorna à sua cidade.",
        ano: 1978,
        diretor: "John Carpenter",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKtLdkQHS8edIfBzyECweeFZAQ6-myMfn6eT3OujODHQ&s=10"
    },
    {
        id: 6,
        titulo: "O Chamado",
        descricao: "Quem assistir a uma fita de vídeo amaldiçoada receberá um telefonema avisando que morrerá em sete dias.",
        ano: 2002,
        diretor: "Gore Verbinski",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ36XxKFJyflPhaPy9h8p-E6-9nBM1NAqgLetAHZvu1Sw&s=10"
    }
];

function renderizarCards() {
    const container = document.querySelector("main .card");

    if (!container) return;

    container.replaceChildren();

    filmesTerror.forEach(filme => {
        const card = document.createElement("article");
        card.className = "filme";

        const imagem = document.createElement("img");
        imagem.src = filme.imagem;
        imagem.alt = `Pôster de ${filme.titulo}`;

        const titulo = document.createElement("h2");
        titulo.textContent = filme.titulo;

        const descricao = document.createElement("p");
        descricao.className = "descricao";
        descricao.textContent = filme.descricao;

        const detalhes = document.createElement("p");
        detalhes.className = "detalhes";
        detalhes.textContent = `${filme.ano} • Direção: ${filme.diretor}`;

        const botao = document.createElement("button");
        botao.type = "button";
        botao.textContent = "Assistir";

        card.append(imagem, titulo, detalhes, descricao, botao);
        container.append(card);
    });
}
