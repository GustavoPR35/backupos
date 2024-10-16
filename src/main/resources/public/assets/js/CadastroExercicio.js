let fichaSelecionada = null;

function deletarExercicio(index, dia) {
    if (fichaSelecionada && fichaSelecionada.exercicios && fichaSelecionada.exercicios[dia]) {
        if (index > -1 && index < fichaSelecionada.exercicios[dia].length) {
            fichaSelecionada.exercicios[dia].splice(index, 1);
            const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
            const indiceFicha = fichas.findIndex(ficha => ficha.nome === fichaSelecionada.nome);
            if (indiceFicha > -1) {
                fichas[indiceFicha] = fichaSelecionada; // Atualiza a ficha no array
                localStorage.setItem('fichas', JSON.stringify(fichas)); // Salva o array completo
                alert("Exercício excluído com sucesso!");
            }
        } else {
            alert("Índice inválido!");
        }
    } else {
        alert("Não há exercícios para este dia!");
    }
    showExercises();
}

function showExercises(){
    if(fichaSelecionada) {
        const campoFicha = document.getElementById('nome-ficha-input');
        const diasSemana = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
        diasSemana.forEach(dia => {
            const divDia = document.getElementById(dia).querySelector('.exercicios-list');
            divDia.innerHTML = "";
            if (fichaSelecionada.exercicios[dia] && fichaSelecionada.exercicios[dia].length > 0) {
                fichaSelecionada.exercicios[dia].forEach((exercicio, index) => {
                    const exercicioItem = document.createElement('div');
                    exercicioItem.setAttribute("id", "div-exercicio");
                    const exercicioNome = document.createElement('span');
                    const exercicioPeso = document.createElement('span');
                    const exercicioReps = document.createElement('span');
                    const exercicioObs = document.createElement('span');
                    const exercicioMusculo = document.createElement('span');
                    const exercicioDelete = document.createElement('span');
                    exercicioNome.innerHTML += exercicio.nome;
                    exercicioPeso.innerHTML += exercicio.peso + "kg";
                    exercicioReps.innerHTML += exercicio.repeticoes;
                    if(exercicio.observacoes)
                        exercicioObs.innerHTML += exercicio.observacoes;
                    else
                        exercicioObs.innerHTML += "Sem observacoes";
                    exercicioMusculo.innerHTML += exercicio.categoria;
                    exercicioDelete.innerHTML += `<i class="fa-solid fa-trash"></i>`;
                    exercicioDelete.classList.add("ficha-delete-btn");
                    exercicioDelete.addEventListener('click', function() {
                        deletarExercicio(index, dia);
                    });
                    exercicioItem.appendChild(exercicioNome);
                    exercicioItem.appendChild(exercicioPeso);
                    exercicioItem.appendChild(exercicioReps);
                    exercicioItem.appendChild(exercicioObs);
                    exercicioItem.appendChild(exercicioMusculo);
                    exercicioItem.appendChild(exercicioDelete);
                    divDia.appendChild(exercicioItem);
                });
            } else {
                const noExerciseText = document.createElement('div');
                noExerciseText.textContent = "Nenhum exercício";
                divDia.appendChild(noExerciseText);
            }
        });
        campoFicha.value = fichaSelecionada.nome;
    } else {
        window.location.href = 'CadastroFicha.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const addExerciseBtns = document.querySelectorAll(".add-exercicio-btn");
    addExerciseBtns.forEach(btn => {
        btn.onclick = function() {
            localStorage.setItem("selectedDay", this.getAttribute("data-dia"));
            window.location.href = 'SelecaoExercicio.html';
        }
    });
});

function carregarFicha(nomeFicha){
    const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    fichaSelecionada = fichas.find(ficha => ficha.nome === nomeFicha);
    if(!fichaSelecionada)
        window.location.href = 'CadastroFicha.html';
    showExercises();
}

carregarFicha(localStorage.getItem('fichaSelecionada'))
document.addEventListener('DOMContentLoaded', showExercises());