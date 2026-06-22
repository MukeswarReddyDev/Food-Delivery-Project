package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

import com.tap.DAO.MenuDAO;
import com.tap.DAOimplementation.MenuDAOimplementation;
import com.tap.Model.Menu;
import com.tap.Model.Cart;
import com.tap.Model.CartItem;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private MenuDAO menuDAO;

    @Override
    public void init() throws ServletException {
        menuDAO = new MenuDAOimplementation();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }
        request.getRequestDispatcher("/cart.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null) {
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        String action = request.getParameter("action");
        String menuIdParam = request.getParameter("menuId");

        if (action != null && menuIdParam != null) {
            try {
                int menuId = Integer.parseInt(menuIdParam);

                if ("add".equalsIgnoreCase(action)) {
                    Menu menu = menuDAO.getMenu(menuId);
                    if (menu != null) {
                        CartItem item = new CartItem(
                            menu.getMenuId(),
                            menu.getRestaurentId(),
                            menu.getItemName(),
                            menu.getImagePath(),
                            menu.getPrice(),
                            1
                        );
                        cart.addItem(item);
                    }
                } else if ("update".equalsIgnoreCase(action)) {
                    String quantityParam = request.getParameter("quantity");
                    if (quantityParam != null) {
                        int quantity = Integer.parseInt(quantityParam);
                        cart.updateItem(menuId, quantity);
                    }
                } else if ("remove".equalsIgnoreCase(action)) {
                    cart.removeItem(menuId);
                }
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
        } else if ("clear".equalsIgnoreCase(action)) {
            cart.clear();
        }

        // Check if request is AJAX
        String isAjax = request.getParameter("ajax");
        if ("true".equalsIgnoreCase(isAjax)) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            
            // Return cart size and subtotal
            int totalItems = 0;
            for (CartItem ci : cart.getItems().values()) {
                totalItems += ci.getQuantity();
            }
            double subtotal = cart.getSubtotal();
            
            response.getWriter().write(String.format("{\"success\":true, \"totalItems\":%d, \"subtotal\":%.2f}", totalItems, subtotal));
        } else {
            response.sendRedirect("cart");
        }
    }
}
