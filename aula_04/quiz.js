document.addEventListener('DOMContentLoaded', async () => {
    let kaijuData = {};

    async function carregarDadosKaijus() {
        try {
            const resposta = await fetch('kaijus.json');
            if (!resposta.ok) {
                throw new Error('Falha ao carregar o banco de dados dos Kaijus.');
            }
            kaijuData = await resposta.json();
            console.log("Banco de dados carregado com sucesso!", kaijuData);
        } catch (erro) {
            console.error(erro);
            alert("Erro ao carregar os dados dos monstros. Verifique se você está rodando um servidor local.");
        }
    }

    await carregarDadosKaijus();

    const questions = [
        {
            text: "Você acorda do seu sagrado sono de titã e descobre que a humanidade construiu uma metrópole gigante bem no meio do seu território favorito. O que você faz?",
            axis: "morality",
            options: [
                { label: "Eu os protejo dos perigos, desde que vivam em harmonia.", value: 1 }, 
                { label: "Eu os ignoro, a menos que me ataquem primeiro.", value: 0 }, 
                { label: "Eu destruo a cidade. Eles são uma praga no meu domínio.", value: -1 } 
            ]
        },
        {
            text: "Um novo Titã Alfa aparece desafiando a hierarquia global. Como você reage?",
            axis: "order",
            options: [
                { label: "Sigo a hierarquia natural, o mais forte será o novo líder.", value: 0.5}, 
                { label: "Luto para restaurar a ordem, evitando que o caos se alastre.", value: 1 }, 
                { label: "Não faço nada, cuido da minha própria vida no meu território isolado.", value: 0 }, 
                { label: "Aproveito a confusão para causar ainda mais destruição e subjugar ambos.", value: -1 } 
            ]
        },
        {
            text: "Durante uma batalha feroz, você fica gravemente ferido. Qual a sua atitude?",
            axis: "morality",
            options: [
                { label: "Recuo para não colocar seres inocentes ao redor em perigo.", value: 1}, 
                { label: "Luto até conseguir uma brecha para escapar e me curar.", value: 0}, 
                { label: "Uso meu poder mais forte e dizimo tudo ao meu redor, inimigos ou não.", value: -1} 
            ]
        },
        {
            text: "Qual é a sua estratégia de combate principal?",
            axis: "order",
            options: [
                { label: "Calculado, fazendo alianças e usando habilidades em conjunto no momento certo,.", value: 1}, 
                { label: "Improvisado, sei do que sou capaz e vou me adaptando aos movimentos do inimigo.", value: 0}, 
                { label: "Fisicamente impiedoso, sei que sou o kaiju mais forte então eventualmente sairei vitorioso.", value: -0.5}, 
                { label: "Ataque frenético e imprevisível, espalhando danos colaterais.", value: -1} 
            ]
        },
        {
            text: "Você acaba de derrotar um Kaiju em uma batalha brutal, mas ele ainda vive. Qual é o seu próximo passo?",
            axis: "morality",
            options: [
                { label: "Poupo sua vida e o ajudo. A hierarquia foi estabelecida e a paz pode retornar.", value: 1 }, // Good
                { label: "Deixo-o caído e volto para o meu descanso, a luta já acabou.", value: 0 }, // Neutral
                { label: "Finalizo-o sem piedade. O mundo precisa saber o que acontece com quem me desafia.", value: -1 } // Evil
            ]
        },
        {
            text: "Como você acha que os humanos devem lhe tratar?",
            axis: "order",
            options: [
                { label: "São criaturas preciosas, assim como qualquer outro ser vivo e merecem ser protegidos.", value: 1}, // Lawful
                { label: "Deixo-os viver, contanto que não me ameacem e me deem algo em troca de vez em quando.", value: 0.5},
                { label: "Humanos?", value: 0},
                { label: "Devem me tratar como um ser superior, fazendo o que eu quero e punindo quando falham.", value: -0.5},
                { label: "São apenas criaturas inferiores, a serem destruídas ou dominadas.", value: -1}
            ]
        }
    ];

    let currentQuestionIndex = 0;
    let scores = { order: 0, morality: 0 };

    const introSection = document.getElementById('intro-section');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const progressText = document.getElementById('progress-text');
    const quizForm = document.getElementById('quiz-form');
    const kaijuNameEl = document.getElementById('kaiju-name');
    const kaijuDescEl = document.getElementById('kaiju-description');
    const kaijuAlignEl = document.getElementById('kaiju-alignment');
    const kaijuHeightEl = document.getElementById('kaiju-height');
    const kaijuAbilityEl = document.getElementById('kaiju-ability');
    const kaijuMovieEl = document.getElementById('kaiju-movie');
    const kaijuImageEl = document.getElementById('kaiju-image');    
    const kaijuWeightEl = document.getElementById('kaiju-weight');
    const kaijuMoviesCountEl = document.getElementById('kaiju-movies-count');
    const detailTrailer = document.getElementById('kaiju-trailer');
    const trailerContainer = document.getElementById('kaiju-trailer-container');

    startBtn.addEventListener('click', () => {
        if (Object.keys(kaijuData).length === 0) {
            alert("Os dados dos Kaijus ainda estão carregando. Tente novamente em um segundo.");
            return;
        }
        introSection.classList.add('hidden');
        quizSection.classList.remove('hidden');
        renderQuestion();
    });

    function renderQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionText.textContent = currentQuestion.text;
        progressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const wrapper = document.createElement('label');
            wrapper.className = 'radio-option';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'kaiju-answer';
            input.value = option.value;
            input.required = true;

            const text = document.createTextNode(` ${option.label}`);

            wrapper.appendChild(input);
            wrapper.appendChild(text);
            optionsContainer.appendChild(wrapper);
        });
    }

    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedOption = document.querySelector('input[name="kaiju-answer"]:checked');
        if (!selectedOption) return;

        const currentQuestion = questions[currentQuestionIndex];
        scores[currentQuestion.axis] += parseInt(selectedOption.value);

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            finishQuiz();
        }
    });

    function finishQuiz() {
        quizSection.classList.add('hidden');
        
        let finalOrder = "Neutral";
        let finalMorality = "Neutral";

        if (scores.order > 0) finalOrder = "Lawful";
        if (scores.order < 0) finalOrder = "Chaotic";

        if (scores.morality > 0) finalMorality = "Good";
        if (scores.morality < 0) finalMorality = "Evil";

        let alignmentKey = `${finalOrder} ${finalMorality}`;
        if (alignmentKey === "Neutral Neutral") alignmentKey = "True Neutral";

        const resultKaiju = kaijuData[alignmentKey];

        if (!resultKaiju) {
            console.error("Kaiju não encontrado para o alinhamento:", alignmentKey);
            return;
        }

        kaijuNameEl.textContent = resultKaiju.nome;
        kaijuAlignEl.textContent = `Alinhamento: ${alignmentKey}`;
        kaijuDescEl.textContent = resultKaiju.descricao;
        kaijuAbilityEl.textContent = resultKaiju.habilidade;
        kaijuMovieEl.textContent = resultKaiju.primeiraAparicao;
        kaijuHeightEl.textContent = resultKaiju.Altura;
        kaijuImageEl.src = resultKaiju.img;
        kaijuImageEl.alt = `Imagem do Kaiju ${resultKaiju.nome}`;
        kaijuWeightEl.textContent = resultKaiju.Peso;
        kaijuMoviesCountEl.textContent = resultKaiju.qtdFilmes;

        if (resultKaiju.trailer && resultKaiju.trailer !== "") {
            detailTrailer.src = resultKaiju.trailer;
            trailerContainer.classList.remove('hidden');
        } else {
            detailTrailer.src = "";
            trailerContainer.classList.add('hidden');
        }

        resultSection.classList.remove('hidden');
    }

    restartBtn.addEventListener('click', () => {
        scores = { order: 0, morality: 0 };
        currentQuestionIndex = 0;
        resultSection.classList.add('hidden');
        introSection.classList.remove('hidden');
    });
});