package com.tap.Utility;

import java.util.Scanner;

import java.util.List;

import com.tap.DAOimplementation.UserDAOimplementation;
import com.tap.Model.User;

public class Launch {

	public static void main(String[] args) {
		
		Scanner scan = new Scanner(System.in);
		UserDAOimplementation udo = new UserDAOimplementation();
		
		while (true) {

			
			System.out.println("1. Add User");
			System.out.println("2. Get User");
			System.out.println("3. Update User");
			System.out.println("4. Delete User");
			System.out.println("5. Get All Users");
			System.out.println("6. Exit");

			System.out.println("Enter Your Choice:");
			int choice = scan.nextInt();
			scan.nextLine();

			switch (choice) {

			// ADD USER
			case 1:

				System.out.println("Enter the UserName");
				String username = scan.nextLine();

				System.out.println("Enter the Email");
				String email = scan.nextLine();

				System.out.println("Enter the Password");
				String password = scan.nextLine();

				System.out.println("Enter the Address");
				String address = scan.nextLine();

				System.out.println("Enter the Role");
				String role = scan.nextLine();

				User u = new User(username, email, password, address, role, null, null);

				udo.addUser(u);

				System.out.println("User Added");
				break;

			// GET USER
			case 2:

				System.out.println("Enter User ID");
				int getId = scan.nextInt();

				User user = udo.getUser(getId);

				if (user != null) {
					System.out.println(user);
				} else {
					System.out.println("User Not Found");
				}

				break;

			// UPDATE USER
			case 3:

				System.out.println("Enter User ID to Update");
				int updateId = scan.nextInt();
				scan.nextLine();

				System.out.println("Enter New UserName");
				String newUsername = scan.nextLine();

				System.out.println("Enter New Email");
				String newEmail = scan.nextLine();

				System.out.println("Enter New Password");
				String newPassword = scan.nextLine();

				System.out.println("Enter New Address");
				String newAddress = scan.nextLine();

				System.out.println("Enter New Role");
				String newRole = scan.nextLine();

				User updateUser = new User(newUsername, newEmail, newPassword,
						newAddress, newRole, null, null);

				updateUser.setUserId(updateId);

				udo.updateUser(updateUser);

				break;

			// DELETE USER
			case 4:

				System.out.println("Enter User ID to Delete");
				int deleteId = scan.nextInt();

				udo.deleteUser(deleteId);

				break;

			// GET ALL USERS
			case 5:

				List<User> userList = udo.getAllUser();

				for (User us : userList) {

					System.out.println(us);
				}

				break;

			// EXIT
			case 6:

				System.out.println("Thank You");
				scan.close();
				System.exit(0);

			default:

				System.out.println("Invalid Choice");
			}
		}
	}
}