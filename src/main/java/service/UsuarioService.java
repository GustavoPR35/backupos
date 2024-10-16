package service;

import dao.UsuarioDAO;
import model.Usuario;
import spark.Request;
import spark.Response;

public class UsuarioService {

	private UsuarioDAO usuarioDAO;
	
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
	    int idGerado = -1; // Corrigido para 'idGerado' com letra minúscula
	    try {
	        String nome = request.queryParams("nome");
	        String email = request.queryParams("login");
	        String senha = request.queryParams("senha");

	        // Validações
	        if (nome == null || nome.isEmpty()) {
	            response.status(400);
	            return "Nome não pode ser vazio.";
	        }

	        if (email == null || email.isEmpty()) {
	            response.status(400);
	            return "Email não pode ser vazio.";
	        }

	        if (senha == null || senha.isEmpty()) {
	            response.status(400);
	            return "Senha não pode ser vazia.";
	        }

	        Usuario usuario = new Usuario(nome, email, senha);
	        idGerado = usuarioDAO.insert(usuario); // Insere o usuário e obtém o ID gerado

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
	            return "Parâmetros de login ou senha faltando.";
	        }
			
			Usuario usuario = usuarioDAO.getByEmail(email);
			
			if (usuario != null) {
				if (usuario.verificarSenha(senhaFornecida)) {
					response.status(200); // OK
					response.redirect("/pages/Home.html");
					return null;
				}
				else {
					response.status(401); // Unauthorized
					return "Senha incorreta";
				}
			}
			else {
				response.status(404); // Not Found
				return "Usuário não encontrado";
			}
		} catch (Exception e) {
			response.status(500);
			return "Erro ao efetuar login: " + e.getMessage();
		}
	}

}
