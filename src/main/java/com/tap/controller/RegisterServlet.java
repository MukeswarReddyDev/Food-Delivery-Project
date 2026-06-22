package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Timestamp;

import com.tap.DAO.UserDAO;
import com.tap.DAOimplementation.UserDAOimplementation;
import com.tap.Model.User;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDAO;

    @Override
    public void init() throws ServletException {
        userDAO = new UserDAOimplementation();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.getRequestDispatcher("/register.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String address = request.getParameter("address");
        String role = request.getParameter("role");

        if (role == null || role.trim().isEmpty()) {
            role = "customer";
        }

        if (username != null && email != null && password != null) {
            User existing = userDAO.getUserByEmail(email.trim());
            if (existing != null) {
                request.setAttribute("errorMessage", "Email is already registered!");
                request.getRequestDispatcher("/register.jsp").forward(request, response);
                return;
            }

            Timestamp currentTime = new Timestamp(System.currentTimeMillis());
            User newUser = new User(
                username.trim(),
                email.trim(),
                password.trim(),
                address != null ? address.trim() : "",
                role.trim(),
                currentTime,
                currentTime
            );

            userDAO.addUser(newUser);
            response.sendRedirect("login?registered=true");
            return;
        }

        request.setAttribute("errorMessage", "All required fields must be filled!");
        request.getRequestDispatcher("/register.jsp").forward(request, response);
    }
}
