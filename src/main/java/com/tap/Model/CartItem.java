package com.tap.Model;

public class CartItem {
    private int itemId;
    private int restaurantId;
    private String name;
    private String imagePath;
    private double price;
    private int quantity;
    private double itemTotal;

    public CartItem() {}

    public CartItem(int itemId, int restaurantId, String name, String imagePath, double price, int quantity) {
        this.itemId = itemId;
        this.restaurantId = restaurantId;
        this.name = name;
        this.imagePath = imagePath;
        this.price = price;
        this.quantity = quantity;
        this.itemTotal = price * quantity;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public int getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(int restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
        this.itemTotal = this.price * this.quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.itemTotal = this.price * this.quantity;
    }

    public double getItemTotal() {
        return itemTotal;
    }

    @Override
    public String toString() {
        return "CartItem [itemId=" + itemId + ", restaurantId=" + restaurantId + ", name=" + name + ", price=" + price
                + ", quantity=" + quantity + ", itemTotal=" + itemTotal + "]";
    }
}
