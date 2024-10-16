// Função para habilitar/desabilitar o botão com base no input do nome da dieta
function toggleButtonState() {
    const nomeDietaInput = document.getElementById('tst-nome-dieta');
    const viewButton = document.getElementById('btn-tst-criar-dietas');
    
    // Verifica se o campo de entrada está vazio
    const isInputValid = nomeDietaInput.value.trim() !== '';
    
    // Habilita o botão se o input for válido
    viewButton.disabled = !isInputValid;
}

// Função para criar uma dieta
function criarDieta() {
    // Pegar o array de dietas
    let dietas = JSON.parse(localStorage.getItem('dietas')) || [];
    
    let codDieta;
    if (dietas.length > 0) {
        codDieta = parseInt(dietas[dietas.length-1].id) + 1;
    } else {
        codDieta = 0;
    }

    let nomeDieta = document.getElementById('tst-nome-dieta').value.trim();

    if (nomeDieta === '') {
        let botao = document.getElementById('btn-tst-criar-dietas');
        botao.innerHTML = "Insira um nome!";
        return; // Sai da função se o nome estiver vazio
    }

    // Formatar a data
    let data = new Date();
    let dataFormatada = data.toISOString().split('T')[0]; // Formatar data para 'YYYY-MM-DD'

    // Criar objeto da dieta
    let dieta = {
        "id": codDieta,
        "nome": nomeDieta,
        "objetivo": "",
        "data_criacao": dataFormatada,
        "carboidratos": 0,
        "proteinas": 0,
        "gordura": 0
    };

    // Adicionar a dieta ao array e atualizar o localStorage
    dietas.push(dieta);
    localStorage.setItem('dietas', JSON.stringify(dietas));
    listarDietas();

    // Fechar o modal após a criação da dieta
    const modal = document.getElementById('container-criar-dieta');
    modal.style.display = 'none'; // Oculta o modal
}

// Função para listar as dietas
function listarDietas() {
    let dietas = JSON.parse(localStorage.getItem('dietas')) || [];
    let dietasContainer = document.getElementsByClassName('lista-dietas')[0];
    let btnVisualizar = document.getElementById("btn-visualizar-dieta");

    // Se não houver dietas
    if (dietas.length == 0) {
        dietasContainer.innerHTML = '<p>Você não possui nenhuma dieta.</p>';
        btnVisualizar.disabled = true;
        return;
    }

    // Limpar o container antes de adicionar novas dietas
    dietasContainer.innerHTML = '';
    
    // Adicionar cada dieta ao container
    dietas.forEach((dieta) => {
        let label = document.createElement('label');
        label.classList.add('dieta');
        label.setAttribute('for', dieta.id);
    
        let input = document.createElement('input');
        input.type = 'radio';
        input.id = dieta.id;
        input.name = 'id-dieta';
        input.value = dieta.id;
    
        let span = document.createElement('span');
        span.innerText = dieta.nome;

        // Append do input e do span no label
        label.appendChild(input);
        label.appendChild(span);
        dietasContainer.appendChild(label);
    });

    // Habilitar o botão visualizar se houver dietas
    btnVisualizar.disabled = false;

    // Aqui, adiciona o evento ao botão de visualizar
    document.getElementById("btn-visualizar-dieta").onclick = function(event) {
        event.preventDefault(); // Evitar o envio do formulário padrão

        // Obter a dieta selecionada
        const selectedDiet = document.querySelector('input[name="id-dieta"]:checked');

        if (selectedDiet) {
            const dietaId = selectedDiet.value; // Obter o ID da dieta
            // Redirecionar para a nova página com o ID na URL
            window.location.href = `Dieta.html?id-dieta=${dietaId}`;
        } else {
            alert("Por favor, selecione uma dieta."); // Avisar se nenhuma dieta foi selecionada
        }
    };
}

// Adicionar listeners ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('container-criar-dieta');
    const openModalBtn = document.getElementById('btn-abrir-criacao');
    const closeModal = document.getElementById('fechar-criacao');
    
    // Abrir o modal
    openModalBtn.onclick = function() {
        modal.style.display = 'flex'; // Torna o modal visível
        document.getElementById('btn-tst-criar-dietas').innerHTML = 'Confirmar'; // Resetar texto do botão
    };

    // Fechar o modal ao clicar no 'x'
    closeModal.onclick = function() {
        modal.style.display = 'none'; // Oculta o modal
    };

    // Fechar o modal ao clicar fora dele
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Oculta o modal
        }
    };

    // Adicionar listener ao input para habilitar/desabilitar o botão
    const nomeDietaInput = document.getElementById('tst-nome-dieta');
    nomeDietaInput.addEventListener('input', toggleButtonState);
});

// Inicializar o app
function init() {
    listarDietas();
    toggleButtonState(); // Habilitar/desabilitar botão ao carregar
    // Adicionar event listener para os radios
    const radios = document.querySelectorAll('input[name="id-dieta"]');
    radios.forEach(radio => {
        radio.addEventListener('change', toggleButtonState);
    });
}

window.onload = init;
