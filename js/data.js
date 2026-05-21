// FoodieHub Restaurants Database (52 Restaurants in Bengaluru)

const DISH_POOL = {
  biryani: [
    { name: "Chicken Dum Biryani", price: 320, desc: "Aromatic long grain basmati rice layered with spiced marinated chicken and dry spices. Classic spicy taste.", veg: false, image: "images/dishes_images/dish-biryani.jpg", bestseller: true },
    { name: "Paneer Tikka Biryani", price: 260, desc: "Fragrant rice layered with soft paneer cubes marinated in rich Andhra spices and slow cooked.", veg: true, image: "images/dishes_images/dish-paneer-biryani.jpg", bestseller: false },
    { name: "Egg Biryani", price: 220, desc: "Aromatic basmati rice cooked with hard boiled eggs, caramelized onions, and traditional spices.", veg: false, image: "images/dishes_images/dish-biryani.jpg", bestseller: false },
    { name: "Mutton Dum Biryani", price: 420, desc: "Tender mutton pieces slow cooked with premium basmati rice, saffron, and fresh mint.", veg: false, image: "images/dishes_images/dish-biryani.jpg", bestseller: true },
    { name: "Veg Hyderabadi Biryani", price: 210, desc: "Assorted vegetables cooked in spicy yogurt gravy, layered with long grain basmati rice.", veg: true, image: "images/dishes_images/dish-paneer-biryani.jpg", bestseller: false }
  ],
  "north-indian": [
    { name: "Butter Chicken", price: 280, desc: "Spiced tandoori chicken cooked in rich, sweet, and creamy tomato butter sauce.", veg: false, image: "images/dishes_images/dish-butter-chicken.jpg", bestseller: true },
    { name: "Paneer Butter Masala", price: 240, desc: "Cottage cheese cubes simmered in a velvet-smooth gravy of tomatoes, cashews, and butter.", veg: true, image: "images/dishes_images/dish-paneer-biryani.jpg", bestseller: true },
    { name: "Kadhai Veg Special", price: 200, desc: "Mixed seasonal vegetables tossed in a spicy, freshly ground kadhai masala.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: false },
    { name: "Chicken Kebab (Dry)", price: 220, desc: "Crispy and spicy deep-fried bone-in chicken joints tossed in native green spices.", veg: false, image: "images/dishes_images/dish-kebab.jpg", bestseller: true },
    { name: "Garlic Naan", price: 60, desc: "Traditional clay-oven flatbread flavored with minced garlic and brushed with fresh butter.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: false },
    { name: "Dal Makhani", price: 190, desc: "Black lentils slow-cooked overnight with cream, butter, and mild northern spices.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: false }
  ],
  "south-indian": [
    { name: "Masala Dosa", price: 90, desc: "Crispy rice-lentil crepe filled with spiced mashed potato bhaji, served with coconut chutney and hot sambar.", veg: true, image: "images/dishes_images/dish-dosa.jpg", bestseller: true },
    { name: "Idli Sambar (2 Pcs)", price: 60, desc: "Steamed fluffy rice-lentil cakes dunked in aromatic, spiced lentil soup (sambar).", veg: true, image: "images/dishes_images/dish-dosa.jpg", bestseller: false },
    { name: "Medu Vada (2 Pcs)", price: 70, desc: "Crispy, deep-fried savory lentil doughnuts served with chutneys.", veg: true, image: "images/dishes_images/dish-dosa.jpg", bestseller: false },
    { name: "South Indian Veg Meals", price: 150, desc: "Authentic banana-leaf style rice meal served with sambar, rasam, dry veg, curd, and papad.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: true },
    { name: "Filter Coffee", price: 40, desc: "Traditional South Indian frothy milk coffee brewed in brass filters.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: false }
  ],
  burgers: [
    { name: "Cheese Chicken Burger", price: 240, desc: "Signature crispy chicken patty with double melted cheese, pickles, lettuce, and Truffles secret burger dressing.", veg: false, image: "images/dishes_images/dish-burger.jpg", bestseller: true },
    { name: "Classic Veg Smash Burger", price: 160, desc: "Spiced potato-pea patty smashed on griddle, layered with onions, tomatoes, and home sauce.", veg: true, image: "images/dishes_images/dish-burger.jpg", bestseller: false },
    { name: "Double Decker Beef Burger", price: 320, desc: "Two grilled juicy tender beef patties, loaded cheddar, caramelized onions, and relish.", veg: false, image: "images/dishes_images/dish-burger.jpg", bestseller: true },
    { name: "Crispy Chicken Wrap", price: 180, desc: "Warm flatbread rolled with crispy chicken strips, fresh veggies, and garlic aioli.", veg: false, image: "images/dishes_images/dish-shawarma.jpg", bestseller: false }
  ],
  pizza: [
    { name: "Margherita Pizza", price: 250, desc: "Simple sourdough pizza base topped with marinara sauce, fresh mozzarella cheese, and basil leaves.", veg: true, image: "images/dishes_images/dish-pizza.jpg", bestseller: true },
    { name: "Double Cheese Farmhouse Pizza", price: 320, desc: "Loaded with fresh capsicum, red onions, mushrooms, golden corn, and heavy mozzarella cheese.", veg: true, image: "images/dishes_images/dish-pizza.jpg", bestseller: false },
    { name: "Chicken Golden Delight Pizza", price: 380, desc: "Topped with double chicken tikka pieces, gold corn, and extra cheese drizzle.", veg: false, image: "images/dishes_images/dish-pizza.jpg", bestseller: true },
    { name: "Sourdough Pepperoni Pizza", price: 420, desc: "Spicy chicken pepperoni slices, fresh mozzarella, and a hot honey glaze.", veg: false, image: "images/dishes_images/dish-pizza.jpg", bestseller: true }
  ],
  chinese: [
    { name: "Veg Hakka Noodles", price: 180, desc: "Wok-tossed thin noodles with crunchy julienne vegetables, light soy, and white pepper.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: false },
    { name: "Chicken Fried Rice", price: 200, desc: "Wok-fried premium long grain rice tossed with eggs, chicken cubes, and soy seasoning.", veg: false, image: "images/dishes_images/dish-meals.jpg", bestseller: false },
    { name: "Chilli Chicken Dry", price: 240, desc: "Crispy chicken pieces tossed with green chillies, bell peppers, onions, and spicy dark soy sauce.", veg: false, image: "images/dishes_images/dish-kebab.jpg", bestseller: true },
    { name: "Veg Manchurian Gravy", price: 190, desc: "Deep-fried mixed veg dumplings in a sweet, sour, and tangy semi-dry gravy.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: false }
  ],
  desserts: [
    { name: "Death by Chocolate Sundae", price: 220, desc: "Lush layers of chocolate cake, vanilla ice cream, hot chocolate fudge, cherries, and nuts.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: true },
    { name: "Hot Chocolate Fudge", price: 180, desc: "Two scoops of vanilla ice cream topped with our famous signature hot chocolate fudge sauce.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: true },
    { name: "Gulab Jamun (2 Pcs)", price: 80, desc: "Soft milk-solid balls fried and soaked in warm cardamom-scented sugar syrup.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: false },
    { name: "Mango Ice Cream Tub", price: 150, desc: "Rich and creamy artisanal ice cream loaded with real Alphonso mango pulp chunks.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: false }
  ],
  mexican: [
    { name: "Fiesta Veg Burrito Bowl", price: 220, desc: "Cilantro lime rice, black beans, sweet corn salsa, guacamole, and sour cream.", veg: true, image: "images/dishes_images/dish-mexican.jpg", bestseller: true },
    { name: "Chipotle Chicken Burrito Wrap", price: 250, desc: "Warm tortilla stuffed with pulled chipotle chicken, seasoned rice, cheese, and salsa.", veg: false, image: "images/dishes_images/dish-mexican.jpg", bestseller: false },
    { name: "Crispy Veg Tacos (3 Pcs)", price: 170, desc: "Crispy corn shells loaded with refried beans, lettuce, cheese, and pico de gallo.", veg: true, image: "images/dishes_images/dish-mexican.jpg", bestseller: false },
    { name: "Loaded Cheese Nachos", price: 160, desc: "Corn tortilla chips layered with hot cheese sauce, jalapeños, olives, and salsa.", veg: true, image: "images/dishes_images/dish-mexican.jpg", bestseller: false }
  ],
  healthy: [
    { name: "Avocado Salad Bowl", price: 240, desc: "Rich fresh avocado chunks, baby spinach, cherry tomatoes, cucumbers, tossed in olive oil vinaigrette.", veg: true, image: "images/dishes_images/dish-meals.jpg", bestseller: true },
    { name: "Grilled Chicken Quinoa Bowl", price: 280, desc: "Protein-packed bowl with herb-grilled chicken breast, quinoa, broccoli, and roasted nuts.", veg: false, image: "images/dishes_images/dish-meals.jpg", bestseller: true },
    { name: "Fruit & Nut Oatmeal Bowl", price: 160, desc: "Warm rolled oats cooked in almond milk, topped with banana slices, berries, and chia seeds.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: false },
    { name: "Green Detox Juice", price: 120, desc: "Cold-pressed juice made with fresh cucumber, spinach, green apple, mint, and lemon.", veg: true, image: "images/dishes_images/dish-dessert.jpg", bestseller: false }
  ]
};

const RESTAURANTS_DATA = [
  // Biryani (6 restaurants)
  { id: "res-meghana", name: "Meghana Foods", rating: 4.5, cuisine: "biryani", cuisineText: "Andhra, Biryani, Spicy", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 32, priceForOne: 350, image: "images/restaurant_images/res-biryani.jpg", veg: false, trending: true, offer: "40% OFF", status: "Trending" },
  { id: "res-manis", name: "Mani's Dum Biryani", rating: 4.4, cuisine: "biryani", cuisineText: "Ambur Biryani, South Indian", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 25, priceForOne: 300, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: false, offer: "20% OFF", status: "Open" },
  { id: "res-paradise", name: "Paradise Biryani", rating: 4.2, cuisine: "biryani", cuisineText: "Hyderabadi Biryani, Kebabs", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 30, priceForOne: 280, image: "images/restaurant_images/res-generic-2.jpg", veg: false, trending: false, offer: null, status: "Open" },
  { id: "res-biryanizone", name: "Biryani Zone", rating: 4.3, cuisine: "biryani", cuisineText: "Mughlai, Biryani, Tandoori", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 28, priceForOne: 320, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: "30% OFF", status: "Open" },
  { id: "res-ammis", name: "Ammi's Biryani", rating: 4.1, cuisine: "biryani", cuisineText: "Kolkata Biryani, Rolls", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 20, priceForOne: 250, image: "images/restaurant_images/res-biryani.jpg", veg: false, trending: false, offer: "Flat 50% OFF", status: "Open" },
  { id: "res-behrouz", name: "Behrouz Biryani", rating: 4.6, cuisine: "biryani", cuisineText: "Royal Persian Biryani, Kebabs", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 35, priceForOne: 400, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: true, offer: "10% OFF", status: "Trending" },

  // North Indian (6 restaurants)
  { id: "res-empire", name: "Empire Restaurant", rating: 4.3, cuisine: "north-indian", cuisineText: "North Indian, Mughlai, Kebabs", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 28, priceForOne: 300, image: "images/restaurant_images/res-north-indian.jpg", veg: false, trending: false, offer: "10% OFF", status: "Open" },
  { id: "res-northexpress", name: "North Indian Express", rating: 4.2, cuisine: "north-indian", cuisineText: "Tandoori, Thalis, Punjabi", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 22, priceForOne: 220, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: false, offer: "20% OFF", status: "Open" },
  { id: "res-tandoorbox", name: "Tandoor Box", rating: 4.4, cuisine: "north-indian", cuisineText: "Mughlai, North Indian Curry", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 26, priceForOne: 260, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: null, status: "Open" },
  { id: "res-pindballuchi", name: "Pind Balluchi", rating: 4.5, cuisine: "north-indian", cuisineText: "Traditional Punjabi Feast", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 30, priceForOne: 350, image: "images/restaurant_images/res-north-indian.jpg", veg: false, trending: true, offer: "30% OFF", status: "Trending" },
  { id: "res-punjabgrill", name: "Punjab Grill", rating: 4.7, cuisine: "north-indian", cuisineText: "Gourmet North Indian, Kebabs", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 35, priceForOne: 500, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: true, offer: null, status: "Legendary" },
  { id: "res-dhababhai", name: "Dhaba Bhai", rating: 4.0, cuisine: "north-indian", cuisineText: "Dhaba Style Curries, Roti", location: "basavanagudi", locationText: "Basavanagudi, Bengaluru", deliveryTime: 18, priceForOne: 180, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: false, offer: "15% OFF", status: "Open" },

  // South Indian (6 restaurants)
  { id: "res-vidyarthi", name: "Vidyarthi Bhavan", rating: 4.7, cuisine: "south-indian", cuisineText: "South Indian, Masala Dosa, Filter Coffee", location: "basavanagudi", locationText: "Basavanagudi, Bengaluru", deliveryTime: 40, priceForOne: 100, image: "images/restaurant_images/res-south-indian.jpg", veg: true, trending: true, offer: null, status: "Legendary" },
  { id: "res-nagarjuna", name: "Nagarjuna Restaurant", rating: 4.5, cuisine: "south-indian", cuisineText: "Andhra Feasts, Traditional Curries", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 25, priceForOne: 300, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: null, status: "Open" },
  { id: "res-a2b", name: "A2B Adyar Ananda Bhavan", rating: 4.2, cuisine: "south-indian", cuisineText: "South Indian, Sweets, Snacks", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 22, priceForOne: 150, image: "images/restaurant_images/res-south-indian.jpg", veg: true, trending: false, offer: "15% OFF", status: "Open" },
  { id: "res-shivaji", name: "Shivaji Military Hotel", rating: 4.6, cuisine: "south-indian", cuisineText: "Military Style Meals, Biryani", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 38, priceForOne: 250, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: true, offer: null, status: "Legendary" },
  { id: "res-mtr", name: "Mavalli Tiffin Room (MTR)", rating: 4.8, cuisine: "south-indian", cuisineText: "Heritage South Indian, Rava Dosa", location: "basavanagudi", locationText: "Basavanagudi, Bengaluru", deliveryTime: 30, priceForOne: 120, image: "images/restaurant_images/res-south-indian.jpg", veg: true, trending: true, offer: null, status: "Legendary" },
  { id: "res-rameshwaram", name: "The Rameshwaram Cafe", rating: 4.7, cuisine: "south-indian", cuisineText: "Ghee Dosa, Idli, Podi Masala", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 20, priceForOne: 110, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: true, offer: "10% OFF", status: "Trending" },

  // Burgers (6 restaurants)
  { id: "res-truffles", name: "Truffles", rating: 4.6, cuisine: "burgers", cuisineText: "Burgers, American, Desserts", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 35, priceForOne: 250, image: "images/restaurant_images/res-burgers.jpg", veg: false, trending: true, offer: "Buy 1 Get 1", status: "Trending" },
  { id: "res-leon", name: "Leon's - Burgers & Salad", rating: 4.4, cuisine: "burgers", cuisineText: "Burgers, Healthy, Salads", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 26, priceForOne: 200, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: "Flat 50% OFF", status: "Open" },
  { id: "res-kfc", name: "KFC", rating: 4.2, cuisine: "burgers", cuisineText: "Burgers, Fast Food, Fried Chicken", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 22, priceForOne: 250, image: "images/restaurant_images/res-burgers.jpg", veg: false, trending: false, offer: "20% OFF", status: "Open" },
  { id: "res-mcd", name: "McDonald’s", rating: 4.4, cuisine: "burgers", cuisineText: "Burgers, Fast Food, Fries", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 19, priceForOne: 150, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: false, offer: "15% OFF", status: "Open" },
  { id: "res-burgerseigneur", name: "Burger Seigneur", rating: 4.6, cuisine: "burgers", cuisineText: "Gourmet Burgers, American Sides", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 30, priceForOne: 400, image: "images/restaurant_images/res-burgers.jpg", veg: false, trending: true, offer: null, status: "Trending" },
  { id: "res-peppervilla", name: "Burger Villa", rating: 4.1, cuisine: "burgers", cuisineText: "Veggie Burgers & Shakes", location: "basavanagudi", locationText: "Basavanagudi, Bengaluru", deliveryTime: 24, priceForOne: 160, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: false, offer: "30% OFF", status: "Open" },

  // Pizza (6 restaurants)
  { id: "res-pizzabakery", name: "The Pizza Bakery", rating: 4.4, cuisine: "pizza", cuisineText: "Woodfired Italian, Pizzas", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 30, priceForOne: 350, image: "images/restaurant_images/res-pizza.jpg", veg: false, trending: false, offer: "20% OFF", status: "Open" },
  { id: "res-dominos", name: "Domino’s Pizza", rating: 4.3, cuisine: "pizza", cuisineText: "Pizza, Garlic Bread, Italian", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 30, priceForOne: 300, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: "Free Delivery", status: "Open" },
  { id: "res-pizzahut", name: "Pizza Hut", rating: 4.1, cuisine: "pizza", cuisineText: "Pan Pizzas, Garlic Bread", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 28, priceForOne: 250, image: "images/restaurant_images/res-pizza.jpg", veg: false, trending: false, offer: "Buy 1 Get 1", status: "Open" },
  { id: "res-ovenstory", name: "Ovenstory Pizza", rating: 4.2, cuisine: "pizza", cuisineText: "Cheese Base Pizzas", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 25, priceForOne: 280, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: false, offer: "Flat 50% OFF", status: "Open" },
  { id: "res-mojopizza", name: "Mojo Pizza - 2X Toppings", rating: 4.5, cuisine: "pizza", cuisineText: "Deep Dish Loaded Pizzas", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 24, priceForOne: 320, image: "images/restaurant_images/res-generic-2.jpg", veg: false, trending: true, offer: "30% OFF", status: "Trending" },
  { id: "res-toscano", name: "Toscano", rating: 4.7, cuisine: "pizza", cuisineText: "Gourmet Italian Thin Crust", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 35, priceForOne: 600, image: "images/restaurant_images/res-pizza.jpg", veg: false, trending: true, offer: null, status: "Legendary" },

  // Chinese (6 restaurants)
  { id: "res-beijing", name: "Beijing Bites", rating: 4.1, cuisine: "chinese", cuisineText: "Indo-Chinese, Noodles, Rice", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 35, priceForOne: 220, image: "images/restaurant_images/res-chinese.jpg", veg: false, trending: false, offer: "30% OFF", status: "Open" },
  { id: "res-chungwah", name: "Chung Wah", rating: 4.3, cuisine: "chinese", cuisineText: "Classic Indo-Chinese Specialties", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 20, priceForOne: 240, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: "15% OFF", status: "Open" },
  { id: "res-mainland", name: "Mainland China", rating: 4.6, cuisine: "chinese", cuisineText: "Gourmet Chinese, Dimsums", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 35, priceForOne: 500, image: "images/restaurant_images/res-chinese.jpg", veg: false, trending: true, offer: null, status: "Legendary" },
  { id: "res-wowmomo", name: "Wow! Momo", rating: 4.0, cuisine: "chinese", cuisineText: "Steam & Fried Momos, Noodles", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 18, priceForOne: 150, image: "images/restaurant_images/res-generic-1.jpg", veg: true, trending: false, offer: "Flat 50% OFF", status: "Open" },
  { id: "res-noodlebar", name: "Noodle Bar", rating: 4.2, cuisine: "chinese", cuisineText: "Wok Bowls, Soups, Hakka", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 24, priceForOne: 200, image: "images/restaurant_images/res-generic-2.jpg", veg: false, trending: false, offer: "20% OFF", status: "Open" },
  { id: "res-shanghai", name: "Shanghai Co.", rating: 4.4, cuisine: "chinese", cuisineText: "Cantonese & Sichuan Food", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 28, priceForOne: 300, image: "images/restaurant_images/res-chinese.jpg", veg: false, trending: false, offer: "10% OFF", status: "Open" },

  // Desserts (6 restaurants)
  { id: "res-cornerhouse", name: "Corner House Ice Creams", rating: 4.8, cuisine: "desserts", cuisineText: "Desserts, Ice Cream, Hot Fudges", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 18, priceForOne: 200, image: "images/restaurant_images/res-desserts.jpg", veg: true, trending: true, offer: null, status: "Trending" },
  { id: "res-anand", name: "Anand Sweets & Savouries", rating: 4.5, cuisine: "desserts", cuisineText: "Mithai, Halwa, Indian Desserts", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 20, priceForOne: 180, image: "images/restaurant_images/res-generic-3.jpg", veg: true, trending: false, offer: "10% OFF", status: "Open" },
  { id: "res-glens", name: "Glen's Bakehouse", rating: 4.6, cuisine: "desserts", cuisineText: "Cakes, Pastries, Red Velvet", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 22, priceForOne: 250, image: "images/restaurant_images/res-desserts.jpg", veg: true, trending: true, offer: "Buy 1 Get 1", status: "Trending" },
  { id: "res-smoor", name: "Smoor - Chocolates & Cakes", rating: 4.7, cuisine: "desserts", cuisineText: "Premium Couverture Chocolates, Macron", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 28, priceForOne: 350, image: "images/restaurant_images/res-generic-1.jpg", veg: true, trending: true, offer: null, status: "Legendary" },
  { id: "res-magnolia", name: "Magnolia Bakery", rating: 4.8, cuisine: "desserts", cuisineText: "Banana Pudding, NYC Cupcakes", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 25, priceForOne: 400, image: "images/restaurant_images/res-desserts.jpg", veg: true, trending: true, offer: null, status: "Legendary" },
  { id: "res-polarbear", name: "Polar Bear Ice Creams", rating: 4.3, cuisine: "desserts", cuisineText: "Sundaes, Milkshakes, Ice Cream", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 15, priceForOne: 160, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: false, offer: "20% OFF", status: "Open" },

  // Mexican (5 restaurants - making exactly 52 total)
  { id: "res-california", name: "California Burrito", rating: 4.5, cuisine: "mexican", cuisineText: "Mexican Bowls, Burritos, Salads", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 24, priceForOne: 220, image: "images/restaurant_images/res-mexican.jpg", veg: false, trending: true, offer: "Buy 1 Get 1", status: "Trending" },
  { id: "res-tacobell", name: "Taco Bell", rating: 4.2, cuisine: "mexican", cuisineText: "Tacos, Quesadillas, Burritos", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 25, priceForOne: 180, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: "40% OFF", status: "Open" },
  { id: "res-habanero", name: "Habanero", rating: 4.3, cuisine: "mexican", cuisineText: "Tex-Mex, Enchiladas, Margaritas", location: "whitefield", locationText: "Whitefield, Bengaluru", deliveryTime: 35, priceForOne: 450, image: "images/restaurant_images/res-mexican.jpg", veg: false, trending: false, offer: "15% OFF", status: "Open" },
  { id: "res-chinita", name: "Chinita Real Mexican Food", rating: 4.6, cuisine: "mexican", cuisineText: "Authentic Mexican Tacos & Salsa", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 30, priceForOne: 300, image: "images/restaurant_images/res-generic-1.jpg", veg: false, trending: true, offer: null, status: "Trending" },
  { id: "res-tacoalfresco", name: "Taco Alfresco", rating: 4.0, cuisine: "mexican", cuisineText: "Quesadillas, Tex-Mex Fast Food", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 20, priceForOne: 160, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: false, offer: "30% OFF", status: "Open" },

  // Healthy Food (5 restaurants - making exactly 52 total)
  { id: "res-subway", name: "Subway", rating: 4.3, cuisine: "healthy", cuisineText: "Healthy Custom Subs, Salads", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 20, priceForOne: 180, image: "images/restaurant_images/res-healthy.jpg", veg: false, trending: false, offer: "Buy 1 Get 1", status: "Open" },
  { id: "res-freshmenu", name: "FreshMenu", rating: 4.1, cuisine: "healthy", cuisineText: "Salad Bowls, Healthy Meals", location: "hsr", locationText: "HSR Layout, Bengaluru", deliveryTime: 28, priceForOne: 220, image: "images/restaurant_images/res-generic-3.jpg", veg: false, trending: false, offer: "30% OFF", status: "Open" },
  { id: "res-eatfit", name: "EatFit", rating: 4.4, cuisine: "healthy", cuisineText: "Healthy Curries, Brown Rice, Juices", location: "koramangala", locationText: "Koramangala, Bengaluru", deliveryTime: 22, priceForOne: 200, image: "images/restaurant_images/res-healthy.jpg", veg: true, trending: true, offer: "Flat 50% OFF", status: "Trending" },
  { id: "res-saladify", name: "Saladify", rating: 4.2, cuisine: "healthy", cuisineText: "Gourmet Salad Bowls, Smoothies", location: "indiranagar", locationText: "Indiranagar, Bengaluru", deliveryTime: 18, priceForOne: 240, image: "images/restaurant_images/res-generic-1.jpg", veg: true, trending: false, offer: "20% OFF", status: "Open" },
  { id: "res-greentheory", name: "The Green Theory", rating: 4.5, cuisine: "healthy", cuisineText: "Organic Veg Bowls, Vegan Options", location: "jayanagar", locationText: "Jayanagar, Bengaluru", deliveryTime: 32, priceForOne: 350, image: "images/restaurant_images/res-generic-2.jpg", veg: true, trending: true, offer: null, status: "Open" }
];

// Enrich each restaurant object with its menu based on cuisine
RESTAURANTS_DATA.forEach(restaurant => {
  const cuisineType = restaurant.cuisine;
  // Deep clone dishes from pool
  restaurant.menu = JSON.parse(JSON.stringify(DISH_POOL[cuisineType] || DISH_POOL.biryani));
});
