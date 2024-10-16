// Função para capturar os parâmetros da URL
function getURLParams() {
    const params = new URLSearchParams(window.location.search);
    const exercicioIndex = parseInt(params.get('exercicios')); // Índice do exercício
    const divisaoIndex = parseInt(params.get('divisao')); // Índice da divisão
    return { exercicioIndex, divisaoIndex };
}

// Função para carregar os dados do exercício com base nos parâmetros da URL
function carregarExercicio() {
    // Recupera os parâmetros da URL
    const { exercicioIndex, divisaoIndex } = getURLParams();

    // Recupera as divisões e exercícios do localStorage
    let divisoes = JSON.parse(localStorage.getItem('divisoes'));

    // Verifica se os dados estão disponíveis
    if (!divisoes || !divisoes[divisaoIndex] || !divisoes[divisaoIndex][exercicioIndex]) {
        console.error('Dados de exercício não encontrados!');
        return;
    }

    // Pega o nome do exercício a partir dos parâmetros da URL
    let nomeExercicio = divisoes[divisaoIndex][exercicioIndex];

    // Exibe as informações do exercício na página
    document.querySelector('h2').textContent = nomeExercicio;
    document.querySelector('.descricao').textContent = `Este é o exercício ${exercicioIndex} da divisão ${divisaoIndex}.`;
}

function init() {
    carregarExercicio();
}

// Chama a função para carregar os dados quando a página for carregada
window.onload = init;