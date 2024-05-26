package com.lunarsoftware.agromercado.rest;

import com.google.gson.Gson;
import com.lunarsoftware.agromercado.core.ControladorTarjeta;
import com.lunarsoftware.agromercado.model.Tarjeta;
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

@Path("tarjeta")
public class RESTTarjeta {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response saveTarjeta(@FormParam("datosTarjeta") @DefaultValue("") String datosTarjeta) {
        ControladorTarjeta controladorTarjeta = new ControladorTarjeta();
        Gson gson = new Gson();
        String out = null;

        try {
            Tarjeta tarjeta = gson.fromJson(datosTarjeta, Tarjeta.class);

            if (tarjeta == null) {
                throw new IllegalArgumentException("Invalid data for Tarjeta");
            } else {
                controladorTarjeta.insertarTarjeta(tarjeta);
            }

            out = "{\"result\":\"Tarjeta registrada correctamente.\"}";
        } catch (Exception ex) {
            ex.printStackTrace();
            out = "{\"error\":\"" + ex.toString().replaceAll("\"", "") + "\"}";
        }

        return Response.ok(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("idPersona") int idPersona) {
        ControladorTarjeta ct = new ControladorTarjeta();
        List<Tarjeta> tarjetas = null;
        String out = null;
        Gson gson = new Gson();

        try {
            // Si se proporciona un idPersona, se filtra por ese idPersona
            if (idPersona != 0) {
                tarjetas = ct.getAll("WHERE idPersona = " + idPersona);
            } else {
                tarjetas = ct.getAll(""); // Si no se proporciona un idPersona, se obtienen todas las tarjetas
            }
            out = gson.toJson(tarjetas);
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"" + e.getMessage().replaceAll("\"", "") + "\"}")
                    .build();
        }
    }

}
