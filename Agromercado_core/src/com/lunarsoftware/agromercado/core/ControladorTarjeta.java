package com.lunarsoftware.agromercado.core;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;

import com.lunarsoftware.agromercado.bd.ConexionMySQL;
import com.lunarsoftware.agromercado.model.Tarjeta;
import java.util.List;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

public class ControladorTarjeta {
    public int insertarTarjeta(Tarjeta tarjeta) throws Exception {
        // 1. Definimos la consulta SQL que deseamos ejecutar:
        String sql = "{call insertarTarjeta(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";

        // 2. Abrimos una conexión con la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        // 3. Generamos un objeto de tipo CallableStatement:
        CallableStatement cstmt = conn.prepareCall(sql);

        // 4. Declaramos una variable auxiliar donde guardaremos el ID que se va a generar:
        int idTarjetaGenerado = 0;

        // 5. Llenamos el CallableStatement con los valores que se enviarán al Stored Procedure:
        cstmt.setString(1, tarjeta.getNumeroTarjeta());
        cstmt.setString(2, tarjeta.getNombreTarjeta());
        cstmt.setString(3, tarjeta.getEmail());
        cstmt.setString(4, tarjeta.getCodigoPostal());
        cstmt.setString(5, tarjeta.getDomicilio());
        cstmt.setString(6, tarjeta.getCiudad());
        cstmt.setString(7, tarjeta.getPais());
        cstmt.setString(8, tarjeta.getMes());
        cstmt.setString(9, tarjeta.getAnio());
        cstmt.setString(10, tarjeta.getCvv());
        cstmt.setInt(11, tarjeta.getPersona().getIdPersona());

        // Registramos el parámetro de salida:
        cstmt.registerOutParameter(12, Types.INTEGER); // idTarjeta

        // 6. Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        // 7. Recuperamos el valor de retorno:
        idTarjetaGenerado = cstmt.getInt(12);

        // 8. Cerramos todos nuestros objetos de BD:
        cstmt.close();
        conn.close();

        // 9. Devolvemos el ID de la tarjeta generada:
        return idTarjetaGenerado;
    }
    
    public List<Tarjeta> getAll(String filtro) throws Exception {
    String sql = "SELECT * FROM tarjeta " + filtro; // Agregar el filtro a la consulta SQL
    ConexionMySQL connMySQL = new ConexionMySQL();
    Connection conn = connMySQL.open();
    PreparedStatement pstmt = conn.prepareStatement(sql);
    ResultSet rs = pstmt.executeQuery();
    ArrayList<Tarjeta> tarjetas = new ArrayList<>();

    while (rs.next()) {
        Tarjeta tar = fill(rs);
        tarjetas.add(tar);
    }

    rs.close();
    pstmt.close();
    conn.close();

    return tarjetas;
}
    
    private Tarjeta fill(ResultSet rs) throws Exception {
        Tarjeta t = new Tarjeta();
        
        t.setIdTarjeta(rs.getInt("idTarjeta"));
        t.setNumeroTarjeta(rs.getString("numeroTarjeta"));
        t.setNombreTarjeta(rs.getString("nombreTarjeta"));
        t.setEmail(rs.getString("email"));
        t.setCodigoPostal(rs.getString("codigoPostal"));
        t.setDomicilio(rs.getString("domicilio"));
        t.setCiudad(rs.getString("ciudad"));
        t.setPais(rs.getString("pais"));
        t.setMes(rs.getString("mes"));
        t.setAnio(rs.getString("anio"));
        t.setCvv(rs.getString("cvv"));

        return t;
    }

}