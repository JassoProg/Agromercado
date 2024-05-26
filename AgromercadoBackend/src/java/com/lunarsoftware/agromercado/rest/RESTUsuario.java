//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024

package com.lunarsoftware.agromercado.rest;

import com.google.gson.Gson;
import com.lunarsoftware.agromercado.core.ControladorUsuario;
import com.lunarsoftware.agromercado.model.Persona;
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


/**
 *
 * @author rayre
 */

@Path("usuario")
public class RESTUsuario {

    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Response save(@FormParam("datosUsuario") @DefaultValue("") String datosUsuario) {
        ControladorUsuario cu = new ControladorUsuario();
        String out = null;
        Gson gson = new Gson();

        try {
            Persona per = gson.fromJson(datosUsuario, Persona.class);

            if (per == null) {
                throw new IllegalArgumentException("Invalid data for Usuario");
                
            }else{
                  cu.insertarPersona(per);
            }
          
            out = "{\"result\":\"Datos de Usuario guardados correctamente.\"}";
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
        ControladorUsuario cp = new ControladorUsuario();
        List<Persona> personas = null;
        String out = null;
        Gson gson = new Gson();

        try {
            personas = cp.getAll(filtro);
            out = gson.toJson(personas);
            return Response.ok(out).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                           .entity("{\"error\":\"" + e.getMessage().replaceAll("\"", "") + "\"}")
                           .build();
        }
    }
    
@Path("getPersona")
@GET
@Produces(MediaType.APPLICATION_JSON)
public Response getByNombreUsuario(@QueryParam("nombreUsuario") String nombreUsuario) {
    ControladorUsuario cp = new ControladorUsuario();
    Persona persona = null;
    String out = null;
    Gson gson = new Gson();

    try {
        persona = cp.obtenerUsuario(nombreUsuario);
        if (persona == null) {
            return Response.status(Response.Status.NOT_FOUND)
                           .entity("{\"error\":\"No se encontró la persona para el nombre de usuario proporcionado.\"}")
                           .build();
        }
        out = gson.toJson(persona);
        return Response.ok(out).build();
    } catch (Exception e) {
        e.printStackTrace();
        return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                       .entity("{\"error\":\"" + e.getMessage().replaceAll("\"", "") + "\"}")
                       .build();
    }
}
}

