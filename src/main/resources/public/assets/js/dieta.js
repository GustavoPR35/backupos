document.addEventListener('DOMContentLoaded', function () {
    function loadSavedData() {
        const dietaId = getParameterByName('id-dieta');
        const dieta = getDietaById(dietaId);

        if (dieta) {
            document.getElementById('carbs-value').innerText = dieta.carboidratos + ' g';
            document.getElementById('proteins-value').innerText = dieta.proteinas + ' g';
            document.getElementById('fats-value').innerText = dieta.gordura + ' g';
        }
        updateTotalCalories();
    }

    function enableEdit(macroId) {
        document.getElementById(macroId + '-value').style.display = 'none';
        document.getElementById(macroId + '-input').style.display = 'block';
        document.getElementById(macroId + '-save').style.display = 'block';
        document.getElementById(macroId + '-input').value = ''; 
    }

    function saveEdit(macroId) {
        const newValue = document.getElementById(macroId + '-input').value;
        if (newValue !== '') {
            document.getElementById(macroId + '-value').innerText = newValue + ' g';

            // Atualizar valor no objeto de dieta e no localStorage
            updateDietaMacros(macroId, newValue); 
        }
        document.getElementById(macroId + '-value').style.display = 'block';
        document.getElementById(macroId + '-input').style.display = 'none';
        document.getElementById(macroId + '-save').style.display = 'none';

        updateTotalCalories();
    }

    function updateDietaMacros(macroId, value) {
        const dietaId = getParameterByName('id-dieta');
        let dietas = JSON.parse(localStorage.getItem('dietas')) || [];
        const dietaIndex = dietas.findIndex(dieta => dieta.id == dietaId);

        if (dietaIndex !== -1) {
            if (macroId === 'carbs') {
                dietas[dietaIndex].carboidratos = parseFloat(value);
            } else if (macroId === 'proteins') {
                dietas[dietaIndex].proteinas = parseFloat(value);
            } else if (macroId === 'fats') {
                dietas[dietaIndex].gordura = parseFloat(value);
            }

            // Atualizar o localStorage
            localStorage.setItem('dietas', JSON.stringify(dietas));
        }
    }

    function updateTotalCalories() {
        const dietaId = getParameterByName('id-dieta');
        const dieta = getDietaById(dietaId);

        if (dieta) {
            const totalCalories = (dieta.carboidratos * 4) + (dieta.proteinas * 4) + (dieta.gordura * 9);
            document.querySelector('.total-calories span').innerText = totalCalories + ' kcal';
        }
    }

    document.querySelectorAll('.edit-icon').forEach(function (icon) {
        icon.addEventListener('click', function () {
            const macroId = this.parentElement.parentElement.id;
            enableEdit(macroId);
        });
    });

    document.querySelectorAll('.save-button').forEach(function (button) {
        button.addEventListener('click', function () {
            const macroId = this.parentElement.id;
            saveEdit(macroId);
        });
    });

    loadSavedData();

    // Função para obter o parâmetro da URL
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Função para recuperar a dieta do localStorage
    function getDietaById(id) {
        const dietas = JSON.parse(localStorage.getItem('dietas')) || [];
        return dietas.find(dieta => dieta.id == id); 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Função para obter o parâmetro da URL
    function getParameterByName(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Obter o ID da dieta da URL
    const dietaId = getParameterByName('id-dieta');
    
    // Recuperar a dieta do localStorage
    function getDietaById(id) {
        const dietas = JSON.parse(localStorage.getItem('dietas')) || [];
        return dietas.find(dieta => dieta.id == id);  // Encontrar dieta com o ID correspondente
    }

    // Função para atualizar o nome da dieta no título
    function updateDietaInfo() {
        const dieta = getDietaById(dietaId);
        
        if (dieta) {
            document.querySelector('h1').textContent = dieta.nome;  // Atualiza o título da dieta
        } else {
            document.querySelector('h1').textContent = "Dieta não encontrada";
        }
    }

    // Função para exibir o dia da semana atual
    function updateDayOfWeek() {
        const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const currentDate = new Date();
        const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
        
        document.querySelector('.date-picker p').textContent = currentDayOfWeek;
    }

    // Executar as funções para atualizar a página
    updateDietaInfo();
    updateDayOfWeek();
});
