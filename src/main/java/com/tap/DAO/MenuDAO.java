package com.tap.DAO;

import java.util.List;

import com.tap.Model.Menu;

public interface MenuDAO {

	void addMenu(Menu menu);

	Menu getMenu(int menuId);

	void updateMenu(Menu menu);

	void deleteMenu(int menuId);

	List<Menu> getAllMenu();

	List<Menu> getMenuByRestaurant(int restaurantId);

}
