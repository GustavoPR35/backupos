package app;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Scanner;

import dao.UsuarioDAO;
import model.Usuario;

public class Principal {
	
	private static final Scanner sc = new Scanner(System.in);
	
	public static void main(String[] args) {

		try (UsuarioDAO usuarioDAO = new UsuarioDAO()) {
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
							inserir(usuarioDAO);
							break;
						case 2:
							get(usuarioDAO);
							break;
						case 3:
							update(usuarioDAO);
							break;
						case 4:
							remove(usuarioDAO);
							break;
						case 5:
							listar(usuarioDAO);
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
        } catch (Exception e) {
			System.err.println("Erro: " + e.getMessage());
        }
		
		sc.close();
	}
	
	public static void inserir(UsuarioDAO usuarioDAO) {
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
	
	public static void get(UsuarioDAO usuarioDAO) {
		String input;
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
	
	public static boolean update(UsuarioDAO usuarioDAO) throws ParseException {
		boolean status = false;
		System.out.println("Id: ");
		try {			
			int id = Integer.parseInt(sc.nextLine());
			Usuario userBusca = usuarioDAO.get(id);
			
			if (userBusca != null) {
				System.out.println("Usuário encontrado: " + userBusca.getNome());
				try {
					System.out.println("Nome [" + userBusca.getNome() + "]: ");
                    String nome = sc.nextLine();
                    if (nome.isEmpty()) {
                        nome = userBusca.getNome();
						System.out.println("Nome mantido.");
                    }
					System.out.println("Email [" + userBusca.getEmail() + "]: ");
                    String email = sc.nextLine();
                    if (email.isEmpty()) {
                        email = userBusca.getEmail();
						System.out.println("Email mantido.");
                    }
					System.out.println("Senha [********]: ");
                    String senha = sc.nextLine();
                    if (senha.isEmpty()) {
                        senha = "vazio12345";
						System.out.println("Campo senha foi deixado vazio, alterada para: vazio12345");
                    }

					System.out.println("Data de Nascimento (yyyy-MM-dd, dd/MM/yyyy, MM-dd-yyyy) [" + userBusca.getDataNascimento() + "]: ");
                    String dataNascimentoStr = sc.nextLine();
                    Date dataNascimento;
                    if (dataNascimentoStr.isEmpty()) {
                        dataNascimento = userBusca.getDataNascimento();
						System.out.println("Data de Nascimento mantida.");
                    } else {
                        dataNascimento = parseDate(dataNascimentoStr);
                    }

					System.out.println("Altura [" + userBusca.getAltura() + "]: ");
                    String alturaStr = sc.nextLine();
                    double altura;
                    if (alturaStr.isEmpty()) {
                        altura = userBusca.getAltura();
						System.out.println("Altura mantida.");
                    } else {
                        altura = Double.parseDouble(alturaStr);
                    }

                    System.out.println("Peso [" + userBusca.getPeso() + "]: ");
                    String pesoStr = sc.nextLine();
                    double peso;
                    if (pesoStr.isEmpty()) {
                        peso = userBusca.getPeso();
						System.out.println("Peso mantido.");
                    } else {
                        peso = Double.parseDouble(pesoStr);
                    }
					
					userBusca = new Usuario(id, nome, email, senha, dataNascimento, altura, peso);
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
	
	public static boolean remove(UsuarioDAO usuarioDAO) {
		boolean status = false;
		System.out.println("Id: ");
		try {			
			int id = Integer.parseInt(sc.nextLine());
			Usuario userBusca = usuarioDAO.get(id);
			if (userBusca != null) {
				System.out.println("Você tem certeza que deseja remover o usuário '" + userBusca.getNome() + "'? (s/n)");
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
	
	public static void listar(UsuarioDAO usuarioDAO) {
		List<Usuario> usuarios = usuarioDAO.listar();
		if (usuarios.isEmpty()) {
			System.out.println("Nenhum usuário cadastrado.");
			return;
		}
		for (Usuario u : usuarios) {
			u.imprimir();
		}
	}

	private static Date parseDate(String dateStr) throws ParseException {
        String[] formatos = {"yyyy-MM-dd", "dd/MM/yyyy", "MM-dd-yyyy"};
        for (String formato : formatos) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat(formato);
                sdf.setLenient(false); // Desabilita a análise leniente
                java.util.Date utilDate = sdf.parse(dateStr);
                return new Date(utilDate.getTime()); // Converte java.util.Date para java.sql.Date
            } catch (ParseException e) {
                // Continua tentando com o próximo formato
            }
        }
        throw new ParseException("Formato de data inválido", 0);
    }
}
