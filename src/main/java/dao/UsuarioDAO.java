package dao;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import model.Usuario;

public class UsuarioDAO extends DAO{
	
	public UsuarioDAO() {
		super();
		conectar();
	}
	
	@Override
    public void close() {
        super.close();
    }
	
	public int insert(Usuario usuario) {
		int generatedId = -1;
        String sql = "INSERT INTO usuario (nome, email, senha) VALUES (?, ?, ?)";

        try (PreparedStatement pst = conexao.prepareStatement(sql,  PreparedStatement.RETURN_GENERATED_KEYS)) {
            // Definindo os valores dos parâmetros
            pst.setString(1, usuario.getNome());
            pst.setString(2, usuario.getEmail());
            pst.setString(3, usuario.getSenha()); // já hashada

            // Executando a inserção
            int rowsAffected = pst.executeUpdate();
            if (rowsAffected > 0) {
                try (ResultSet generatedKeys = pst.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        generatedId = generatedKeys.getInt(1); // Obtém o ID gerado
                        return generatedId;
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Erro ao inserir usuário: " + e.getMessage());
        }
        return generatedId;
	}
	
	public Usuario get(int id) {
		Usuario usuario = null;
		String sql = "SELECT * FROM usuario WHERE id_usuario = ?";
		
		try (PreparedStatement pst = conexao.prepareStatement(sql)) {
			pst.setInt(1, id);
			
			ResultSet rs = pst.executeQuery();
			
			if (rs.next()) {
				Date dataNascimento = rs.getDate("data_nascimento");		
				usuario = new Usuario(
						rs.getInt("id_usuario"),
						rs.getString("nome"),
						rs.getString("email"),
						rs.getString("senha"),
						dataNascimento,
						rs.getDouble("altura"),
						rs.getDouble("peso")
						);
			}
		} catch (SQLException e) {
			System.err.println("Erro ao procurar usuário: " + e.getMessage()); 
		}
		
		return usuario;
	}
	
	public Usuario getByEmail(String email) {
	    Usuario usuario = null;
	    String sql = "SELECT * FROM usuario WHERE email = ?";
	    
	    try (PreparedStatement pst = conexao.prepareStatement(sql)) {
	        pst.setString(1, email);
	        
	        try (ResultSet rs = pst.executeQuery()) {
	            if (rs.next()) {
	            	Date dataNascimento = rs.getDate("data_nascimento");

	                usuario = new Usuario(
	                    rs.getInt("id_usuario"),
	                    rs.getString("nome"),
	                    rs.getString("email"),
	                    rs.getString("senha"),
	                    dataNascimento,
	                    rs.getDouble("altura"),
                        rs.getDouble("peso"),
	                    true // Senha já vem hashada do pgsql
	                );
	            }
	        }
	    } catch (SQLException e) {
	        System.err.println("Erro ao procurar usuário: " + e.getMessage()); 
	    }
	    
	    return usuario;
	}

	
	public boolean update(Usuario usuario) {
	    boolean status = false;
	    String sql = "UPDATE usuario SET nome = ?, email = ?, senha = ?, data_nascimento = ?, altura = ?, peso = ? WHERE id_usuario = ?";

	    try (PreparedStatement pst = conexao.prepareStatement(sql)) {
	        // Definindo os valores dos parâmetros
	        pst.setString(1, usuario.getNome());
	        pst.setString(2, usuario.getEmail());
	        pst.setString(3, usuario.getSenha()); // já hashada
	        pst.setDate(4, usuario.getDataNascimento());
	        pst.setDouble(5, usuario.getAltura());
	        pst.setDouble(6, usuario.getPeso());
	        pst.setInt(7, usuario.getId()); // ID do usuário a ser atualizado

	        // Executando a atualização
	        int rowsAffected = pst.executeUpdate();
	        status = (rowsAffected > 0); // Se pelo menos uma linha foi afetada, a atualização foi bem-sucedida
	    } catch (SQLException e) {
	        System.err.println("Erro ao atualizar usuário: " + e.getMessage());
	    }

	    return status;
	}
	
	public boolean remove(int id) {
	    boolean status = false;
	    String sql = "DELETE FROM usuario WHERE id_usuario = ?";

	    try (PreparedStatement pst = conexao.prepareStatement(sql)) {
	        // Definindo o valor do parâmetro
	        pst.setInt(1, id);

	        // Executando a exclusão
	        int rowsAffected = pst.executeUpdate();
	        status = (rowsAffected > 0); // Se pelo menos uma linha foi afetada, a exclusão foi bem-sucedida
	    } catch (SQLException e) {
	        System.err.println("Erro ao remover usuário: " + e.getMessage());
	    }

	    return status;
	}
	
	public List<Usuario> listar() {
		List<Usuario> usuarios = new ArrayList<>();
		String sql = "SELECT * FROM usuario";
		
		try (PreparedStatement pst = conexao.prepareStatement(sql)){
			ResultSet rs = pst.executeQuery();
			while(rs.next()) {
				Usuario u = new Usuario(
						rs.getInt("id_usuario"), 
						rs.getString("nome"), 
						rs.getString("email"), 
						rs.getString("senha"), 
						rs.getDate("data_nascimento"), 
						rs.getDouble("altura"), 
						rs.getDouble("peso"), 
						true // Senha já hashada
						);
				usuarios.add(u);
			}
		} catch (SQLException e) {
			System.err.println("Erro ao tentar buscar usuários: " + e.getMessage());
		}
		return usuarios;
	}
	
}
