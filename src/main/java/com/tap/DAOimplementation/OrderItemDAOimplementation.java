package com.tap.DAOimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.tap.DAO.OrderItemDAO;
import com.tap.Model.OrderItem;
import com.tap.Utility.DBconnection;

public class OrderItemDAOimplementation implements OrderItemDAO {
	
	Connection con = DBconnection.getConnection();

	@Override
	public void addOrderItem(OrderItem orderItem) {
		
		
		String insert_query = "insert into orderitem(orderItemId,orderId,menuId,quantity,itemTotal) values(?,?,?,?,?)";
		
		try
		{
			PreparedStatement psmt = con.prepareStatement(insert_query);
			
			psmt.setInt(1,orderItem.getOrderItemId());
			psmt.setInt(2, orderItem.getOrderId());
			psmt.setInt(3, orderItem.getMenuId());
			psmt.setInt(4, orderItem.getQuantity());
			psmt.setDouble(5, orderItem.getItemTotal());
			
			
			psmt.executeUpdate();
			
			
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		                        
		
		
		
		
	}

	@Override
	public OrderItem getOrderItem(int orderItemId) {
		
		String get_query = "select * from orderitem where orderItemId = ?";
		 
		OrderItem orderItem = null;
		
		try
		{
			PreparedStatement psmt = con.prepareStatement(get_query);
			
			psmt.setInt(1, orderItemId);
			
			
			
			ResultSet res = psmt.executeQuery();
			
			while(res.next())
			{
				orderItem = new OrderItem();
				
				orderItem.setOrderItemId(res.getInt("orderItemId"));
				orderItem.setOrderId(res.getInt("orderId"));
				orderItem.setMenuId(res.getInt("menuId"));
				orderItem.setQuantity(res.getInt("quantity"));
				orderItem.setItemTotal(res.getDouble("itemTotal"));
				

			}
			
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		
		return orderItem;
	}

	@Override
	public void updateOrderItem(OrderItem orderItem) {
		
		String update_query = "update orderitem set orderId = ? , menuId = ? , quantity = ? , itemTotal = ? where orderItemId = ?";
		
		try
		{
			PreparedStatement psmt = con.prepareStatement(update_query);
			
			psmt.setInt(1, orderItem.getOrderId());
			psmt.setInt(2, orderItem.getMenuId());
			psmt.setInt(3, orderItem.getQuantity());
			psmt.setDouble(4, orderItem.getItemTotal());
			psmt.setInt(5, orderItem.getOrderItemId());
			
			psmt.executeUpdate();
			
			System.out.println("OrderItem Updated");
			
		}
		
	    catch(SQLException e)
		{
	    	e.printStackTrace();
		}
		
		
	}

	@Override
	public void deleteOrderItem(int orderItemId) {
		
		String delete_query = "delete from orderitem where orderItemId = ?";
		
		try
		{
			PreparedStatement psmt = con.prepareStatement(delete_query);
			psmt.setInt(1, orderItemId);
			psmt.executeUpdate();
			
			System.out.println("OrderItem Deleted Successfully");
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		
		
		
	}

	@Override
	public List<OrderItem> getAllOrderItem() {
		
		String get_all = "select * from orderitem";
		
		List<OrderItem> orderItem1 = new ArrayList<>();
		
		try
		{
			Statement smt = con.createStatement();
			
			 ResultSet res = smt.executeQuery(get_all);
			 
			 while(res.next())
			 {
				    OrderItem orderItem = new OrderItem();
				    orderItem.setOrderItemId(res.getInt("orderItemId"));
					orderItem.setOrderId(res.getInt("orderId"));
					orderItem.setMenuId(res.getInt("menuId"));
					orderItem.setQuantity(res.getInt("quantity"));
					orderItem.setItemTotal(res.getDouble("itemTotal"));
					
					orderItem1.add(orderItem);
				 
			 }
		}
		catch(SQLException e)
		{
			e.printStackTrace();
		}
		
		return orderItem1;
	}

}
