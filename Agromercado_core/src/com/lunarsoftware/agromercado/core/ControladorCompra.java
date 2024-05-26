/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lunarsoftware.agromercado.core;

import com.lunarsoftware.agromercado.bd.ConexionMySQL;
import com.lunarsoftware.agromercado.model.Compra;
import com.lunarsoftware.agromercado.model.Persona;
import com.lunarsoftware.agromercado.model.Producto;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author FAM ANREY
 */
public class ControladorCompra {
    public int insert(Compra c) throws Exception {
        // Definimos la consulta SQL que deseamos ejecutar:
        String sql = "CALL nuevaCompra(?, ?, ?, ?)";

        // Abrimos una conexión con la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        conn.setAutoCommit(false); // Desactivar el modo de autocommit para manejar la transacción manualmente

        // Generamos un objeto de tipo CallableStatement:
        CallableStatement cstmt = conn.prepareCall(sql);

        // Declaramos variables auxiliares donde guardamos los ID que se van a generar:
        int idCompra = 0;

        ResultSet rs = null;

        // Llenamos el CallableStatement con los valores que se enviarán al Stored Procedure:
        cstmt.setInt(1, c.getProducto().getIdProducto());
        cstmt.setInt(2, c.getCantidad());
        cstmt.setDouble(3, c.getPrecioCompra());
        cstmt.setInt(4, c.getPersona().getIdPersona());
        
 // Este es el cuarto parámetro registrado

        // Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        idCompra = cstmt.getInt(4);

        // Confirmar la transacción antes de actualizar el stock del producto:
        conn.commit();

        // Actualizamos el stock del producto comprado:
        String updateStockSQL = "UPDATE producto SET stock = stock - ? WHERE idProducto = ?";
        PreparedStatement pstmt = conn.prepareStatement(updateStockSQL);
        pstmt.setInt(1, c.getCantidad());
        pstmt.setInt(2, c.getProducto().getIdProducto());
        pstmt.executeUpdate();

        // Colocamos el valor retornado dentro del objeto Compra:
        c.setIdCompra(idCompra);

        // Cerramos los objetos de BD:
        cstmt.close();
        pstmt.close();

        // Devolvemos el ID de Compra generado:
        return idCompra;
    }
    
    
    public List<Compra> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM v_compra";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        //import java.util.List
        ArrayList<Compra> compras = new ArrayList<>();

        while (rs.next()) {
            Compra com = fill(rs);
            compras.add(com);
        }

        rs.close();
        pstmt.close();
        conn.close();

        return compras;
    }

    private Compra fill(ResultSet rs) throws Exception {
        Compra c = new Compra();
        Persona pe = new Persona();
        Producto pr = new Producto();
        //Envio e = new Envio();

        c.setIdCompra(rs.getInt("idCompra"));
        c.setFechaHoraPedido(rs.getString("fechaHoraPedido"));
        c.setEstatus(rs.getInt("estatus"));
        c.setActivo(rs.getInt("activo"));

        pe.setIdPersona(rs.getInt("idPersona"));

        pr.setIdProducto(rs.getInt("idProducto"));

        c.setCantidad(rs.getInt("cantidad"));
        c.setPrecioCompra(rs.getDouble("precioCompra"));

        //e.setIdEnvio(rs.getInt("idEnvio"));
        c.setPersona(pe);
        c.setProducto(pr);
        //c.setEnvio(e);

        return c;
    }
}
