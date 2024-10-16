let fichaSelecionada = null;
let diaSelecionado = null;

function adicionarExerciciosFicha(exerciciosSelecionados) {
    // Busca a lista de fichas no localStorage
    let fichas = JSON.parse(localStorage.getItem('fichas')) || [];

    // Busca qual ficha está sendo modificada (fichaSelecionada) e o dia (selectedDay)
    let fichaSelecionada = localStorage.getItem('fichaSelecionada');
    let selectedDay = localStorage.getItem('selectedDay');

    // Encontra a ficha correta na lista de fichas
    let ficha = fichas.find(f => f.nome === fichaSelecionada);

    if (ficha) {
        // Verifica se a ficha já tem exercícios para o dia selecionado
        if (!ficha.exercicios[selectedDay]) {
            // Se não existir, cria um array vazio para o dia
            ficha.exercicios[selectedDay] = [];
        }

        // Adiciona os exercícios selecionados ao dia correspondente
        let exerciciosComNome = exerciciosSelecionados.map((valor, index) => {
            return {
                nome: `Exercício ${parseInt(valor) + 1}`,  // Exemplo: 'Exercício 1', 'Exercício 2', etc.
            };
        });
        ficha.exercicios[selectedDay] = ficha.exercicios[selectedDay].concat(exerciciosComNome);

        // Salva as alterações de volta no localStorage
        localStorage.setItem('fichas', JSON.stringify(fichas));

        // Exibe uma mensagem de sucesso
        alert('Exercícios adicionados!');
        window.location.href = 'CadastroExercicio.html';
    } else {
        alert('Ficha não encontrada!');
    }
}

// Função para capturar os exercícios selecionados e salvar
document.getElementById('form-exercicios').addEventListener('submit', function(event) {
    // Prevenir o comportamento padrão do formulário
    event.preventDefault();

    // Captura todos os checkboxes de exercícios marcados
    let checkboxes = document.querySelectorAll('input[name="exercicios"]:checked');

    // Cria um array com os valores dos exercícios selecionados
    let exerciciosSelecionados = [];
    checkboxes.forEach(function(checkbox) {
        exerciciosSelecionados.push(checkbox.value);
    });

    // Chama a função para adicionar os exercícios à ficha e dia selecionados
    adicionarExerciciosFicha(exerciciosSelecionados);
});

function toggleButtonState() {
    const checkboxes = document.querySelectorAll('input[name="exercicios"]');
    const confirmButton = document.getElementById('btn-confirmar');
    
    // Verifica se algum checkbox está selecionado
    const isChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);
    
    // Habilita o botão se pelo menos um checkbox for selecionado
    confirmButton.disabled = !isChecked;
}

window.onload = function() {
    const form = document.querySelector('form');
    
    // Modifica o action do formulário para incluir a divisão
    // Adiciona um input hidden para armazenar o valor da divisao
    const hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = 'divisao';
    form.appendChild(hiddenInput);  // Adiciona o input ao formulário
    
    // Chama a função para carregar a lista de exercícios

    // Garantir que os botões estejam desabilitados quando carregar a página
    toggleButtonState(); // Garante que o botão esteja desabilitado no início

    // Adiciona um event listener a todos os checkboxes
    const checkboxes = document.querySelectorAll('input[name="exercicios"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', toggleButtonState);
    });
};

function carregarFicha(nomeFicha){
    const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    fichaSelecionada = fichas.find(ficha => ficha.nome === nomeFicha);
    if(!fichaSelecionada)
        window.location.href = 'CadastroFicha.html';
    diaSelecionado = localStorage.getItem('selectedDay');
}

carregarFicha(localStorage.getItem('fichaSelecionada'))