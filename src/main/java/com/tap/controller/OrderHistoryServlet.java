package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tap.Model.User;
import com.tap.Utility.DBconnection;

@WebServlet("/orders")
public class OrderHistoryServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);
        User currentUser = (session != null) ? (User) session.getAttribute("currentUser") : null;

        if (currentUser == null) {
            response.sendRedirect("login");
            return;
        }

        Connection con = DBconnection.getConnection();
        List<Map<String, Object>> orderHistory = new ArrayList<>();

        if (con != null) {
            String orderSql = "SELECT * FROM ordertable WHERE userId = ? ORDER BY orderId DESC";
            try {
                PreparedStatement psOrder = con.prepareStatement(orderSql);
                psOrder.setInt(1, currentUser.getUserId());
                ResultSet rsOrder = psOrder.executeQuery();

                while (rsOrder.next()) {
                    Map<String, Object> orderMap = new HashMap<>();
                    int orderId = rsOrder.getInt("orderId");
                    int restaurantId = rsOrder.getInt("restaurantId");
                    
                    orderMap.put("orderId", orderId);
                    orderMap.put("orderDate", rsOrder.getString("orderDate"));
                    orderMap.put("totalAmount", rsOrder.getDouble("totalAmount"));
                    orderMap.put("status", rsOrder.getString("status"));
                    orderMap.put("paymentMethod", rsOrder.getString("paymentMethod"));

                    // Get restaurant name
                    String restSql = "SELECT restaurantName FROM restaurant WHERE restaurantId = ?";
                    PreparedStatement psRest = con.prepareStatement(restSql);
                    psRest.setInt(1, restaurantId);
                    ResultSet rsRest = psRest.executeQuery();
                    String restaurantName = "Unknown Restaurant";
                    if (rsRest.next()) {
                         restaurantName = rsRest.getString("restaurantName");
                    }
                    orderMap.put("restaurantName", restaurantName);
                    rsRest.close();
                    psRest.close();

                    // Get order items
                    List<Map<String, Object>> itemsList = new ArrayList<>();
                    String itemsSql = "SELECT oi.*, m.itemName FROM orderitem oi JOIN menu m ON oi.menuId = m.menuId WHERE oi.orderId = ?";
                    PreparedStatement psItems = con.prepareStatement(itemsSql);
                    psItems.setInt(1, orderId);
                    ResultSet rsItems = psItems.executeQuery();

                    while (rsItems.next()) {
                        Map<String, Object> itemMap = new HashMap<>();
                        itemMap.put("itemName", rsItems.getString("itemName"));
                        itemMap.put("quantity", rsItems.getInt("quantity"));
                        itemMap.put("itemTotal", rsItems.getDouble("itemTotal"));
                        itemsList.add(itemMap);
                    }
                    orderMap.put("items", itemsList);
                    rsItems.close();
                    psItems.close();

                    orderHistory.add(orderMap);
                }
                rsOrder.close();
                psOrder.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        request.setAttribute("orderHistory", orderHistory);
        request.getRequestDispatcher("/orders.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }
}
