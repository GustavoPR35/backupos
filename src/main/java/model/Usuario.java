package model;
import org.mindrot.jbcrypt.BCrypt;

public class Usuario {
	
	/*
	 * Atributos
	 */
	private int id;
	private String nome;
	private String email;
	private String senha;
	private int idade;
	private double altura;
	private double peso;
	
	/*
	 * Construtores
	 */
	public Usuario() {
		this.id = -1;
		this.nome = "";
		this.email = "";
		this.senha = "";
		this.idade = -1;
		this.altura = -1;
		this.peso = -1;
	}
	
	public Usuario(String nome, String email, String senha) {
		this.nome = nome;
		this.email = email;
		setSenha(senha);
	}
	
	public Usuario(int id, String nome, String email, String senha, int idade, double altura, double peso) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		setSenha(senha);
		this.idade = idade;
		this.altura = altura;
		this.peso = peso;
	}
	
	public Usuario(int id, String nome, String email, String senhaHash, int idade, double altura, double peso, boolean senhaJaHash) {
	    this.id = id;
	    this.nome = nome;
	    this.email = email;
	    
	    // Se a senha já estiver hashada, basta atribuí-la diretamente
	    if (senhaJaHash) {
	        this.senha = senhaHash;
	    } else {
	        setSenha(senha);
	    }
	    
	    this.idade = idade;
	    this.altura = altura;
	    this.peso = peso;
	}

	/*
	 * Getters e Setters
	 */
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = hashSenha(senha);
	}

	public int getIdade() {
		return idade;
	}

	public void setIdade(int idade) {
		this.idade = idade;
	}

	public double getAltura() {
		return altura;
	}

	public void setAltura(double altura) {
		this.altura = altura;
	}

	public double getPeso() {
		return peso;
	}

	public void setPeso(double peso) {
		this.peso = peso;
	}
	
	/*
	 * Métodos
	 */
	private String hashSenha(String senha) {
        return BCrypt.hashpw(senha, BCrypt.gensalt());
    }
	
	public boolean verificarSenha(String senha) {
	    return BCrypt.checkpw(senha, this.senha);
	}
	
	public void imprimir() {
	    System.out.printf("Id: %d, Nome: %s, Email: %s, Senha: [vai ver nao dog], Idade: %d, Altura: %.2f, Peso: %.2f%n", 
	                      getId(), getNome(), getEmail(), getIdade(), getAltura(), getPeso());
	}
	
}
