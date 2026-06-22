package com.tap.DAO;


import java.util.List;

import com.tap.Model.OrderTable;

public interface OrderTableDAO {
	
	  void addOrder(OrderTable order);

	    OrderTable getOrder(int orderId);

	    List<OrderTable> getAllOrders();

	    void updateOrder(OrderTable order);

	    void deleteOrder(int orderId);

}
