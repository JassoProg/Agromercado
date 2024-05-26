//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.model;


public class Producto {
    private int idProducto;
    private String nombreProducto;
    private String descripcion;
    private int stock;
    private Double precioCompra;
    private Double precioVenta;
    private String foto;
    private String rutaFoto;
    private int estatus;

    public Producto() {
    }

    public Producto(int idProducto, String nombreProducto, String descripcion, int stock, Double precioCompra, Double precioVenta, String foto, String rutaFoto, int estatus) {
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.descripcion = descripcion;
        this.stock = stock;
        this.precioCompra = precioCompra;
        this.precioVenta = precioVenta;
        this.foto = foto;
        this.rutaFoto = rutaFoto;
        this.estatus = estatus;
    }
    
    
    
    public int getIdProducto() {
        return idProducto;
    }

    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }

    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public Double getPrecioCompra() {
        return precioCompra;
    }

    public void setPrecioCompra(Double precioCompra) {
        this.precioCompra = precioCompra;
    }

    public Double getPrecioVenta() {
        return precioVenta;
    }

    public void setPrecioVenta(Double precioVenta) {
        this.precioVenta = precioVenta;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    public String getRutaFoto() {
        return rutaFoto;
    }

    public void setRutaFoto(String rutaFoto) {
        this.rutaFoto = rutaFoto;
    }

    public int getEstatus() {
        return estatus;
    }

    public void setEstatus(int estatus) {
        this.estatus = estatus;
    }
    
    
}