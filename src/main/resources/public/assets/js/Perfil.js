document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-cadastro').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Pega os valores do formulário
        const nome = document.getElementById('nome-cadastro').value;
        const peso = document.getElementById('peso-cadastro').value;
        const altura = document.getElementById('altura-cadastro').value;
        const idade = document.getElementById('idade-cadastro').value;

        // Cria um objeto com os dados do perfil
        const perfil = {
            nome: nome,
            peso: peso,
            altura: altura,
            idade: idade,
            imc: (peso/(altura*altura)).toFixed(2)
        };

        // Salva os dados do perfil no localStorage
        localStorage.setItem('perfil', JSON.stringify(perfil));

        // Redireciona para a página Home.html (ou outra página desejada)
        window.location.href = 'Home.html';
    });
});
