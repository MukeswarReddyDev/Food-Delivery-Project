package com.tap.Utility;

import java.util.List;
import java.util.Scanner;


import com.tap.DAO.OrderTableDAO;
import com.tap.DAOimplementation.OrderTableDAOimplementation;
import com.tap.Model.OrderTable;

public class LaunchOrderTable {
	
	 public static void main(String[] args) {

	        Scanner sc = new Scanner(System.in);

	        OrderTableDAO dao = new OrderTableDAOimplementation();

	        while(true) {

	            System.out.println("\n===== ORDER TABLE MENU =====");
	            System.out.println("1. Add Order");
	            System.out.println("2. Get Order By Id");
	            System.out.println("3. Get All Orders");
	            System.out.println("4. Update Order");
	            System.out.println("5. Delete Order");
	            System.out.println("6. Exit");

	            System.out.print("Enter Choice: ");
	            int choice = sc.nextInt();

	            switch(choice) {

	            case 1:

	                System.out.print("Enter User Id: ");
	                int userId = sc.nextInt();
	                sc.nextLine();

	                System.out.print("Enter Order Date: ");
	                String orderDate = sc.nextLine();

	                System.out.print("Enter Total Amount: ");
	                double totalAmount = sc.nextDouble();
	                sc.nextLine();

	                System.out.print("Enter Status: ");
	                String status = sc.nextLine();

	                System.out.print("Enter Payment Method: ");
	                String paymentMethod = sc.nextLine();

	                System.out.print("Enter Restaurant Id: ");
	                int restaurantId = sc.nextInt();

	                OrderTable order = new OrderTable(
	                        userId,
	                        orderDate,
	                        totalAmount,
	                        status,
	                        paymentMethod,
	                        restaurantId);

	                dao.addOrder(order);

	                System.out.println("Order Added Successfully");
	                break;

	            case 2:

	                System.out.print("Enter Order Id: ");
	                int orderId = sc.nextInt();

	                OrderTable o = dao.getOrder(orderId);

	                if(o != null) {

	                    System.out.println(
	                            "Order Id : " + o.getOrderId());
	                    System.out.println(
	                            "User Id : " + o.getUserId());
	                    System.out.println(
	                            "Order Date : " + o.getOrderDate());
	                    System.out.println(
	                            "Total Amount : " + o.getTotalAmount());
	                    System.out.println(
	                            "Status : " + o.getStatus());
	                    System.out.println(
	                            "Payment Method : " + o.getPaymentMethod());
	                    System.out.println(
	                            "Restaurant Id : " + o.getRestaurantId());

	                } else {

	                    System.out.println("Order Not Found");
	                }

	                break;

	            case 3:

	                List<OrderTable> orders = dao.getAllOrders();

	                for(OrderTable ot : orders) {

	                    System.out.println(
	                            ot.getOrderId() + " | " +
	                            ot.getUserId() + " | " +
	                            ot.getOrderDate() + " | " +
	                            ot.getTotalAmount() + " | " +
	                            ot.getStatus() + " | " +
	                            ot.getPaymentMethod() + " | " +
	                            ot.getRestaurantId());
	                }

	                break;

	            case 4:

	                System.out.print("Enter Order Id: ");
	                int oid = sc.nextInt();

	                System.out.print("Enter User Id: ");
	                int uid = sc.nextInt();
	                sc.nextLine();

	                System.out.print("Enter Order Date: ");
	                String odate = sc.nextLine();

	                System.out.print("Enter Total Amount: ");
	                double amount = sc.nextDouble();
	                sc.nextLine();

	                System.out.print("Enter Status: ");
	                String stat = sc.nextLine();

	                System.out.print("Enter Payment Method: ");
	                String pay = sc.nextLine();

	                System.out.print("Enter Restaurant Id: ");
	                int rid = sc.nextInt();

	                OrderTable updateOrder =
	                        new OrderTable(
	                                oid,
	                                uid,
	                                odate,
	                                amount,
	                                stat,
	                                pay,
	                                rid);

	                dao.updateOrder(updateOrder);

	                System.out.println("Order Updated");
	                break;

	            case 5:

	                System.out.print("Enter Order Id: ");
	                int deleteId = sc.nextInt();

	                dao.deleteOrder(deleteId);

	                System.out.println("Order Deleted");
	                break;

	            case 6:

	                System.out.println("Thank You");
	                System.exit(0);

	            default:

	                System.out.println("Invalid Choice");
	            }
	        }
	    }

}
