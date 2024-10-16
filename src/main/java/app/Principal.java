package app;
import java.util.List;
import java.util.Scanner;
import dao.UsuarioDAO;
import model.Usuario;

public class Principal {
	
	private static UsuarioDAO usuarioDAO = new UsuarioDAO();
	private static Scanner sc = new Scanner(System.in);
	
	public static void main(String[] args) {
		String input = "0";
		
		while(!input.equals("9")) {
			System.out.println("1. Inserir usuário");
			System.out.println("2. Buscar usuário");
			System.out.println("3. Modificar usuário");
			System.out.println("4. Remover usuário");
			System.out.println("5. Listar usuários");
			System.out.println("9. Sair");
			
			input = sc.nextLine();
			
			try {
			    int opcao = Integer.parseInt(input);
			    
			    switch (opcao) {
			        case 1:
			            inserir();
			            break;
			        case 2:
			            get();
			            break;
			        case 3:
			            update();
			            break;
			        case 4:
			        	remove();
			        	break;
			        case 5:
			        	listar();
			        	break;
			        case 9:
			        	System.out.println("Saindo...");
			        	break;
			        default:
			            System.out.println("Opção inválida. Tente novamente.");
			            break;
			    	}
			} catch (NumberFormatException e) {
			    System.out.println("Por favor, insira um número válido.");
			}
		}
		sc.close();
	}
	
	public static void inserir() {
		System.out.println("Nome: ");
		String nome = sc.nextLine();
		System.out.println("Email: ");
		String email = sc.nextLine();
		System.out.println("Senha: ");
		String senha = sc.nextLine();
		
		Usuario user = new Usuario(nome, email, senha);
		
		int idGerado = usuarioDAO.insert(user);
		
		System.out.println("Usuário inserido com sucesso! Id: " + idGerado);
	}
	
	public static void get() {
		String input = "";
		while(true) {
			System.out.println("Informe um id para procurar, ou digite FIM para encerrar: ");
			input = sc.nextLine();
			if (input.equals("FIM")) {
				break;
			}
			try {
				int id = Integer.parseInt(input);
				Usuario userBusca = usuarioDAO.get(id);
				
				if (userBusca != null) {
				    userBusca.imprimir();
				}
				else {
				    System.out.println("Usuário não encontrado.");
				}
			}
			catch (NumberFormatException e) {
				System.out.println("Por favor, insira um número válido.");
			}
		}
	}
	
	public static boolean update() {
		boolean status = false;
		System.out.println("Id: ");
		try {			
			int id = Integer.parseInt(sc.nextLine());
			Usuario userBusca = usuarioDAO.get(id);
			
			if (userBusca != null) {
				System.out.println("Usuário encontrado: " + userBusca.getNome());
				try {
					System.out.println("Nome: ");
					String nome = sc.nextLine();
					System.out.println("Email: ");
					String email = sc.nextLine();
					System.out.println("Senha: ");
					String senha = sc.nextLine();
					System.out.println("Idade: ");
					int idade = Integer.parseInt(sc.nextLine());
					System.out.println("Altura: ");
					double altura = Double.parseDouble(sc.nextLine());
					System.out.println("Peso: ");
					double peso = Double.parseDouble(sc.nextLine());
					
					userBusca = new Usuario(id, nome, email, senha, idade, altura, peso);
					status = usuarioDAO.update(userBusca);
					
					if (status) {
						System.out.println("Informações atualizadas.");
					}
					
				} catch (NumberFormatException e) {
					System.out.println("Valores numéricos inválidos.");
				}
			}
			else {
				System.out.println("Usuário não encontrado.");
			}
			
		} catch (NumberFormatException e) {
			System.out.println("Por favor, insira um id válido.");
		}
		return status;
	}
	
	public static boolean remove() {
		boolean status = false;
		System.out.println("Id: ");
		try {			
			int id = Integer.parseInt(sc.nextLine());
			Usuario userBusca = usuarioDAO.get(id);
			if (userBusca != null) {
				System.out.println("Você tem certeza que deseja remover o usuário " + userBusca.getNome() + "? (s/n)");
	            String confirmacao = sc.nextLine();
	            
	            if (confirmacao.equalsIgnoreCase("s")) {
	                status = usuarioDAO.remove(id);
	                if (status) {
	                    System.out.println("Usuário removido com sucesso.");
	                } else {
	                    System.out.println("Erro ao remover usuário.");
	                }
	            } else {
	                System.out.println("Remoção cancelada.");
	            }
			}
			else {
				System.out.println("Usuário não encontrado.");
			}
		} catch (NumberFormatException e) {
			System.out.println("Por favor, insira um id válido.");
		}
		return status;
	}
	
	public static void listar() {
		List<Usuario> usuarios = usuarioDAO.listar();
		if (usuarios.isEmpty()) {
			System.out.println("Nenhum usuário cadastrado.");
			return;
		}
		for (Usuario u : usuarios) {
			u.imprimir();
		}
	}
}
