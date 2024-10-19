package app;

import service.UsuarioService;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.staticFiles;

public class Aplicacao {
	
	private static final UsuarioService usuarioService = new UsuarioService();
	
	public static void main(String[] args) {
		
		port(4919);
		
		staticFiles.externalLocation("src/main/resources/public");
		
		post("/usuario/cadastro", (request, response) -> usuarioService.add(request, response) );
		
		post("/usuario/login", (request, response) -> usuarioService.verificarLogin(request, response) );
	}
}