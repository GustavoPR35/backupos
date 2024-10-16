// Função para capturar parâmetros da URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function carregarListaExercicios() {
    // Pega o array com as divisões
    let divisoes = JSON.parse(localStorage.getItem('divisoes')) || [];

    const divisao = getQueryParam('divisao'); // Pegar o valor da divisão na url
    const containerExercicios = document.querySelector('.exercicios'); // querySelector pega o primeiro elemento do que for especificado

    let auxDivisao = parseInt(divisao); // Número da divisão para acessar o array de divisões

    // Verifica se a divisão é válida
    if (auxDivisao >= 0 && auxDivisao < divisoes.length) {
        // Limpa o container de exercícios antes de adicionar novos
        containerExercicios.innerHTML = '';

        // Itera sobre os exercícios da divisão selecionada
        divisoes[auxDivisao].forEach((exercicio, index) => {
            // Cria um elemento de label para cada exercício
            const label = document.createElement('label');
            label.classList.add('exercicio');

            // Cria um input de checkbox para o exercício
            const input = document.createElement('input');
            input.type = 'checkbox';
            input.name = 'exercicios'; // Mesma chave para todos os checkboxes
            input.value = index; // Define o valor como o índice do exercício

            // Cria um span para o nome do exercício
            const span = document.createElement('span');
            span.textContent = exercicio;

            // Adiciona o input e o span ao label
            label.appendChild(input);
            label.appendChild(span);

            // Adiciona o label ao container de exercícios
            containerExercicios.appendChild(label);
        });
    } else {
        console.error('Divisão inválida:', divisao);
        // Aqui você pode adicionar um tratamento de erro, se necessário
    }
}

// Função para habilitar/desabilitar o botão com base nos checkboxes selecionados
function toggleButtonState() {
    const checkboxes = document.querySelectorAll('input[name="exercicios"]');
    const confirmButton = document.getElementById('btn-confirmar');
    
    // Verifica se algum checkbox está selecionado
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    // Habilita o botão se pelo menos um checkbox for selecionado
    confirmButton.disabled = !isChecked;
}

// Define o action do formulário ao carregar a página
window.onload = function() {
    const divisao = getQueryParam('divisao');  // Captura o valor da divisao
    const form = document.querySelector('form');
    
    // Modifica o action do formulário para incluir a divisão
    form.action = `InfoExercicio.html?divisao=${divisao}`;

    // Adiciona um input hidden para armazenar o valor da divisao
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'divisao';
    hiddenInput.value = divisao;
    form.appendChild(hiddenInput);  // Adiciona o input ao formulário
    
    // Chama a função para carregar a lista de exercícios
    carregarListaExercicios();

    // Garantir que os botões estejam desabilitados quando carregar a página
    toggleButtonState(); // Garante que o botão esteja desabilitado no início

    // Adiciona um event listener a todos os checkboxes
    const checkboxes = document.querySelectorAll('input[name="exercicios"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', toggleButtonState);
    });
};