package com.tap.DAOimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import com.tap.DAO.FavoriteDAO;
import com.tap.Utility.DBconnection;

public class FavoriteDAOimplementation implements FavoriteDAO {

    @Override
    public boolean addFavorite(int userId, int restaurantId) {
        String query = "INSERT INTO favorite_restaurants (userId, restaurantId) VALUES (?, ?)";
        try (Connection con = DBconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement(query)) {
            pstmt.setInt(1, userId);
            pstmt.setInt(2, restaurantId);
            return pstmt.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public boolean removeFavorite(int userId, int restaurantId) {
        String query = "DELETE FROM favorite_restaurants WHERE userId = ? AND restaurantId = ?";
        try (Connection con = DBconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement(query)) {
            pstmt.setInt(1, userId);
            pstmt.setInt(2, restaurantId);
            return pstmt.executeUpdate() > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public List<Integer> getFavoriteRestaurantIds(int userId) {
        List<Integer> list = new ArrayList<>();
        String query = "SELECT restaurantId FROM favorite_restaurants WHERE userId = ?";
        try (Connection con = DBconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement(query)) {
            pstmt.setInt(1, userId);
            try (ResultSet rs = pstmt.executeQuery()) {
                while (rs.next()) {
                    list.add(rs.getInt("restaurantId"));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    @Override
    public boolean isFavorite(int userId, int restaurantId) {
        String query = "SELECT 1 FROM favorite_restaurants WHERE userId = ? AND restaurantId = ?";
        try (Connection con = DBconnection.getConnection();
             PreparedStatement pstmt = con.prepareStatement(query)) {
            pstmt.setInt(1, userId);
            pstmt.setInt(2, restaurantId);
            try (ResultSet rs = pstmt.executeQuery()) {
                return rs.next();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
