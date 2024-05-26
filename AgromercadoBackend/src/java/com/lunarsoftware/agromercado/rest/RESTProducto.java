package com.lunarsoftware.agromercado.rest;

import com.google.gson.Gson;
import com.lunarsoftware.agromercado.core.ControladorProducto;
import com.lunarsoftware.agromercado.model.Producto;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;


@Path("producto")
public class RESTProducto {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveProducto(@FormParam("datosProducto") @DefaultValue("") String datosProducto) {
        ControladorProducto controladorProducto = new ControladorProducto();
        Gson gson = new Gson();
        String out = null;


        try {
            Producto producto = gson.fromJson(datosProducto, Producto.class);
            if (producto == null) {
                throw new IllegalArgumentException("Invalid data for Product");
            }else{
                controladorProducto.insertarProducto(producto);
            }

            out = "{\"result\":\"Producto registrado correctamente.\"}";
        } catch (Exception ex) {
            ex.printStackTrace();
            out = "{\"error\":\"" + ex.toString().replaceAll("\"", "") + "\"}";
        }

        return Response.ok(out).build();
    }
    
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(String filtro) {
        ControladorProducto cp = new ControladorProducto();
        List<Producto> productos = null;
        String out = null;
        Gson gson = new Gson();

        try {
            productos = cp.getAll(filtro);
            out = gson.toJson(productos);
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"error\":\"" + e.getMessage().replaceAll("\"", "") + "\"}")
                           .build();
        }
    }
}