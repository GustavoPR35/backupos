package service;

import com.google.gson.JsonObject;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;

public class UsuarioService {

	private final UsuarioDAO usuarioDAO;
	
	public UsuarioService() {
		this.usuarioDAO = new UsuarioDAO();
	}
	
	public UsuarioService(UsuarioDAO usuarioDAO) {
		this.usuarioDAO = usuarioDAO;
	}
	
	/*
	 * Cadastrar usuário
	 */
	public Object add(Request request, Response response) {
	    try {
	        String nome = request.queryParams("nome");
	        String email = request.queryParams("login");
	        String senha = request.queryParams("senha");

	        // Validações
	        if (nome == null || nome.isEmpty() || nome.length() > 50 || !nome.matches("^[A-Za-z ]+$")) {
    		    response.status(400);
    		    return "Nome deve ter até 50 caracteres e conter apenas letras e espaços.";
		}

	        String emailRegex = "^[A-Za-z0-9+_.-]+@(.+)$";
		if (email == null || email.isEmpty() || !email.matches(emailRegex)) {
    		    response.status(400);
    		    return "Email inválido.";
		}

	        if (senha == null || senha.isEmpty()) {
	            response.status(400);
	            return "Senha não pode ser vazia.";
	        }

	        Usuario usuario = new Usuario(nome, email, senha);
	        int idGerado = usuarioDAO.insert(usuario); // Insere o usuário e obtém o ID gerado

			// O insert retorna -1 se houver algum erro ao inserir o usuário
	        if (idGerado != -1) {
	            response.status(201); // Status HTTP 201 Created
	            response.redirect("/pages/Login.html");
	            return null;
	        } else {
	            response.status(500); // 500 Internal Server Error
	            return "Erro ao cadastrar o usuário.";
	        }
	    } catch (NumberFormatException e) {
	        response.status(400); // 400 Bad Request
	        return "Código deve ser um número.";
	    } catch (Exception e) {
	        response.status(500); // 500 Internal Server Error
	        return "Erro ao cadastrar o usuário: " + e.getMessage();
	    }
	}
	
	/*
	 * Efetuar login
	 */
	public Object verificarLogin(Request request, Response response) {
		try {
			String email = request.queryParams("login");
			String senhaFornecida = request.queryParams("senha");
			
			System.out.println("Tentando fazer login com email: " + email);
			System.out.println("Senha: " + senhaFornecida);
			
			// Verifica se os parâmetros foram fornecidos
	        if (email == null || email.isEmpty() || senhaFornecida == null || senhaFornecida.isEmpty()) {
	            response.status(400); // Bad Request - parâmetros faltando
	            return criarRespostaJson("Parâmetros de login ou senha faltando.");
	        }
			
			Usuario usuario = usuarioDAO.getByEmail(email);
			
			if (usuario != null) {
				if (usuario.verificarSenha(senhaFornecida)) {
					response.status(200); // OK
					return criarRespostaJsonUsuario("Login bem-sucedido", usuario);
				}
				else {
					response.status(401); // Unauthorized
					return criarRespostaJson("Senha incorreta");
				}
			}
			else {
				response.status(404); // Not Found
				return criarRespostaJson("Usuário incorreto");
			}
		} catch (Exception e) {
			response.status(500);
			return criarRespostaJson("Erro ao efetuar login: " + e.getMessage());
		}
	}

	/*
	 * Método pra dar uma resposta em JSON pra cada caso
	*/
	private String criarRespostaJson(String mensagem) {
        JsonObject json = new JsonObject();
        json.addProperty("mensagem", mensagem);
        return json.toString();
    }

	/*
	 * Método pra quando o login for bem-sucedido
	 */
	private String criarRespostaJsonUsuario(String mensagem, Usuario usuario) {
        JsonObject json = new JsonObject();
        json.addProperty("mensagem", mensagem);
        json.addProperty("id", usuario.getId());
        json.addProperty("nome", usuario.getNome());
        json.addProperty("email", usuario.getEmail());
		json.addProperty("altura", usuario.getAltura());
		json.addProperty("peso", usuario.getPeso());
		json.addProperty("dataNascimento", (usuario.getDataNascimento()).toString());
        return json.toString();
    }
}