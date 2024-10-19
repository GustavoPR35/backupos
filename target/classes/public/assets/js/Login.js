async function verificarLogin(event) {
    event.preventDefault(); // Evita o envio do formulário

    const loginForm = document.getElementById('form-login');
    const formData = new FormData(loginForm);
    const loginData = new URLSearchParams(formData);

    try {
        const response = await fetch('/usuario/login', {
            method: 'POST',
            body: loginData
        });
        
        if (response.ok) {
            const usuario = await response.json();
            armazenarUsuarioLogado(usuario);
            window.location.href = '/pages/Home.html';
        } else {
            const result = await response.json();
            document.getElementById('mensagem-aviso').innerText = result.mensagem;
        }
    } catch (error) {
        document.getElementById('mensagem-aviso').innerText = 'Erro ao efetuar login: ' + error.message;
    }
}

function armazenarUsuarioLogado(usuario) {
    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
}