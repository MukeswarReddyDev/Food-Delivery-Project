package com.tap.Utility;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBconnection {
	
	private static final String URL = "jdbc:mysql://localhost:3306/food_delivary_applicaton";
	private static final String USERNAME = "root";
	private static final String PASSWORD = "root";
	
	private static Connection connection;

	public static Connection getConnection()
	{
		try
		{
			Class.forName("com.mysql.cj.jdbc.Driver");
			connection = DriverManager.getConnection(URL,USERNAME,PASSWORD);
		}
		catch(Exception e)
		{
			 e.printStackTrace();
		}
		return connection;
	}
}
