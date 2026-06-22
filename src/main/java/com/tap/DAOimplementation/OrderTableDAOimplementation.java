package com.tap.DAOimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.tap.DAO.OrderTableDAO;
import com.tap.Model.OrderTable;
import com.tap.Utility.DBconnection;

public class OrderTableDAOimplementation implements OrderTableDAO {
	
	 private Connection con = DBconnection.getConnection();

	    @Override
	    public void addOrder(OrderTable order) {

	        String sql =
	        "insert into ordertable(userId,orderDate,totalAmount,status,paymentMethod,restaurantId) values(?,?,?,?,?,?)";

	        try {

	            PreparedStatement ps =
	            con.prepareStatement(sql, java.sql.Statement.RETURN_GENERATED_KEYS);

	            ps.setInt(1, order.getUserId());
	            ps.setString(2, order.getOrderDate());
	            ps.setDouble(3, order.getTotalAmount());
	            ps.setString(4, order.getStatus());
	            ps.setString(5, order.getPaymentMethod());
	            ps.setInt(6, order.getRestaurantId());

	            ps.executeUpdate();

	            java.sql.ResultSet rs = ps.getGeneratedKeys();
	            if (rs.next()) {
	                order.setOrderId(rs.getInt(1));
	            }

	        } catch(Exception e) {
	            e.printStackTrace();
	        }
	    }

	    @Override
	    public OrderTable getOrder(int orderId) {

	        OrderTable order = null;

	        try {

	            String sql =
	            "select * from ordertable where orderId=?";

	            PreparedStatement ps =
	            con.prepareStatement(sql);

	            ps.setInt(1, orderId);

	            ResultSet rs = ps.executeQuery();

	            if(rs.next()) {

	                order = new OrderTable(
	                    rs.getInt("orderId"),
	                    rs.getInt("userId"),
	                    rs.getString("orderDate"),
	                    rs.getDouble("totalAmount"),
	                    rs.getString("status"),
	                    rs.getString("paymentMethod"),
	                    rs.getInt("restaurantId")
	                );
	            }

	        } catch(Exception e) {
	            e.printStackTrace();
	        }

	        return order;
	    }

	    @Override
	    public List<OrderTable> getAllOrders() {

	        List<OrderTable> list =
	        new ArrayList<>();

	        try {

	            Statement st =
	            con.createStatement();

	            ResultSet rs =
	            st.executeQuery("select * from ordertable");

	            while(rs.next()) {

	                list.add(
	                    new OrderTable(
	                        rs.getInt("orderId"),
	                        rs.getInt("userId"),
	                        rs.getString("orderDate"),
	                        rs.getDouble("totalAmount"),
	                        rs.getString("status"),
	                        rs.getString("paymentMethod"),
	                        rs.getInt("restaurantId")
	                    )
	                );
	            }

	        } catch(Exception e) {
	            e.printStackTrace();
	        }

	        return list;
	    }

	    @Override
	    public void updateOrder(OrderTable order) {

	        try {

	            String sql =
	            "update ordertable set userId=?,orderDate=?,totalAmount=?,status=?,paymentMethod=?,restaurantId=? where orderId=?";

	            PreparedStatement ps =
	            con.prepareStatement(sql);

	            ps.setInt(1, order.getUserId());
	            ps.setString(2, order.getOrderDate());
	            ps.setDouble(3, order.getTotalAmount());
	            ps.setString(4, order.getStatus());
	            ps.setString(5, order.getPaymentMethod());
	            ps.setInt(6, order.getRestaurantId());
	            ps.setInt(7, order.getOrderId());

	            ps.executeUpdate();

	        } catch(Exception e) {
	            e.printStackTrace();
	        }
	    }

	    @Override
	    public void deleteOrder(int orderId) {

	        try {

	            String sql =
	            "delete from ordertable where orderId=?";

	            PreparedStatement ps =
	            con.prepareStatement(sql);

	            ps.setInt(1, orderId);

	            ps.executeUpdate();

	        } catch(Exception e) {
	            e.printStackTrace();
	        }
	    }
	}


