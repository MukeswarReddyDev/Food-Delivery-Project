package com.tap.DAOimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.tap.DAO.MenuDAO;
import com.tap.Model.Menu;
import com.tap.Utility.DBconnection;

public class MenuDAOimplementation implements MenuDAO {
	
	
	Connection con  = DBconnection.getConnection();

	@Override
	public void addMenu(Menu menu) {
		
		String insert_query = "insert into menu(restaurantId,itemName,description,price,isAvailable,imagePath) values(?,?,?,?,?,?)";
		
		try
		{
			PreparedStatement psmt = con.prepareStatement(insert_query);
			
			psmt.setInt(1, menu.getRestaurentId());
			psmt.setString(2, menu.getItemName());
			psmt.setString(3, menu.getDescription());
			psmt.setDouble(4, menu.getPrice());
			psmt.setBoolean(5, menu.getIsAvailable());
			psmt.setString(6, menu.getImagePath());
			
			psmt.executeUpdate();
			
		
	   }
		catch(SQLException e)
		{
			e.printStackTrace();
		}
	}

	@Override
	public Menu getMenu(int menuId) {
		
		String get_query = "select * from menu where menuId = ?";
		
		Menu menu = null;
		
		
		
		try
		{
			PreparedStatement psmt = con.prepareStatement(get_query);
			psmt.setInt(1,menuId);
			
		    ResultSet res = psmt.executeQuery();
		    
		    if(res.next())
		    {
		    	menu = new Menu();
		    	menu.setMenuId(res.getInt("menuId"));
		    	menu.setRestaurentId(res.getInt("restaurantId"));
		    	menu.setItemName(res.getString("itemName"));
		    	menu.setDescription(res.getString("description"));
		    	menu.setPrice(res.getDouble("price"));
		    	menu.setAvailable(res.getBoolean("isAvailable"));
		    	menu.setImagePath(res.getString("imagePath"));
		    	
		    	
		    	
		    }
			
			
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		
		return menu;
	}

	@Override
	public void updateMenu(Menu menu) {
		
		String update_query = "update menu set restaurantId = ?, itemName = ?, description = ?, price = ?, isAvailable = ?, imagePath = ? where menuId = ?";
		
	       try {
			PreparedStatement psmt = con.prepareStatement(update_query);
			
			psmt.setInt(1, menu.getRestaurentId());
			psmt.setString(2, menu.getItemName());
			psmt.setString(3, menu.getDescription());
			psmt.setDouble(4, menu.getPrice());
			psmt.setBoolean(5, menu.getIsAvailable());
			psmt.setString(6, menu.getImagePath());
			psmt.setInt(7, menu.getMenuId());
			
			psmt.executeUpdate();
			
			System.out.println("Menu updated");
	
		} 
	       
  
	       catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		
	}

	@Override
	public void deleteMenu(int menuId) {
		
		String delete_query = "delete from menu where menuId = ?";
		try
		{
			PreparedStatement psmt = con.prepareStatement(delete_query);
			
			psmt.setInt(1, menuId);
			
			psmt.executeUpdate();
			
			System.out.println("Menu deleted successfully");
			
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		
	}

	@Override
	public List<Menu> getAllMenu() {
		
		String select_query = "select * from menu";
		
		List <Menu> menuList = new ArrayList<>(); 
		
		
		
		try {
			
			 Statement psmt = con.createStatement();

	         ResultSet res = psmt.executeQuery(select_query);
			while(res.next())
			{
	         
		        Menu  menu = new Menu();
		     	
		    	menu.setMenuId(res.getInt("menuId"));
		    	menu.setRestaurentId(res.getInt("restaurantId"));
		    	menu.setItemName(res.getString("itemName"));
		    	menu.setDescription(res.getString("description"));
		    	menu.setPrice(res.getDouble("price"));
		    	menu.setAvailable(res.getBoolean("isAvailable"));
		    	menu.setImagePath(res.getString("imagePath"));
		    	
		     	menuList.add(menu);
		     	
	
			}
		
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		
		return menuList;
		
	}

	@Override
	public List<Menu> getMenuByRestaurant(int restaurantId) {
		String query = "select * from menu where restaurantId = ?";
		List<Menu> menuList = new ArrayList<>();
		try {
			PreparedStatement psmt = con.prepareStatement(query);
			psmt.setInt(1, restaurantId);
			ResultSet res = psmt.executeQuery();
			while (res.next()) {
				Menu menu = new Menu();
				menu.setMenuId(res.getInt("menuId"));
				menu.setRestaurentId(res.getInt("restaurantId"));
				menu.setItemName(res.getString("itemName"));
				menu.setDescription(res.getString("description"));
				menu.setPrice(res.getDouble("price"));
				menu.setAvailable(res.getBoolean("isAvailable"));
				menu.setImagePath(res.getString("imagePath"));
				menuList.add(menu);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return menuList;
	}
}
