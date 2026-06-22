package com.tap.DAOimplementation;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.tap.DAO.RestaurantDAO;
import com.tap.Model.Restaurant;
import com.tap.Utility.DBconnection;

public class RestaurantDAOimplementation implements RestaurantDAO{

	private static final String INSERT_QUERY =
			"INSERT INTO restaurant(restaurantName,cousineType,delivaryTime,address,imagePath,rating,isActive) VALUES(?,?,?,?,?,?,?)";

	private static final String GET_QUERY =
			"SELECT * FROM restaurant WHERE restaurantId=?";

	private static final String UPDATE_QUERY =
			"UPDATE restaurant SET restaurantName=?,cousineType=?,delivaryTime=?,address=?,imagePath=?,rating=?,isActive=? WHERE restaurantId=?";

	private static final String DELETE_QUERY =
			"DELETE FROM restaurant WHERE restaurantId=?";

	private static final String GETALL_QUERY =
			"SELECT * FROM restaurant";

	Connection con;

	public RestaurantDAOimplementation() {

		con = DBconnection.getConnection();
	}

	@Override
	public void addRestaurent(Restaurant restaurent) {

		try {

			PreparedStatement pstmt = con.prepareStatement(INSERT_QUERY);

			pstmt.setString(1, restaurent.getRestaurantName());
			pstmt.setString(2, restaurent.getCausinType());
			pstmt.setInt(3, restaurent.getDelivaryTime());
			pstmt.setString(4, restaurent.getAddress());
			pstmt.setString(5, restaurent.getimagePath());
			pstmt.setDouble(6, restaurent.getRating());
			pstmt.setBoolean(7, restaurent.isActive());

			int x = pstmt.executeUpdate();

			System.out.println(x + " Row Inserted");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Restaurant getRestaurent(int restaurentId) {

		Restaurant r = null;

		try {

			PreparedStatement pstmt = con.prepareStatement(GET_QUERY);

			pstmt.setInt(1, restaurentId);

			ResultSet res = pstmt.executeQuery();

			while (res.next()) {

				int id = res.getInt("restaurantId");
				String name = res.getString("restaurantName");
				String causin = res.getString("cousineType");
				int time = res.getInt("delivaryTime");
				String address = res.getString("address");
				String imagePath = res.getString("imagePath");
				double rating = res.getDouble("rating");
				boolean active = res.getBoolean("isActive");

				r = new Restaurant(name, causin, time,
						address, imagePath, rating, active);

				r.setRestaurantId(id);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return r;
	}

	@Override
	public void updateRestaurent(Restaurant restaurent) {

		try {

			PreparedStatement pstmt = con.prepareStatement(UPDATE_QUERY);

			pstmt.setString(1, restaurent.getRestaurantName());
			pstmt.setString(2, restaurent.getCausinType());
			pstmt.setInt(3, restaurent.getDelivaryTime());
			pstmt.setString(4, restaurent.getAddress());
			pstmt.setString(5, restaurent.getimagePath());
			pstmt.setDouble(6, restaurent.getRating());
			pstmt.setBoolean(7, restaurent.isActive());

			pstmt.setInt(8, restaurent.getRestaurantId());

			int x = pstmt.executeUpdate();

			System.out.println(x + " Row Updated");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void deleteRestaurent(int restaurentId) {

		try {

			PreparedStatement pstmt = con.prepareStatement(DELETE_QUERY);

			pstmt.setInt(1, restaurentId);

			int x = pstmt.executeUpdate();

			System.out.println(x + " Row Deleted");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Restaurant> getAllRestaurent() {

		List<Restaurant> restaurantList = new ArrayList<>();

		try {

			Statement stmt = con.createStatement();

			ResultSet res = stmt.executeQuery(GETALL_QUERY);

			while (res.next()) {

				int id = res.getInt("restaurantId");
				String name = res.getString("restaurantName");
				String causin = res.getString("cousineType");
				int time = res.getInt("delivaryTime");
				String address = res.getString("address");
				String imagePath = res.getString("imagePath");
				double rating = res.getDouble("rating");
				boolean active = res.getBoolean("isActive");

				Restaurant r = new Restaurant(name, causin,
						time, address,imagePath , rating, active);

				r.setRestaurantId(id);

				restaurantList.add(r);
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return restaurantList;
	}
}