package app;

import static spark.Spark.*;

import service.UsuarioService;

public class Aplicacao {
	
	private static UsuarioService usuarioService = new UsuarioService();
	
	public static void main(String[] args) {
		port(4919);
		
		staticFiles.externalLocation("src/main/resources/public");
		
		post("/usuario/cadastro", (request, response) -> usuarioService.add(request, response) );
		
		post("/usuario/login", (request, response) -> usuarioService.verificarLogin(request, response) );
	}
}
