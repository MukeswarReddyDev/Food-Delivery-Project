package com.tap.DAO;

import java.util.List;

import com.tap.Model.User;

public interface UserDAO 
     {
	   void addUser(User user);
	   User getUser(int userId);
	   User getUserByEmail(String email);
	   void updateUser(User user);
	   void deleteUser(int userId);
	   List<User> getAllUser();

}
 