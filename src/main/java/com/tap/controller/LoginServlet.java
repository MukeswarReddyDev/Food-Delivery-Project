package com.tap.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Timestamp;

import com.tap.DAO.UserDAO;
import com.tap.DAOimplementation.UserDAOimplementation;
import com.tap.Model.User;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    private UserDAO userDAO;

    @Override
    public void init() throws ServletException {
        userDAO = new UserDAOimplementation();
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String action = request.getParameter("action");
        if ("logout".equalsIgnoreCase(action)) {
            HttpSession session = request.getSession(false);
            if (session != null) {
                session.invalidate();
            }
            response.sendRedirect("home");
            return;
        }
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String email = request.getParameter("email");
        String password = request.getParameter("password");

        if (email != null && password != null) {
            User user = userDAO.getUserByEmail(email.trim());
            if (user != null && user.getPassword().equals(password.trim())) {
                // Update last login date
                user.setLastLoginDate(new Timestamp(System.currentTimeMillis()));
                userDAO.updateUser(user);

                // Set session
                HttpSession session = request.getSession();
                session.setAttribute("currentUser", user);
                response.sendRedirect("home");
                return;
            }
        }

        request.setAttribute("errorMessage", "Invalid email or password!");
        request.getRequestDispatcher("/login.jsp").forward(request, response);
    }
}
