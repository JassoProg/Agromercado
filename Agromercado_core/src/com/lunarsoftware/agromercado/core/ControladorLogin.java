//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.core;

import com.lunarsoftware.agromercado.bd.ConexionMySQL;
import com.lunarsoftware.agromercado.model.Usuario;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.text.SimpleDateFormat;
import java.util.Date;
import org.apache.commons.codec.digest.DigestUtils;
import java.sql.CallableStatement;
import java.util.List;

/**
 *
 * @author rayre
 */
public class ControladorLogin {
    
    public Usuario login(String nombreUsuario, String contrasenia) throws Exception {
        String sql = "SELECT * FROM usuario WHERE nombreUsuario=? AND contrasenia=?";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = null;
        Usuario usu = null;
    
        pstmt.setString(1, nombreUsuario);
        pstmt.setString(2, contrasenia);
        rs = pstmt.executeQuery();
    
        if (rs.next()) {
            usu = fill(rs);
        }
    
        rs.close();
        pstmt.close();
        conn.close();
    
        return usu;
    }

    
  
    
    public String checkUsers(String nombreU) {

        String nuevoToken = generarToken(nombreU);
        return nuevoToken;
    }

    private String generarToken(String nombreU) {
        Date fechaActual = new Date();
        String fechaFormateada = new SimpleDateFormat("dd-MM-yyyy").format(fechaActual);
        String nuevoToken = "Agromercado" + "." + nombreU + "." + fechaFormateada;
        return DigestUtils.md5Hex(nuevoToken);
    }
    
    public void eliminarToken(String nombreUsuario) throws Exception {
        String sql = """ 
                     call eliminarTokenUsuario(?)
                     """;

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        cstmt.setString(1, nombreUsuario);

        cstmt.executeUpdate();

        cstmt.close();
        conn.close();
    }
    
    private Usuario fill(ResultSet rs) throws Exception {

        Usuario usu = new Usuario();
        

        usu.setIdUsuario(rs.getInt("idUsuario"));
        usu.setNombreUsuario(rs.getString("nombreUsuario"));
        usu.setContrasenia(rs.getString("contrasenia"));
        usu.setCorreo(rs.getString("correo"));
        usu.setToken(rs.getString("token"));

        return usu;

    }
  
    
    public List<Usuario> getAll(String filtro) throws Exception {
        
        String sql = "SELECT * FROM usuario";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        //import java.util.List
        ArrayList<Usuario> usuario = new ArrayList<>();

        while (rs.next()) {
            Usuario usu = fill(rs);
            usuario.add(usu);
        }

        rs.close();
        pstmt.close();
        conn.close();

        return usuario;
    }

    
}
