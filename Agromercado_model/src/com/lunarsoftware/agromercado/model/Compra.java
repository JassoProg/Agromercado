/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lunarsoftware.agromercado.model;

public class Compra {
    private int idCompra;
    private String fechaHoraPedido;
    private int estatus;
    private int activo;
    private Persona persona;
    private Producto producto;
    private int cantidad;
    private Double precioCompra;


    public Compra() {
    }

    public Compra(int idCompra, String fechaHoraPedido, int estatus, int activo, Persona persona, Producto producto, int cantidad, Double precioCompra) {
        this.idCompra = idCompra;
        this.fechaHoraPedido = fechaHoraPedido;
        this.estatus = estatus;
        this.activo = activo;
        this.persona = persona;
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioCompra = precioCompra;

    }

   
    public int getIdCompra() {
        return idCompra;
    }

    public void setIdCompra(int idCompra) {
        this.idCompra = idCompra;
    }

    public String getFechaHoraPedido() {
        return fechaHoraPedido;
    }

    public void setFechaHoraPedido(String fechaHoraPedido) {
        this.fechaHoraPedido = fechaHoraPedido;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }

    public int getActivo() {
        return activo;
    }

    public void setActivo(int activo) {
        this.activo = activo;
    }

    public Persona getPersona() {
        return persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

}
