package model;
import java.sql.Date;

import org.mindrot.jbcrypt.BCrypt;

// Final pra evitar que a classe seja estendida e o método setSenha() seja sobrescrito, já que ele é usado nos construtores
public final class Usuario {
	
	/*
	 * Atributos
	 */
	private int id;
	private String nome;
	private String email;
	private String senha;
	private Date dataNascimento;
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
		this.dataNascimento = new Date(System.currentTimeMillis()); // Inicializa com a data atual
		this.altura = -1;
		this.peso = -1;
	}
	
	public Usuario(String nome, String email, String senha) {
		this.nome = nome;
		this.email = email;
		setSenha(senha);
	}
	
	public Usuario(int id, String nome, String email, String senha, Date dataNascimento, double altura, double peso) {
		this.id = id;
		this.nome = nome;
		this.email = email;
		setSenha(senha);
		this.dataNascimento = dataNascimento;
		this.altura = altura;
		this.peso = peso;
	}
	
	public Usuario(int id, String nome, String email, String senhaHash, Date dataNascimento, double altura, double peso, boolean senhaJaHash) {
	    this.id = id;
	    this.nome = nome;
	    this.email = email;
	    
	    // Se a senha já estiver hashada, basta atribuí-la diretamente
	    if (senhaJaHash) {
	        this.senha = senhaHash;
	    } else {
	        setSenha(senha);
	    }
	    
	    this.dataNascimento = dataNascimento;
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

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public void setIdade(Date dataNascimento) {
		this.dataNascimento = dataNascimento;
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
	    System.out.printf("Id: %d, Nome: %s, Email: %s, Senha: [vai ver nao dog], Data de nascimento: %s, Altura: %.2f, Peso: %.2f%n", 
	                      getId(), getNome(), getEmail(), getDataNascimento(), getAltura(), getPeso());
	}
	
}
