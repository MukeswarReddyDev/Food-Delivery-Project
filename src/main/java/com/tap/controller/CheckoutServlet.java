package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Map;

import com.tap.DAO.OrderTableDAO;
import com.tap.DAO.OrderItemDAO;
import com.tap.DAO.UserDAO;
import com.tap.DAOimplementation.OrderTableDAOimplementation;
import com.tap.DAOimplementation.OrderItemDAOimplementation;
import com.tap.DAOimplementation.UserDAOimplementation;
import com.tap.Model.User;
import com.tap.Model.Cart;
import com.tap.Model.CartItem;
import com.tap.Model.OrderTable;
import com.tap.Model.OrderItem;

@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private OrderTableDAO orderTableDAO;
    private OrderItemDAO orderItemDAO;
    private UserDAO userDAO;

    @Override
    public void init() throws ServletException {
        orderTableDAO = new OrderTableDAOimplementation();
        orderItemDAO = new OrderItemDAOimplementation();
        userDAO = new UserDAOimplementation();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.sendRedirect("cart");
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession();
        User currentUser = (User) session.getAttribute("currentUser");

        if (currentUser == null) {
            session.setAttribute("errorMessage", "Please log in to place an order!");
            response.sendRedirect("login");
            return;
        }

        Cart cart = (Cart) session.getAttribute("cart");
        if (cart == null || cart.getItems().isEmpty()) {
            response.sendRedirect("cart");
            return;
        }

        String paymentMethod = request.getParameter("paymentMethod");
        String deliveryAddress = request.getParameter("deliveryAddress");

        if (paymentMethod == null || paymentMethod.trim().isEmpty()) {
            paymentMethod = "COD";
        }

        // Update user address if changed
        if (deliveryAddress != null && !deliveryAddress.trim().isEmpty() && !deliveryAddress.trim().equals(currentUser.getAddress())) {
            currentUser.setAddress(deliveryAddress.trim());
            userDAO.updateUser(currentUser);
            session.setAttribute("currentUser", currentUser);
        }

        // Get first item to find restaurant ID (assuming single restaurant cart)
        int restaurantId = 1;
        StringBuilder itemsListBuilder = new StringBuilder();
        for (CartItem ci : cart.getItems().values()) {
            restaurantId = ci.getRestaurantId();
            if (itemsListBuilder.length() > 0) {
                itemsListBuilder.append(", ");
            }
            itemsListBuilder.append(ci.getName()).append(" x").append(ci.getQuantity());
        }

        double subtotal = cart.getSubtotal();
        double deliveryFee = 30.0;
        
        String couponCode = request.getParameter("couponCode");
        if ("FREEDEL".equalsIgnoreCase(couponCode)) {
            deliveryFee = 0.0;
        }
        
        double taxes = Math.round(subtotal * 0.05 + 5.0);
        
        double discount = 0.0;
        String discountParam = request.getParameter("discountAmount");
        if (discountParam != null) {
            try {
                discount = Double.parseDouble(discountParam.trim());
            } catch (NumberFormatException e) {
                discount = (subtotal >= 200.0) ? 100.0 : 0.0;
            }
        } else {
            discount = (subtotal >= 200.0) ? 100.0 : 0.0;
        }
        
        double totalAmount = subtotal + deliveryFee + taxes - discount;
        if (totalAmount < 0.0) {
            totalAmount = 0.0;
        }

        // Create and save Order
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String orderDateStr = sdf.format(new Timestamp(System.currentTimeMillis()));

        OrderTable order = new OrderTable(
            currentUser.getUserId(),
            orderDateStr,
            totalAmount,
            "Preparing",
            paymentMethod,
            restaurantId
        );

        orderTableDAO.addOrder(order);
        int orderId = order.getOrderId();

        // Save Order Items
        if (orderId > 0) {
            for (CartItem ci : cart.getItems().values()) {
                OrderItem orderItem = new OrderItem(
                    0, // auto-increment primary key
                    orderId,
                    ci.getItemId(),
                    ci.getQuantity(),
                    ci.getItemTotal()
                );
                orderItemDAO.addOrderItem(orderItem);
            }
        }

        // Set tracking attributes in session to display in success modal
        session.setAttribute("lastOrderId", "#FH-" + (100000 + orderId));
        session.setAttribute("lastOrderItems", itemsListBuilder.toString());
        session.setAttribute("lastOrderTotal", totalAmount);

        // Clear cart
        cart.clear();

        // Redirect to cart page with success modal hash
        response.sendRedirect("cart#order-success-modal");
    }
}
