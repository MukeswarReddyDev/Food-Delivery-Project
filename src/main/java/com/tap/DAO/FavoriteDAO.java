package com.tap.DAO;

import java.util.List;

public interface FavoriteDAO {
    boolean addFavorite(int userId, int restaurantId);
    boolean removeFavorite(int userId, int restaurantId);
    List<Integer> getFavoriteRestaurantIds(int userId);
    boolean isFavorite(int userId, int restaurantId);
}
