🌾 Farm Yield Planner

A simple agricultural-themed web project built with HTML, CSS, and JavaScript.  
It helps farmers plan crops, estimate yields, check water needs, and calculate revenue.


📂 Project Structure
farm-yield-planner :
index.html # Structured HTML content,
 style.css # Styling for the app,
 script.js # JavaScript with variables, functions, loops, DOM interactions,
 README.md # Project documentation


🚀 Features
- Add crops with details: name, area, yield, price, and water needs.
- View crop plan list dynamically.
- Calculate:
  - Total expected yield (tons)
  - Estimated revenue ($)
  - Weekly water requirement (mm)
- Seasonal adjustment (Long Rains, Short Rains, Dry Season).
- Dynamic water status indicator (OK / Warning / Deficit).
- Ability to remove crops from the plan.



🧑‍💻 JavaScript Requirements Covered
1. Variables & Conditionals  
   - Declared variables for crops, rainfall, and season.  
   - Conditionals for water status logic.  

2. Custom Functions (≥2) 
   - `calculateTotals()` → Computes yield, revenue, and water needs.  
   - `renderCrops()` → Updates crop list dynamically.  

3. Loops (≥2)
   - `for...of` loop to calculate totals.  
   - Traditional `for` loop to render crops.  
   - Also uses `.forEach()` for demo seeding.  

4. DOM Interactions (≥3) 
   - Update totals in `<span>` elements.  
   - Add/remove list items (`<li>`) dynamically.  
   - Change styles/status messages with `.classList`.  


 🏗️ How to Run
1. Download or clone this repository.  
2. Open `index.html` in any modern browser.  
3. Add crops using the form and see the totals update instantly.  


📸 Example Use
- Add Maize, 2 acres, 3.2 tons/acre, $220/ton, 35mm/week water.  
- Add Beans, 1.5 acres, 1.8 tons/acre, $480/ton, 25mm/week water.  
- See totals update and check if rainfall covers water needs.  


 📝 Notes
- By default, the project comes with Maize and Beans preloaded as demo crops.  
- To start with an empty crop plan, comment out or remove the `seedDemo()` function at the bottom of `script.js`.  


👨‍🌾 Designed for educational purposes — demonstrating JavaScript basics in an agriculture
