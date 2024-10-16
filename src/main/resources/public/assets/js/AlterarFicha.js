function criarListaDeFichas() {
    let fichas = [];
    localStorage.setItem('fichas', JSON.stringify(fichas));
    listarFichas();
}

function criarFicha() {
    let fichas = JSON.parse(localStorage.getItem('fichas')) || [];

    var codFicha;
    if (fichas.length > 0) {
        codFicha = parseInt(fichas[fichas.length-1].id) + 1;
    }
    else {
        codFicha = 0;
    }
    let nomeFicha = document.getElementById("tst-nome-ficha").value.trim();

    let ficha = {
        "id": codFicha,
        "nome": nomeFicha
    }

    fichas.push(ficha);
    for(let i = 0; i < fichas.length; i++) {
        console.log(fichas[i]);
    }
    localStorage.setItem('fichas', JSON.stringify(fichas));
    listarFichas();
}

function listarFichas() {
    //Pegar o array de fichas do localStorage
    let fichas = JSON.parse(localStorage.getItem('fichas')) || [];

    //Pegar o div que vai ter as fichas
    //getElementsByClassName retorna uma coleção de elementos, por isso é preciso acessar na posição 0.
    let fichaContainer = document.getElementsByClassName("lista-fichas")[0];

    //Pegar os botões
    let btnConfirmar = document.getElementById("btn-confirmar");
    let btnEditarFicha = document.getElementById("btn-editar-ficha");

    //Se não houver nenhuma ficha cadastrada
    if (fichas.length == 0) {
        //Limpar a div antes
        fichaContainer.innerHTML = '';
        let p = document.createElement('p');
        p.innerHTML = "Você não possui nenhuma ficha.";
        fichaContainer.appendChild(p);

        btnConfirmar.disabled = true;
        btnEditarFicha.disabled = true;
    }
    else {
        //Limpar a div antes de colocar as fichas
        fichaContainer.innerHTML = '';
    
        //Loop pra adicionar um label com tags input e span no container de acordo com a ficha atual no array
        fichas.forEach((ficha) => {
            let label = document.createElement('label');
            label.classList.add('ficha');
            label.setAttribute('for', ficha.id);
    
            let input = document.createElement('input');
            input.type = 'radio';
            input.id = ficha.id;
            input.name = 'id-ficha';
            input.value = ficha.id;
    
            let span = document.createElement('span');
            span.innerText = ficha.nome;
    
            //Append do input e do span no label
            label.appendChild(input);
            label.appendChild(span);
    
            //Append do label no container de fichas
            fichaContainer.appendChild(label);
        });

        // Ativar os botões quando houver fichas
        btnConfirmar.disabled = false;
        btnEditarFicha.disabled = false;
    }
}

// Função para habilitar/desabilitar o botão com base nos radios selecionados
function toggleButtonState() {
    const radios = document.querySelectorAll('input[name="id-ficha"]');
    const confirmButton = document.getElementById('btn-confirmar');
    const editButton = document.getElementById('btn-editar-ficha')
    
    // Verifica se algum radio está selecionado
    const isChecked = Array.from(radios).some(radio => radio.checked);
    
    // Habilita o botão se um radio for selecionado
    confirmButton.disabled = !isChecked;
    editButton.disabled = !isChecked;
}

function init() {
    listarFichas();

    // Garantir que os botões estejam desabilitados quando carregar a página
    toggleButtonState();

    // Adiciona um event listener a todos os radios
    const radios = document.querySelectorAll('input[name="id-ficha"]');
    radios.forEach(radio => {
        radio.addEventListener('change', toggleButtonState);
    });
}

window.onload = init;
