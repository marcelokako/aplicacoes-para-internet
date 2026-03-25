document.addEventListener('DOMContentLoaded', async () => {
    const gridContainer = document.getElementById('kaiju-grid');
    const listSection = document.getElementById('kaiju-list-section');
    const detailSection = document.getElementById('kaiju-detail-section');
    const backBtn = document.getElementById('back-btn');

    // Elementos de detalhe
    const detailName = document.getElementById('detail-name');
    const detailImage = document.getElementById('detail-image');
    const detailAlignment = document.getElementById('detail-alignment');
    const detailHeight = document.getElementById('detail-height');
    const detailWeight = document.getElementById('detail-weight');
    const detailAbility = document.getElementById('detail-ability');
    const detailMovie = document.getElementById('detail-movie');
    const detailMoviesCount = document.getElementById('detail-movies-count');
    const detailDescription = document.getElementById('detail-description');
    const detailTrailer = document.getElementById('detail-trailer');
    const trailerContainer = document.getElementById('trailer-container');

    try {
        const response = await fetch('../kaijus.json');
        if (!response.ok) throw new Error('Falha ao carregar JSON');
        const kaijuData = await response.json();

        for (const alignment in kaijuData) {
            const kaiju = kaijuData[alignment];
            
            const card = document.createElement('div');
            card.className = 'kaiju-card-mini';
            card.setAttribute('tabindex', '0');
            
            card.innerHTML = `
                <img src="../${kaiju.img}" alt="${kaiju.nome}">
                <h3>${kaiju.nome}</h3>
            `;

            card.addEventListener('click', () => mostrarDetalhes(kaiju, alignment));
            card.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') mostrarDetalhes(kaiju, alignment);
            });

            gridContainer.appendChild(card);
        }

    } catch (error) {
        console.error(error);
        gridContainer.innerHTML = '<p>Erro ao carregar os dados da Monarch. Verifique a conexão do servidor local.</p>';
    }

    function mostrarDetalhes(kaiju, alignment) {
        detailName.textContent = kaiju.nome;
        detailImage.src = `../${kaiju.img}`; 
        detailImage.alt = `Imagem de ${kaiju.nome}`;
        detailAlignment.textContent = `Alinhamento: ${alignment}`;
        detailHeight.textContent = kaiju.Altura;
        detailWeight.textContent = kaiju.Peso;
        detailAbility.textContent = kaiju.habilidade;
        detailMovie.textContent = kaiju.primeiraAparicao;
        detailMoviesCount.textContent = kaiju.qtdFilmes;
        detailDescription.textContent = kaiju.descricao;

        if (kaiju.trailer && kaiju.trailer !== "") {
            detailTrailer.src = kaiju.trailer;
            trailerContainer.classList.remove('hidden');
        } else {
            detailTrailer.src = "";
            trailerContainer.classList.add('hidden');
        }

        listSection.classList.add('hidden');
        detailSection.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    backBtn.addEventListener('click', () => {
        detailSection.classList.add('hidden');
        listSection.classList.remove('hidden');
        detailTrailer.src = "";
    });
});