//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.model;


public class Tarjeta {
    private int idTarjeta;
    private String numeroTarjeta;
    private String nombreTarjeta;
    private String email;
    private String codigoPostal;
    private String domicilio;
    private String ciudad;
    private String pais;
    private String mes;
    private String anio;
    private String cvv;
    private Persona persona;

    public Tarjeta() {
    }

    public Tarjeta(int idTarjeta, String numeroTarjeta, String nombreTarjeta, String email, String codigoPostal, String domicilio, String ciudad, String pais, String mes, String anio, String cvv, Persona persona) {
        this.idTarjeta = idTarjeta;
        this.numeroTarjeta = numeroTarjeta;
        this.nombreTarjeta = nombreTarjeta;
        this.email = email;
        this.codigoPostal = codigoPostal;
        this.domicilio = domicilio;
        this.ciudad = ciudad;
        this.pais = pais;
        this.mes = mes;
        this.anio = anio;
        this.cvv = cvv;
        this.persona = persona;
    }

    
    
    public int getIdTarjeta() {
        return idTarjeta;
    }

    public void setIdTarjeta(int idTarjeta) {
        this.idTarjeta = idTarjeta;
    }

    public String getNumeroTarjeta() {
        return numeroTarjeta;
    }

    public void setNumeroTarjeta(String numeroTarjeta) {
        this.numeroTarjeta = numeroTarjeta;
    }

    public String getNombreTarjeta() {
        return nombreTarjeta;
    }

    public void setNombreTarjeta(String nombreTarjeta) {
        this.nombreTarjeta = nombreTarjeta;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getDomicilio() {
        return domicilio;
    }

    public void setDomicilio(String domicilio) {
        this.domicilio = domicilio;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getMes() {
        return mes;
    }

    public void setMes(String mes) {
        this.mes = mes;
    }

    public String getAnio() {
        return anio;
    }

    public void setAnio(String anio) {
        this.anio = anio;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(String cvv) {
        this.cvv = cvv;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }
    
    
    
}