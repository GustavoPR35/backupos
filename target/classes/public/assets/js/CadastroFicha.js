function deletarFicha(index) {
    let fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    if(index > -1) {
        fichas.splice(index, 1);
        localStorage.setItem('fichas', JSON.stringify(fichas));
        displayFichas();
        alert("Ficha excluida com sucesso!");
    }
}

function displayFichas() {
    const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    const fichasList = document.getElementById('created-fichas');
    fichasList.innerHTML = ''; 
    if (fichas.length > 0) {
        fichas.forEach((ficha, index) => {
                const nomeFicha = document.createElement('span');
                const fichaButtons = document.createElement('span');
                nomeFicha.innerHTML += `${ficha.nome}`;
                nomeFicha.classList.add("nome-da-ficha");
                fichaButtons.classList.add("ficha-buttons");
                const fichaDiv = document.createElement('div');
                fichaDiv.setAttribute("id", "loaded-ficha");
                fichaDiv.addEventListener('click', function() {
                    localStorage.setItem('fichaSelecionada', `${ficha.nome}`);
                    window.location.href = 'CadastroExercicio.html';
                })
                fichaDiv.appendChild(nomeFicha);
                fichaDiv.appendChild(fichaButtons)
                fichasList.appendChild(fichaDiv);
        });
    } else {
        const noFichasPlaceholder = document.createElement('span');
        noFichasPlaceholder.id = "sem-fichas";
        noFichasPlaceholder.textContent = "Nenhuma ficha cadastrada no sistema.";
        fichasList.appendChild(noFichasPlaceholder);
    }
}

document.getElementById('workout-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const workoutName = document.getElementById('workout-name').value;
    if (workoutName) {
        let fichas = JSON.parse(localStorage.getItem('fichas')) || []; 
        const newWorkout = {
            nome: workoutName,
            exercicios: {
                "segunda": [],
                "terca": [],
                "quarta": [],
                "quinta": [],
                "sexta": [],
                "sabado": [],
                "domingo": []
            }
        };
        fichas.push(newWorkout); 
        localStorage.setItem('fichas', JSON.stringify(fichas));
        document.getElementById('workout-form').reset();
        exercises = [];
        alert("Ficha salva com sucesso!");
    } else {
        alert("Por favor, preencha todos os campos e adicione pelo menos 2 exercícios.");
    }
    displayFichas();
});

document.addEventListener('DOMContentLoaded', displayFichas);