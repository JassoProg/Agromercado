//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.core;

import com.lunarsoftware.agromercado.bd.ConexionMySQL;
import com.lunarsoftware.agromercado.model.Persona;
import com.lunarsoftware.agromercado.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author rayre
 */
public class ControladorUsuario {
    
    //Store procedure optimazacion de la optimicion
    public int insertarPersona(Persona p) throws Exception {
        //2-Abrimos la conexion con la base de datos

        //bloque de cadena
        //1-Definimos la consulta mysql que deseamos consultar
        String sql = """
                     call insertarPersona(?,?,?,?,?,?,?
                                          ,?,?,?,?,?,?
                                          ,?)
                     """;
        //3.Generamos un objetos de tipo callableStatment
        //Te ayuda a invocar procedimientos almacenados en base de datos

        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        CallableStatement cstmt = conn.prepareCall(sql);

        //4. Declaramos variables auxiliares donde guardamos los id que se generan
        int idPersonaGenerado = 0;
        int idUsuarioGenerado = 0;

        //5. Declaramos un resulset:
        ResultSet rs = null;

        //6. Llenamos el callablesstatement con los valores que se enviaran al
        //stored procedure
        cstmt.setString(1, p.getNombre());
        cstmt.setString(2, p.getApellidoPaterno());
        cstmt.setString(3, p.getApellidoMaterno());
        cstmt.setString(4, p.getGenero());
        cstmt.setString(5, p.getFechaNacimiento());
        cstmt.setString(6, p.getRfc());
        cstmt.setString(7, p.getCurp());
        cstmt.setString(8, p.getTelefono());

        cstmt.setString(9, p.getUsuario().getNombreUsuario());
        cstmt.setString(10, p.getUsuario().getContrasenia());
        cstmt.setString(11, p.getUsuario().getCorreo());
        cstmt.setString(12, p.getUsuario().getToken());

        //Registramos parametros de salida: estos son de salida
        cstmt.registerOutParameter(13, Types.INTEGER);
        cstmt.registerOutParameter(14, Types.INTEGER);

        //Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        //Recuperamos los valores de retorno:
        idPersonaGenerado = cstmt.getInt(13);
        idUsuarioGenerado = cstmt.getInt(14);

        //Colocamos los valores retornado dentro del objeto de tipo empleado:
//            p.setIdPersona(idPersonaGenerado);
//            p.getUsuario().setIdUsuario(idUsuarioGenerado);
        //Cerramos todos nuestros objetos de BD
        cstmt.close();
        cstmt.close();

        //Devolvemos el ID de empleado que se genero
        return idPersonaGenerado;
    }
    
    public Persona obtenerUsuario(String nombreUsuario) throws Exception {
    String sql = "SELECT * FROM v_persona WHERE nombreUsuario = ?";
    ConexionMySQL connMySQL = new ConexionMySQL();
    Connection conn = connMySQL.open();
    PreparedStatement pstmt = conn.prepareStatement(sql);
    pstmt.setString(1, nombreUsuario);
    ResultSet rs = pstmt.executeQuery();
    Persona persona = null;
    if (rs.next()) {
        persona = fill(rs);
    }
    rs.close();
    pstmt.close();
    conn.close();
    return persona;
}
    
    
    public List<Persona> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM v_persona";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        //import java.util.List
        ArrayList<Persona> personas = new ArrayList<>();

        while (rs.next()) {
            Persona per = fill(rs);
            personas.add(per);
        }

        rs.close();
        pstmt.close();
        conn.close();

        return personas;
    }
    
    private Persona fill(ResultSet rs) throws Exception {
        Persona pe = new Persona();
        Usuario u = new Usuario();
        
        pe.setNombre(rs.getString("nombre"));
        pe.setApellidoPaterno(rs.getString("apellidoPaterno"));
        pe.setApellidoMaterno(rs.getString("apellidoMaterno"));
        pe.setGenero(rs.getString("genero"));
        pe.setFechaNacimiento(rs.getString("fechaNacimiento"));
        pe.setRfc(rs.getString("rfc"));
        pe.setCurp(rs.getString("curp"));
        pe.setTelefono(rs.getString("telefono"));
        
        u.setNombreUsuario(rs.getString("nombreUsuario"));
        u.setContrasenia(rs.getString("contrasenia"));
        u.setCorreo(rs.getString("correo"));
        
        pe.setUsuario(u);

        return pe;
    }
    
}
