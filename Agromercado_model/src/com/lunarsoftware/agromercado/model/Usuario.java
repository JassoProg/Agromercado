//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.model;

/**
 *
 * @author rayre
 */
public class Usuario {
    
    private int idUsuario;
    private String nombreUsuario;
    private String contrasenia;
    private String correo;
    private String token;

    public Usuario() {
    }

    public Usuario(int idUsuario, String nombreUsuario, String contrasenia, String correo, String token) {
        this.idUsuario = idUsuario;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
        this.correo = correo;
        this.token = token;
    }
    
    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getContrasenia() {
        return contrasenia;
    }

    public void setContrasenia(String contrasenia) {
        this.contrasenia = contrasenia;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
    
}


