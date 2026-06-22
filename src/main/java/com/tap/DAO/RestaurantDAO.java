package com.tap.DAO;

import java.util.List;

import com.tap.Model.Restaurant;

public interface RestaurantDAO 
   {
	   void addRestaurent(Restaurant restaurent);
	   Restaurant getRestaurent(int restaurentId);
	   void updateRestaurent(Restaurant restaurent);
	   void deleteRestaurent(int restaurentId);
	   List<Restaurant> getAllRestaurent();

}
