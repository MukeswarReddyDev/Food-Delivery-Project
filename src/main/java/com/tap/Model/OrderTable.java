package com.tap.Model;

public class OrderTable {
	
	 private int orderId;
	    private int userId;
	    private String orderDate;
	    private double totalAmount;
	    private String status;
	    private String paymentMethod;
	    private int restaurantId;

	    public OrderTable() {
	    }

	    // For INSERT (without orderId)
	    public OrderTable(int userId,
	                      String orderDate,
	                      double totalAmount,
	                      String status,
	                      String paymentMethod,
	                      int restaurantId) {

	        this.userId = userId;
	        this.orderDate = orderDate;
	        this.totalAmount = totalAmount;
	        this.status = status;
	        this.paymentMethod = paymentMethod;
	        this.restaurantId = restaurantId;
	    }

	    // For SELECT, UPDATE
	    public OrderTable(int orderId,
	                      int userId,
	                      String orderDate,
	                      double totalAmount,
	                      String status,
	                      String paymentMethod,
	                      int restaurantId) {

	        this.orderId = orderId;
	        this.userId = userId;
	        this.orderDate = orderDate;
	        this.totalAmount = totalAmount;
	        this.status = status;
	        this.paymentMethod = paymentMethod;
	        this.restaurantId = restaurantId;
	    }

	    public int getOrderId() {
	        return orderId;
	    }

	    public void setOrderId(int orderId) {
	        this.orderId = orderId;
	    }

	    public int getUserId() {
	        return userId;
	    }

	    public void setUserId(int userId) {
	        this.userId = userId;
	    }

	    public String getOrderDate() {
	        return orderDate;
	    }

	    public void setOrderDate(String orderDate) {
	        this.orderDate = orderDate;
	    }

	    public double getTotalAmount() {
	        return totalAmount;
	    }

	    public void setTotalAmount(double totalAmount) {
	        this.totalAmount = totalAmount;
	    }

	    public String getStatus() {
	        return status;
	    }

	    public void setStatus(String status) {
	        this.status = status;
	    }

	    public String getPaymentMethod() {
	        return paymentMethod;
	    }

	    public void setPaymentMethod(String paymentMethod) {
	        this.paymentMethod = paymentMethod;
	    }

	    public int getRestaurantId() {
	        return restaurantId;
	    }

	    public void setRestaurantId(int restaurantId) {
	        this.restaurantId = restaurantId;
	    }
	}


