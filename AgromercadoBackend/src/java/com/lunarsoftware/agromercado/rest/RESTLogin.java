//LunarSoftware AgroMercado Universidad Tecnologica de Leon 2024
package com.lunarsoftware.agromercado.rest;

import com.google.gson.Gson;
import com.lunarsoftware.agromercado.core.ControladorLogin;

import com.lunarsoftware.agromercado.model.Usuario;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
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
@Path("login")
public class RESTLogin {
    
    @Path("validar")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(
            @QueryParam("usuario") @DefaultValue("") String usuario,
            @QueryParam("password") @DefaultValue("") String password) {
        String out = null;
        ControladorLogin cl = new ControladorLogin();
        Gson gson = new Gson();
        Usuario usu = null;
        try {
            usu = cl.login(usuario, password);
            if (usu != null) {
                out = gson.toJson(usu);
            } else {
                out = "{\"error\":\"Datos de acceso incorrectos.\"}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString().replaceAll("\"", "") + "\"}";
        }
        return Response.ok(out).build();
    }

    @Path("gen")
    @Produces(MediaType.APPLICATION_JSON)
    @GET
    public Response checkingUser(@QueryParam("nombreU") @DefaultValue("") String nombreU) {
        String out = null;
        ControladorLogin cl = new ControladorLogin();

        try {
            String token = cl.checkUsers(nombreU);
            out = new Gson().toJson(token);
            System.out.println("Token: " + token);
        } catch (Exception e) {
            out = """
                    {"error": "Error al generar el token"}
                  """;
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }

    @Path("eliminar")
    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response eliminarToken(@QueryParam("nombreUsuario") String nombreUsuario) {
        String out;

        ControladorLogin CL = new ControladorLogin();

        try {
            CL.eliminarToken(nombreUsuario);
            out = "{\"result\":\"Token eliminado correctamente.\"}";
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"error\":\"" + e.toString().replaceAll("\"", "") + "\"}";
        }

        return Response.ok(out).build();
    }

    @Path("getAll")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll() {
        ControladorLogin CL = new ControladorLogin();
        String out = null;
        Gson gson = new Gson();

        try {
            List<Usuario> usuarios = CL.getAll("");
            out = gson.toJson(usuarios);
        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"" + e.toString().replaceAll("\"", "") + "\"}";
        }

        return Response.ok(out).build();
    }

}
