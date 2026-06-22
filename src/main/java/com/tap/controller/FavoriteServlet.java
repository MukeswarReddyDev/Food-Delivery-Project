package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import com.tap.DAO.FavoriteDAO;
import com.tap.DAOimplementation.FavoriteDAOimplementation;
import com.tap.Model.User;

@WebServlet("/toggle-favorite")
public class FavoriteServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private FavoriteDAO favoriteDAO;

    @Override
    public void init() throws ServletException {
        favoriteDAO = new FavoriteDAOimplementation();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);
        User currentUser = (session != null) ? (User) session.getAttribute("currentUser") : null;

        if (currentUser == null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            out.write("{\"success\":false,\"requireLogin\":true,\"message\":\"Please log in to add restaurants to favorites!\"}");
            return;
        }

        String restIdParam = request.getParameter("restaurantId");
        if (restIdParam == null || restIdParam.trim().isEmpty()) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"success\":false,\"message\":\"Restaurant ID is missing!\"}");
            return;
        }

        try {
            int restaurantId = Integer.parseInt(restIdParam.trim());
            int userId = currentUser.getUserId();

            boolean isFav = favoriteDAO.isFavorite(userId, restaurantId);
            boolean success;
            boolean newFavState;
            String message;

            if (isFav) {
                success = favoriteDAO.removeFavorite(userId, restaurantId);
                newFavState = false;
                message = "Removed restaurant from favorites.";
            } else {
                success = favoriteDAO.addFavorite(userId, restaurantId);
                newFavState = true;
                message = "Added restaurant to favorites.";
            }

            if (success) {
                out.write("{\"success\":true,\"isFavorite\":" + newFavState + ",\"message\":\"" + message + "\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                out.write("{\"success\":false,\"message\":\"Failed to update favorite status in database.\"}");
            }
        } catch (NumberFormatException e) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.write("{\"success\":false,\"message\":\"Invalid Restaurant ID format.\"}");
        }
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
}
