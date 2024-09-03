// Calculates and updates profit-related fields
function updateCalculations() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const cashOut = document.getElementById('cashOut').checked;

  const expenses = Array.from(document.querySelectorAll('.expense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);
  const resaleExpenses = Array.from(document.querySelectorAll('.resaleExpense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  const feeRate = parseFloat(document.querySelector('input[name="fee"]:checked').value) || 0;
  const feeAmount = standardPrice * feeRate;

  const totalExpenses = expenses + resaleExpenses + feeAmount;
  const totalProfit = standardPrice - purchasePrice - totalExpenses;
  const profitRate = purchasePrice === 0 ? 0 : (totalProfit / (purchasePrice + expenses)) * 100;

  document.getElementById('feeAmount').value = feeAmount.toFixed(2);
  document.getElementById('profit').innerText = `総利益: ${totalProfit.toFixed(2)} 円`;
  document.getElementById('profitRate').innerText = `利益率: ${profitRate.toFixed(2)}%`;
}

// Calculates and updates reinvestment-related fields
function updateReinvestmentCalculations() {
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;

  const reinvestmentExpenses = Array.from(document.querySelectorAll('.reinvestmentExpense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);
  const reinvestmentResaleExpenses = Array.from(document.querySelectorAll('.reinvestmentResaleExpense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  const reinvestmentFeeRate = parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked').value) || 0;
  const reinvestmentFeeAmount = reinvestmentStandardPrice * reinvestmentFeeRate;

  const reinvestmentTotalExpenses = reinvestmentExpenses + reinvestmentResaleExpenses + reinvestmentFeeAmount;
  const reinvestmentTotalProfit = reinvestmentStandardPrice - reinvestmentPurchasePrice - reinvestmentTotalExpenses;
  const reinvestmentProfitRate = reinvestmentPurchasePrice === 0 ? 0 : (reinvestmentTotalProfit / (reinvestmentPurchasePrice + reinvestmentExpenses)) * 100;

  document.getElementById('reinvestmentFeeAmount').value = reinvestmentFeeAmount.toFixed(2);
  document.getElementById('reinvestmentProfit').innerText = `再投資総利益: ${reinvestmentTotalProfit.toFixed(2)} 円`;
  document.getElementById('reinvestmentProfitRate').innerText = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;

  updateOverallProfit();
}

// Updates the overall profit and profit rate based on both initial and reinvestment
function updateOverallProfit() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;

  const totalProfit = (standardPrice - purchasePrice - (Array.from(document.querySelectorAll('.expense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0)) - (Array.from(document.querySelectorAll('.resaleExpense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0)) - (standardPrice * parseFloat(document.querySelector('input[name="fee"]:checked').value) || 0))
    + (reinvestmentStandardPrice - reinvestmentPurchasePrice - (Array.from(document.querySelectorAll('.reinvestmentExpense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0)) - (Array.from(document.querySelectorAll('.reinvestmentResaleExpense'))
    .reduce((sum, input) => sum + parseFloat(input.value) || 0, 0)) - (reinvestmentStandardPrice * parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked').value) || 0));

  const totalInvestment = purchasePrice + reinvestmentPurchasePrice;
  const totalProfitRate = totalInvestment === 0 ? 0 : (totalProfit / totalInvestment) * 100;

  document.getElementById('totalProfit').innerText = `総利益: ${totalProfit.toFixed(2)} 円`;
  document.getElementById('totalProfitRate').innerText = `総利益率: ${totalProfitRate.toFixed(2)}%`;
}

// Toggles the display of the reinvestment form based on whether points are being cashed out
function toggleReinvestmentForm() {
  const cashOut = document.getElementById('cashOut').checked;
  document.getElementById('reinvestmentForm').style.display = cashOut ? 'block' : 'none';
}

// Adds a new expense input field
function addExpense() {
  const expenseContainer = document.getElementById('purchaseExpenses');
  const newExpenseItem = document.createElement('div');
  newExpenseItem.classList.add('expense-item');
  newExpenseItem.innerHTML = '<input type="number" class="expense" oninput="updateCalculations()" placeholder="経費">';
  expenseContainer.appendChild(newExpenseItem);
}

// Adds a new resale expense input field
function addResaleExpense() {
  const resaleExpenseContainer = document.getElementById('resaleExpenses');
  const newResaleExpenseItem = document.createElement('div');
  newResaleExpenseItem.classList.add('resale-item');
  newResaleExpenseItem.innerHTML = '<input type="number" class="resaleExpense" oninput="updateCalculations()" placeholder="転売経費">';
  resaleExpenseContainer.appendChild(newResaleExpenseItem);
}

// Adds a new reinvestment expense input field
function addReinvestmentExpense() {
  const reinvestmentExpenseContainer = document.getElementById('reinvestmentPurchaseExpenses');
  const newReinvestmentExpenseItem = document.createElement('div');
  newReinvestmentExpenseItem.classList.add('reinvestmentExpense-item');
  newReinvestmentExpenseItem.innerHTML = '<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentCalculations()" placeholder="経費">';
  reinvestmentExpenseContainer.appendChild(newReinvestmentExpenseItem);
}

// Adds a new reinvestment resale expense input field
function addReinvestmentResaleExpense() {
  const reinvestmentResaleExpenseContainer = document.getElementById('reinvestmentResaleExpenses');
  const newReinvestmentResaleExpenseItem = document.createElement('div');
  newReinvestmentResaleExpenseItem.classList.add('reinvestmentResale-item');
  newReinvestmentResaleExpenseItem.innerHTML = '<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentCalculations()" placeholder="転売経費">';
  reinvestmentResaleExpenseContainer.appendChild(newReinvestmentResaleExpenseItem);
}

// Updates fee based on user selection
function updateFee() {
  updateCalculations();
}

// Updates reinvestment fee based on user selection
function updateReinvestmentFee() {
  updateReinvestmentCalculations();
}

// Submits the form
function submitForm() {
  alert('稟議書が提出されました。');
}
