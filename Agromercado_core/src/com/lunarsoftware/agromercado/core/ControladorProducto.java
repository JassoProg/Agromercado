package com.lunarsoftware.agromercado.core;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;

import com.lunarsoftware.agromercado.bd.ConexionMySQL;
import com.lunarsoftware.agromercado.model.Producto;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


public class ControladorProducto {
    public int insertarProducto(Producto producto) throws Exception {
        // 1. Definimos la consulta SQL que deseamos ejecutar:
        String sql = "{call insertarProducto(?, ?, ?, ?, ?, ?, ?, ?)}";

        // 2. Abrimos una conexión con la BD:
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();

        // 3. Generamos un objeto de tipo CallableStatement:
        CallableStatement cstmt = conn.prepareCall(sql);

        // 4. Declaramos una variable auxiliar donde guardaremos el ID que se va a generar:
        int idProductoGenerado = 0;

        // 5. Llenamos el CallableStatement con los valores que se enviarán al Stored Procedure:
        cstmt.setString(1, producto.getNombreProducto());
        cstmt.setString(2, producto.getDescripcion());
        cstmt.setInt(3, producto.getStock());
        cstmt.setDouble(4, producto.getPrecioCompra());
        cstmt.setString(5, producto.getFoto());
        cstmt.setString(6, producto.getRutaFoto());
        cstmt.setInt(7, producto.getEstatus());

        // Registramos el parámetro de salida:
        cstmt.registerOutParameter(8, Types.INTEGER); // idProducto

        // 6. Ejecutamos el Stored Procedure:
        cstmt.executeUpdate();

        // 7. Recuperamos el valor de retorno:
        idProductoGenerado = cstmt.getInt(8);

        // 8. Cerramos todos nuestros objetos de BD:
        cstmt.close();
        conn.close();

        // 9. Devolvemos el ID del producto generado:
        return idProductoGenerado;
    }
    
    
    public List<Producto> getAll(String filtro) throws Exception {
        String sql = "SELECT * FROM producto";
        ConexionMySQL connMySQL = new ConexionMySQL();
        Connection conn = connMySQL.open();
        PreparedStatement pstmt = conn.prepareStatement(sql);
        ResultSet rs = pstmt.executeQuery();
        //import java.util.List
        ArrayList<Producto> productos = new ArrayList<>();

        while (rs.next()) {
            Producto pro = fill(rs);
            productos.add(pro);
        }

        rs.close();
        pstmt.close();
        conn.close();

        return productos;
    }
    
    private Producto fill(ResultSet rs) throws Exception {
        Producto p = new Producto();

        p.setIdProducto(rs.getInt("idProducto"));
        p.setNombreProducto(rs.getString("nombreProducto"));
        p.setDescripcion(rs.getString("descripcion"));
        p.setStock(rs.getInt("stock"));
        p.setPrecioCompra(rs.getDouble("precioCompra"));
        p.setPrecioVenta(rs.getDouble("precioVenta"));
        p.setFoto(rs.getString("foto"));
        p.setRutaFoto(rs.getString("rutaFoto"));
        p.setEstatus(rs.getInt("estatus"));

        return p;
    }

}