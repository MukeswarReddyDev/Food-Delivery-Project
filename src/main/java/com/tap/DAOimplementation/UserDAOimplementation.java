package com.tap.DAOimplementation;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import com.tap.DAO.UserDAO;
import com.tap.Model.User;
import com.tap.Utility.DBconnection;

public class UserDAOimplementation implements UserDAO 
    {

	@Override
	public void addUser(User user) 
	 {
		String insert_query = "insert into user(userName,email,password,address,"
				+" role,createdDate,lastLoginDate) values( ?,?,?,?,?,?,?)";
		
		Connection con  = DBconnection.getConnection();
		try {
			PreparedStatement psmt = con.prepareStatement(insert_query);
			
			psmt.setString(1, user.getUserName());
			psmt.setString(2, user.getEmail());
			psmt.setString(3, user.getPassword());
			psmt.setString(4, user.getAddress());
			psmt.setString(5, user.getRole());
			Timestamp currentDate = new Timestamp(System.currentTimeMillis());
			psmt.setTimestamp(6, currentDate);
			psmt.setTimestamp(7, currentDate);
			
			psmt.executeUpdate();
			
		}
	catch (SQLException e) {
			
			e.printStackTrace();
		}
		
		
	}

	@Override
	public User getUser(int userId)
	   {
		 String select_query = "select * from user where userId = ?";
		 
		 Connection con = DBconnection.getConnection();
		 
		  User user = null;

	        try {

	            PreparedStatement psmt = con.prepareStatement(select_query);

	            psmt.setInt(1, userId);

	            ResultSet res = psmt.executeQuery();

	            if (res.next()) {

	                user = new User();

	                user.setUserId(res.getInt("userId"));
	                user.setUserName(res.getString("userName"));
	                user.setEmail(res.getString("email"));
	                user.setPassword(res.getString("password"));
	                user.setAddress(res.getString("address"));
	                user.setRole(res.getString("role"));
	                user.setCreatedDate(res.getTimestamp("createdDate"));
	                user.setLastLoginDate(res.getTimestamp("lastLoginDate"));
	            }

	        } catch (SQLException e) {

	            e.printStackTrace();
	        }

	        return user;
	    }

	@Override
	public void updateUser(User user) {
		  String update_query = "update user set userName=?,email=?,password=?,"
	                + "address=?,role=?,lastLoginDate=? where userId=?";

	        Connection con = DBconnection.getConnection();

	        try {

	            PreparedStatement psmt = con.prepareStatement(update_query);

	            psmt.setString(1, user.getUserName());
	            psmt.setString(2, user.getEmail());
	            psmt.setString(3, user.getPassword());
	            psmt.setString(4, user.getAddress());
	            psmt.setString(5, user.getRole());

	            Timestamp currentDate = new Timestamp(System.currentTimeMillis());

	            psmt.setTimestamp(6, currentDate);

	            psmt.setInt(7, user.getUserId());

	            psmt.executeUpdate();

	            System.out.println("User Updated Successfully");

	        } catch (SQLException e) {

	            e.printStackTrace();
	        }
	    }

	@Override
	public void deleteUser(int userId) {
		String delete_query = "delete from user where userId=?";

        Connection con = DBconnection.getConnection();

        try {

            PreparedStatement psmt = con.prepareStatement(delete_query);

            psmt.setInt(1, userId);

            psmt.executeUpdate();

            System.out.println("User Deleted Successfully");

        } catch (SQLException e) {

            e.printStackTrace();
        }
    }

	

	@Override
	public List<User> getAllUser() {

        String select_query = "select * from user";

        Connection con = DBconnection.getConnection();

        List<User> userList = new ArrayList<>();

        try {

            Statement psmt = con.createStatement();

            ResultSet res = psmt.executeQuery(select_query);

            while (res.next()) {

                User user = new User();

                user.setUserId(res.getInt("userId"));
                user.setUserName(res.getString("userName"));
                user.setEmail(res.getString("email"));
                user.setPassword(res.getString("password"));
                user.setAddress(res.getString("address"));
                user.setRole(res.getString("role"));
                user.setCreatedDate(res.getTimestamp("createdDate"));
                user.setLastLoginDate(res.getTimestamp("lastLoginDate"));

                userList.add(user);
            }

        } catch (SQLException e) {

            e.printStackTrace();
        }

        return userList;
    }

	@Override
	public User getUserByEmail(String email) {
		String query = "select * from user where email = ?";
		Connection con = DBconnection.getConnection();
		User user = null;
		try {
			PreparedStatement psmt = con.prepareStatement(query);
			psmt.setString(1, email);
			ResultSet res = psmt.executeQuery();
			if (res.next()) {
				user = new User();
				user.setUserId(res.getInt("userId"));
				user.setUserName(res.getString("userName"));
				user.setEmail(res.getString("email"));
				user.setPassword(res.getString("password"));
				user.setAddress(res.getString("address"));
				user.setRole(res.getString("role"));
				user.setCreatedDate(res.getTimestamp("createdDate"));
				user.setLastLoginDate(res.getTimestamp("lastLoginDate"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return user;
	}
}
