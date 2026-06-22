package com.tap.Model;

public class Restaurant {
	private int restaurantId;
	private String restaurantName;
	private String causinType;
	private int delivaryTime;
	private String address;
	private String imagePath;
	private double rating;
	private boolean isActive;
	
	public Restaurant(String restaurantName, String causinType, int delivaryTime, String address, String imagePath,
			double rating, boolean isActive) {
		super();
		this.restaurantName = restaurantName;
		this.causinType = causinType;
		this.delivaryTime = delivaryTime;
		this.address = address;
		this.imagePath = imagePath;
		this.rating = rating;
		this.isActive = isActive;
	}

	public int getRestaurantId() {
		return restaurantId;
	}

	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}

	public String getCausinType() {
		return causinType;
	}

	public void setCausinType(String causinType) {
		this.causinType = causinType;
	}

	public int getDelivaryTime() {
		return delivaryTime;
	}

	public void setDelivaryTime(int delivaryTime) {
		this.delivaryTime = delivaryTime;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getimagePath() {
		return imagePath;
	}

	public void setimagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	@Override
	public String toString() {
		return "Restaurant [restaurantId=" + restaurantId + ", restaurantName=" + restaurantName + ", causinType="
				+ causinType + ", delivaryTime=" + delivaryTime + ", address=" + address + ", imagePath="
				+ imagePath + ", rating=" + rating + ", isActive=" + isActive + "]";
	}
	
	
	
	
	
	
	

}
