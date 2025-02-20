// Menu toggle functionality
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.onclick = function () {
    nav.classList.toggle("hidden"); 
    nav.classList.toggle("opacity-0"); 
    nav.classList.toggle("opacity-100"); 
    document.body.classList.toggle("overflow-hidden");
};

// Tab switching functionality
const creditTabBtn = document.getElementById("creditTabBtn");
const depositTabBtn = document.getElementById("depositTabBtn");
const creditCalculator = document.getElementById("creditCalculator");
const depositCalculator = document.getElementById("depositCalculator");
const creditInfo = document.getElementById("creditInfo");
const depositInfo = document.getElementById("depositInfo");

creditTabBtn.addEventListener("click", () => {
    // Update tab styling
    creditTabBtn.classList.add("active", "bg-gradient-to-r", "from-indigo-600", "to-purple-600", "text-white");
    creditTabBtn.classList.remove("bg-gray-200", "text-gray-700");
    depositTabBtn.classList.remove("active", "bg-gradient-to-r", "from-green-600", "to-teal-600", "text-white");
    depositTabBtn.classList.add("bg-gray-200", "text-gray-700");
    
    // Show/hide calculators and info
    creditCalculator.classList.remove("hidden");
    depositCalculator.classList.add("hidden");
    creditInfo.classList.remove("hidden");
    depositInfo.classList.add("hidden");
    
    // Update calculations
    updateCreditCalculations();
});

depositTabBtn.addEventListener("click", () => {
    // Update tab styling
    depositTabBtn.classList.add("active", "bg-gradient-to-r", "from-green-600", "to-teal-600", "text-white");
    depositTabBtn.classList.remove("bg-gray-200", "text-gray-700");
    creditTabBtn.classList.remove("active", "bg-gradient-to-r", "from-indigo-600", "to-purple-600", "text-white");
    creditTabBtn.classList.add("bg-gray-200", "text-gray-700");
    
    // Show/hide calculators and info
    depositCalculator.classList.remove("hidden");
    creditCalculator.classList.add("hidden");
    depositInfo.classList.remove("hidden");
    creditInfo.classList.add("hidden");
    
    // Update calculations
    updateDepositCalculations();
});

// Credit Calculator Functions
function updateCreditCalculations() {
    const amountRange = document.getElementById("creditAmountRange");
    const amountInput = document.getElementById("creditAmountInput");
    const amountValue = document.getElementById("creditAmountValue");
    const durationRange = document.getElementById("creditDurationRange");
    const durationInput = document.getElementById("creditDurationInput");
    const durationValue = document.getElementById("creditDurationValue");
    const creditResults = document.querySelector(".credit-results");

    if (!amountRange || !amountInput || !durationRange || !durationInput || !creditResults) {
        console.error("Required credit calculator elements not found");
        return;
    }

    // Sync range and input fields
    if (document.activeElement === amountInput) {
        if (amountInput.value !== "") {
            const inputValue = parseInt(amountInput.value) || 0;
            amountRange.value = Math.min(Math.max(inputValue, 300), 40000);
        }
    } else {
        amountInput.value = amountRange.value;
    }

    if (document.activeElement === durationInput) {
        if (durationInput.value !== "") {
            const inputValue = parseInt(durationInput.value) || 0;
            durationRange.value = Math.min(Math.max(inputValue, 3), 48);
        }
    } else {
        durationInput.value = durationRange.value;
    }

    // Update display values
    amountValue.textContent = formatter.format(amountRange.value);
    durationValue.textContent = `${durationRange.value} months`;

    let amount = parseInt(amountRange.value) || 0;
    let duration = parseInt(durationRange.value) || 0;

    let annualRate = 0.12; // Yıllık faiz oranı (örnek %12)
    let monthlyRate = annualRate / 12; // Aylık faiz oranı

    let monthlyPayment = (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
    let totalAmount = monthlyPayment * duration;
    let totalInterest = totalAmount - amount;

    // Format results
    creditResults.innerHTML = `
      <div class="flex justify-evenly items-center max-md:flex-col gap-6">
        <div>
          <p class="mb-1 text-sm font-medium text-gray-600">Total Payable</p>
          <p class="text-2xl sm:text-3xl font-bold text-indigo-800">${formatter.format(totalAmount)}</p>
          <p class="text-xs text-gray-500 mt-1">Interest: ${formatter.format(totalInterest)}</p>
        </div>
        <div>
          <p class="mb-1 text-sm font-medium text-gray-600">Monthly Payment</p>
          <p class="text-2xl sm:text-3xl font-bold text-indigo-800">${formatter.format(monthlyPayment)}</p>
          <p class="text-xs text-gray-500 mt-1">For ${duration} months</p>
        </div>
      </div>
    `;
}

// Deposit Calculator Functions
function updateDepositCalculations() {
    const amountRange = document.getElementById("depositAmountRange");
    const amountInput = document.getElementById("depositAmountInput");
    const amountValue = document.getElementById("depositAmountValue");
    const termRange = document.getElementById("depositTermRange");
    const termInput = document.getElementById("depositTermInput");
    const termValue = document.getElementById("depositTermValue");
    const depositResults = document.querySelector(".deposit-results");

    if (!amountRange || !amountInput || !termRange || !termInput || !depositResults) {
        console.error("Required deposit calculator elements not found");
        return;
    }

    // Sync range and input fields
    if (document.activeElement === amountInput) {
        if (amountInput.value !== "") {
            const inputValue = parseInt(amountInput.value) || 0;
            amountRange.value = Math.min(Math.max(inputValue, 500), 50000);
        }
    } else {
        amountInput.value = amountRange.value;
    }

    if (document.activeElement === termInput) {
        if (termInput.value !== "") {
            const inputValue = parseInt(termInput.value) || 0;
            termRange.value = Math.min(Math.max(inputValue, 3), 60);
        }
    } else {
        termInput.value = termRange.value;
    }

    // Update display values
    amountValue.textContent = formatter.format(amountRange.value);
    termValue.textContent = `${termRange.value} months`;

    let principal = parseInt(amountRange.value) || 0;
    let term = parseInt(termRange.value) || 0;

    // Deposit calculation: annual rate of 3.5%, compounded monthly
    let annualRate = 0.035;
    let monthlyRate = annualRate / 12;
    let finalAmount = principal * Math.pow(1 + monthlyRate, term);
    let interestEarned = finalAmount - principal;
    
    // Format results
    depositResults.innerHTML = `
      <div class="flex justify-evenly items-center max-md:flex-col gap-6">
        <div>
          <p class="mb-1 text-sm font-medium text-gray-600">Final Balance</p>
          <p class="text-2xl sm:text-3xl font-bold text-green-700">${formatter.format(finalAmount)}</p>
          <p class="text-xs text-gray-500 mt-1">APY: 3.5%</p>
        </div>
        <div>
          <p class="mb-1 text-sm font-medium text-gray-600">Interest Earned</p>
          <p class="text-2xl sm:text-3xl font-bold text-green-700">${formatter.format(interestEarned)}</p>
          <p class="text-xs text-gray-500 mt-1">Over ${term} months</p>
        </div>
      </div>
    `;
}

// Format numbers as currency
const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

// Handle input blur events to enforce min/max values
function handleCreditBlur(event) {
    const min = event.target.id.includes("Amount") ? 300 : 3;
    const max = event.target.id.includes("Amount") ? 40000 : 48;

    const value = parseInt(event.target.value) || min;
    event.target.value = Math.min(Math.max(value, min), max);

    updateCreditCalculations();
}

function handleDepositBlur(event) {
    const min = event.target.id.includes("Amount") ? 500 : 3;
    const max = event.target.id.includes("Amount") ? 50000 : 60;

    const value = parseInt(event.target.value) || min;
    event.target.value = Math.min(Math.max(value, min), max);

    updateDepositCalculations();
}

// Initialize calculators on page load
document.addEventListener("DOMContentLoaded", function () {
    // Credit calculator inputs
    const creditInputs = [
        "creditAmountRange", "creditAmountInput", 
        "creditDurationRange", "creditDurationInput"
    ];

    creditInputs.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", updateCreditCalculations);
            if (id.includes("Input")) {
                element.addEventListener("blur", handleCreditBlur);
            }
        }
    });

    // Deposit calculator inputs
    const depositInputs = [
        "depositAmountRange", "depositAmountInput", 
        "depositTermRange", "depositTermInput"
    ];

    depositInputs.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener("input", updateDepositCalculations);
            if (id.includes("Input")) {
                element.addEventListener("blur", handleDepositBlur);
            }
        }
    });

    // Initialize calculations
    updateCreditCalculations();
    updateDepositCalculations();
});