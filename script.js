/******************************************************
 * Farm Yield Planner - script.js
 * Requirements covered:
 *  Part 1: Variable declarations + conditionals
 *  Part 2: At least 2 custom functions
 *  Part 3: At least 2 loop examples
 *  Part 4: At least 3 DOM interactions
 ******************************************************/

/* =========================
   Part 1: Variables + Conditionals
   ========================= */
// Variable declarations
let crops = []; // holds crop objects { name, area, yieldPerAcre, pricePerTon, waterNeed }
let season = "Long Rains";
let forecastRainfall = 20; // mm/week (user editable)

// Conditionals to set water advisory thresholds
// (Simple example: needs vs. forecast)
function computeWaterStatus(totalWaterNeed, rain) {
    if (rain >= totalWaterNeed) return { label: "Adequate rainfall", class: "ok" };
    if (rain >= totalWaterNeed * 0.6) return { label: "Borderline — consider supplemental irrigation", class: "warn" };
    return { label: "Deficit — irrigation recommended", class: "dry" };
}

/* =========================
   DOM references (Part 4)
   ========================= */
const addCropForm = document.getElementById("addCropForm");
const cropList = document.getElementById("cropList");
const totalYieldEl = document.getElementById("totalYield");
const totalRevenueEl = document.getElementById("totalRevenue");
const totalWaterEl = document.getElementById("totalWater");
const seasonSelect = document.getElementById("season");
const rainfallInput = document.getElementById("rainfall");
const recomputeBtn = document.getElementById("recompute");
const waterStatusEl = document.getElementById("waterStatus");

/* =========================
   Part 2: Custom functions
   ========================= */
// Function 1: Calculate totals (yield, revenue, water)
function calculateTotals() {
    // Loop example #1: for...of
    let totalYield = 0;
    let totalRevenue = 0;
    let totalWater = 0;

    for (const c of crops) {
        const cropYield = c.area * c.yieldPerAcre; // tons
        const cropRevenue = cropYield * c.pricePerTon; // dollars
        totalYield += cropYield;
        totalRevenue += cropRevenue;
        totalWater += c.waterNeed; // simple weekly need sum
    }

    // DOM interaction: update totals
    totalYieldEl.textContent = totalYield.toFixed(2);
    totalRevenueEl.textContent = totalRevenue.toFixed(2);
    totalWaterEl.textContent = totalWater.toFixed(0);

    // Conditionals + DOM interaction: show water status
    const status = computeWaterStatus(totalWater, forecastRainfall);
    waterStatusEl.textContent = `Water status: ${status.label} (${forecastRainfall} mm/week vs ${totalWater} mm need)`;
    waterStatusEl.classList.remove("ok", "warn", "dry");
    waterStatusEl.classList.add(status.class);

    return { totalYield, totalRevenue, totalWater };
}

// Function 2: Render the crop list
function renderCrops() {
    cropList.innerHTML = "";
    // Loop example #2: traditional for loop
    for (let i = 0; i < crops.length; i++) {
        const c = crops[i];
        const li = document.createElement("li"); // DOM interaction
        li.innerHTML = `
      <div>
        <strong>${c.name}</strong>
        <span class="badge">${c.area} ac × ${c.yieldPerAcre} t/ac</span>
        <span class="badge">$${c.pricePerTon}/t</span>
        <span class="badge">${c.waterNeed} mm/wk</span>
      </div>
      <div>
        <button data-index="${i}" class="removeBtn">Remove</button>
      </div>
    `;
        cropList.appendChild(li); // DOM interaction
    }

    // Attach remove handlers
    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = Number(e.currentTarget.getAttribute("data-index"));
            crops.splice(idx, 1);
            renderCrops();
            calculateTotals();
        });
    });
}

/* =========================
   Part 3: Event handlers + flows
   ========================= */
addCropForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("cropName").value.trim();
    const area = Number(document.getElementById("area").value);
    const yieldPerAcre = Number(document.getElementById("yieldPerAcre").value);
    const pricePerTon = Number(document.getElementById("pricePerTon").value);
    const waterNeed = Number(document.getElementById("waterNeed").value);

    // Basic validation + conditionals
    if (!name || area <= 0 || yieldPerAcre < 0 || pricePerTon < 0 || waterNeed < 0) {
        alert("Please enter valid crop details.");
        return;
    }

    const crop = { name, area, yieldPerAcre, pricePerTon, waterNeed };
    crops.push(crop);

    addCropForm.reset();
    renderCrops();
    calculateTotals();
});

seasonSelect.addEventListener("change", () => {
    season = seasonSelect.value;
    // Example conditional adjusting rainfall placeholder/assumption
    // (You can tweak these mappings as needed)
    if (season === "Long Rains") forecastRainfall = Math.max(forecastRainfall, 30);
    if (season === "Short Rains") forecastRainfall = Math.max(forecastRainfall, 20);
    if (season === "Dry Season") forecastRainfall = Math.min(forecastRainfall, 10);

    rainfallInput.value = forecastRainfall;
    calculateTotals();
});

rainfallInput.addEventListener("input", () => {
    forecastRainfall = Number(rainfallInput.value || 0);
    calculateTotals();
});

recomputeBtn.addEventListener("click", () => {
    calculateTotals();
});

/* =========================
   Part 4: Initial demo data (optional)
   ========================= */
(function seedDemo() {
    const demo = [
        { name: "Maize", area: 2, yieldPerAcre: 3.2, pricePerTon: 220, waterNeed: 35 },
        { name: "Beans", area: 1.5, yieldPerAcre: 1.8, pricePerTon: 480, waterNeed: 25 },
    ];
    // Using forEach (another loop form—still counts toward loop examples)
    demo.forEach(d => crops.push(d));
    renderCrops();
    calculateTotals();
})();
