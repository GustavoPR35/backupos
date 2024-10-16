const dias = {
    "domingo": 0,
    "segunda": 1,
    "terca": 2,
    "quarta": 3,
    "quinta": 4,
    "sexta": 5,
    "sabado": 6,
    0: "domingo",
    1: "segunda",
    2: "terca",
    3: "quarta",
    4: "quinta",
    5: "sexta",
    6: "sabado"
};

const diasDaSemana = {
    0: "Domingo",
    1: "Segunda-feira",
    2: "Terça-feira",
    3: "Quarta-feira",
    4: "Quinta-feira",
    5: "Sexta-feira",
    6: "Sábado" 
}

function verificarDiasDeTreino(){
    let nomeFicha = localStorage.getItem('fichaSelecionada');
    const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    const fichaSelecionada = fichas.find(ficha => ficha.nome === nomeFicha) || null;
    if(!fichaSelecionada || !fichaSelecionada.exercicios){
        return [];
    }

    const diasComTreino = [];
    for(const dia in fichaSelecionada.exercicios){
        if(fichaSelecionada.exercicios[dia].length > 0){
            diasComTreino.push(dia);
        }
    }
    return diasComTreino;
}

function displayFichaSelecionada() {
    const fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    const divChangeFicha = document.getElementById('changeFicha');
    const botaoAlterarFicha = document.createElement('button');
    const nomeFicha = localStorage.getItem('fichaSelecionada');
    botaoAlterarFicha.innerHTML += `Alterar ficha`;
    botaoAlterarFicha.setAttribute("id", "change-schedule");
    botaoAlterarFicha.onclick = function () {
        window.location.href = 'CadastroFicha.html';
    }
    const nomeDaFichaSelecionada = document.createElement('span');
    if(fichas){
        const fichaSelecionada = fichas.find(ficha => ficha.nome === nomeFicha) || null;
        if(fichaSelecionada){
            nomeDaFichaSelecionada.innerHTML += `Ficha selecionada: ${fichaSelecionada.nome}`;
        }
    } else {
        nomeDaFichaSelecionada.innerHTML += `Nenhuma ficha selecionada.`;
    }
    divChangeFicha.appendChild(nomeDaFichaSelecionada);
    divChangeFicha.appendChild(botaoAlterarFicha);
}

function displayWorkouts() {
    let data = new Date();
    let diaAtual = data.getDay();
    let fichas = JSON.parse(localStorage.getItem('fichas')) || [];
    let nomeFicha = localStorage.getItem('fichaSelecionada');
    fichas = fichas.find(ficha => ficha.nome === nomeFicha) || null;
    const workoutList = document.getElementById('exercises');
    workoutList.innerHTML = ''; 
    if (fichas) {
        const exercicios = fichas.exercicios;
        if(exercicios[dias[diaAtual]].length > 0) {
            exercicios[dias[diaAtual]].forEach(exercicio => {
                //vai ter que bolar um jeito do ? ser clicavel e levar pra pagina do exercicio em questao
                const exerciseItself = document.createElement('span');
                const exerciseInfoButton = document.createElement('span');
                exerciseItself.innerHTML += `${exercicio.nome} | Reps: (${exercicio.reps})<br>Carga: ${exercicio.weight}kg`;
                exerciseInfoButton.innerHTML += `<i class="fa-solid fa-circle-question"></i>`;
                const exercise = document.createElement('div');
                exercise.setAttribute("id", "exercise");
                exercise.appendChild(exerciseItself);
                exercise.appendChild(exerciseInfoButton);
                workoutList.appendChild(exercise);
        })} else {
            const noWorkoutPlaceholder = document.createElement('li');
            noWorkoutPlaceholder.id = "no-workout-placeholder";
            noWorkoutPlaceholder.textContent = "Nenhuma exercício cadastrado para hoje!";
            workoutList.appendChild(noWorkoutPlaceholder);
        }
    }
}

//function displayIMC() {
//    const peso = document.getElementById('user-weight').textContent.trim();
//    const altura = document.getElementById('user-height').textContent.trim();
//
//    const IMCfield = document.getElementById('user-imc');
//    IMCfield.innerHTML = ''; 
//
//    let weight = parseFloat(peso); // em kg
//    let height = parseFloat(altura); // em metros
//
//    if (isNaN(weight) || isNaN(height)) {
//        IMCfield.innerHTML = 'Valores inválidos';
//        return;
//    }
//
//    // Verificar se altura está em metros, por exemplo, 2.05 metros
//    if (height > 3) { // Considera que uma altura válida não pode ser maior que 3 metros
//        IMCfield.innerHTML = 'Altura inválida';
//        return;
//    }
//
//    // Calcular IMC
//    let IMCCalc = weight / (height * height);
//    IMCfield.innerHTML = IMCCalc.toFixed(2);
//}

function displayDayOfWeek(){
    const todayDate = document.getElementById("today-date");
    const dayOfWeek = document.getElementById("day-of-week");
    let data = new Date();
    dayOfWeek.innerHTML = diasDaSemana[data.getDay()];
    todayDate.innerHTML = data.toLocaleDateString("pt-BR");
}

document.addEventListener('DOMContentLoaded', displayWorkouts);
//document.addEventListener('DOMContentLoaded', displayIMC);
document.addEventListener('DOMContentLoaded', displayFichaSelecionada);
document.addEventListener('DOMContentLoaded', displayDayOfWeek);
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('calendarModal');
    const openModalBtn = document.getElementById('calendario-da-silva');
    const closeModal = document.querySelector('.close');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const monthYearDisplay = document.getElementById('monthYear');
    const calendarDates = document.getElementById('calendarDates');
    let currentDate = new Date();
    openModalBtn.onclick = function() {
        modal.style.display = 'block';
        renderCalendar();
    };
    closeModal.onclick = function() {
        modal.style.display = 'none';
    };
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        monthYearDisplay.textContent = `${getMonthName(month)} ${year}`;
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        calendarDates.innerHTML = '';
        const diasDeTreino = verificarDiasDeTreino();
        const hoje = new Date();
        const diaAtual = hoje.getDate();
        const mesAtual = hoje.getMonth();
        const anoAtual = hoje.getFullYear();
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.classList.add("empty-day");
            calendarDates.appendChild(emptyDiv);
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add("day-div");
            dayDiv.textContent = i;
            const dia = new Date(year, month, i);
            const diaSemana = dia.getDay();
            if (i === diaAtual && month === mesAtual && year === anoAtual) {
                dayDiv.classList.add("current-day");
            }
            for (const diaDeTreino of diasDeTreino) {
                if (dias[diaDeTreino] === diaSemana) {
                    dayDiv.classList.add("treino-dia");
                }
            }
            calendarDates.appendChild(dayDiv);
        }
    }
    function getMonthName(monthIndex) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[monthIndex];
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Verifica se os dados do perfil estão armazenados no localStorage
    const perfil = JSON.parse(localStorage.getItem('perfil'));

    if (perfil) {
        // Atualiza o conteúdo da página com os dados do perfil
        document.getElementById('user-name').textContent = perfil.nome;
        document.getElementById('user-weight').textContent = perfil.peso + ' kg';
        document.getElementById('user-height').textContent = perfil.altura + ' m';
        document.getElementById('user-age').textContent = perfil.idade + ' anos';
        document.getElementById('user-imc').textContent = perfil.imc
    }
});