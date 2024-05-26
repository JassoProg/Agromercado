//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.bd;


import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author rayre
 */
public class ConexionMySQL {
    
  public Connection open() throws Exception {
        //Ingresar los datos para la conexion SQL
        String user = "root";
        String password = "Root";
        String url = "jdbc:mysql://127.0.0.1:3306/agromercado?" +
                     "useSSL=false&" +
                     "allowPublicKeyRetrieval=true&" +
                     "useUnicode=true&" +
                     "characterEncoding=utf-8";
        
        Connection conn = null;
        
        //Primero registramos el Driver JDBC de MySQL: 
        Class.forName("com.mysql.cj.jdbc.Driver");
        
        //Abrimos una conexion con MySQL:
        conn = DriverManager.getConnection(url, user, password);
        
        return conn;
    }
}
