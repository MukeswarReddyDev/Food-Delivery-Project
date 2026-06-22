package com.tap.DAO;

import java.util.List;

import com.tap.Model.OrderItem;


public interface OrderItemDAO {
	
	void addOrderItem(OrderItem orderItem);
	   OrderItem getOrderItem(int orderItemId);
	   void updateOrderItem(OrderItem orderItem);
	   void deleteOrderItem(int orderItemId);
	   List<OrderItem> getAllOrderItem();

}
