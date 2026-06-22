package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

import com.tap.DAO.RestaurantDAO;
import com.tap.DAO.MenuDAO;
import com.tap.DAOimplementation.RestaurantDAOimplementation;
import com.tap.DAOimplementation.MenuDAOimplementation;
import com.tap.Model.Restaurant;
import com.tap.Model.Menu;

@WebServlet("/restaurant-details")
public class RestaurantDetailsServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private RestaurantDAO restaurantDAO;
    private MenuDAO menuDAO;

    @Override
    public void init() throws ServletException {
        restaurantDAO = new RestaurantDAOimplementation();
        menuDAO = new MenuDAOimplementation();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String resIdParam = request.getParameter("restaurantId");
        if (resIdParam == null) {
            resIdParam = request.getParameter("id");
        }

        if (resIdParam != null && !resIdParam.trim().isEmpty()) {
            try {
                int resId = Integer.parseInt(resIdParam);
                Restaurant restaurant = restaurantDAO.getRestaurent(resId);
                List<Menu> menuList = menuDAO.getMenuByRestaurant(resId);

                if (restaurant != null) {
                    request.setAttribute("restaurant", restaurant);
                    request.setAttribute("menuList", menuList);
                    request.getRequestDispatcher("/restaurant-details.jsp").forward(request, response);
                    return;
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        }
        // Redirect home if no valid restaurant is selected
        response.sendRedirect("home");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
