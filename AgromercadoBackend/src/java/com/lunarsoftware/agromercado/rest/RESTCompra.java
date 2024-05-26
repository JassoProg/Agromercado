/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lunarsoftware.agromercado.rest;

import com.google.gson.Gson;
import com.lunarsoftware.agromercado.core.ControladorCompra;
import com.lunarsoftware.agromercado.model.Compra;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("compra")
public class RESTCompra {
    
    @Path("save")
    @Produces(MediaType.APPLICATION_JSON)
    @POST
    public Response nuevaCompra(@FormParam("datosCompra") @DefaultValue("") String datosCompra) {

        ControladorCompra controllerCompra = new ControladorCompra();
        String responseMessage;

        try {
            Gson gson = new Gson();
            Compra compra = gson.fromJson(datosCompra, Compra.class);

            if (compra == null) {
                throw new IllegalArgumentException("Invalid data for Compra");
            }

            int idCompra = controllerCompra.insert(compra);

            responseMessage = (idCompra > 0)
                    ? "{\"result\":\"Datos de compra guardados correctamente. ID de compra: " + idCompra + "\"}"
                    : "{\"error\":\"No se pudo guardar los datos de compra.\"}";

        } catch (Exception e) {
            e.printStackTrace();
            responseMessage = "{\"error\":\"" + e.toString().replaceAll("\"", "") + "\"}";
        }

        return Response.status(Response.Status.OK).entity(responseMessage).build();
    }
    
    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(String filtro) {
        ControladorCompra cp = new ControladorCompra();
        List<Compra> compras = null;
        String out = null;
        Gson gson = new Gson();

        try {
            compras = cp.getAll(filtro);
            out = gson.toJson(compras);
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"error\":\"" + e.getMessage().replaceAll("\"", "") + "\"}")
                           .build();
        }
    }
}
