// script.js
function updateProfit() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const purchaseExpenses = Array.from(document.querySelectorAll('#purchaseExpenses .expense')).map(input => parseFloat(input.value) || 0);
  const resaleExpenses = Array.from(document.querySelectorAll('#resaleExpenses .resaleExpense')).map(input => parseFloat(input.value) || 0);
  const feeRate = parseFloat(document.querySelector('input[name="fee"]:checked')?.value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const cashOut = document.getElementById('cashOut').checked;

  const totalPurchaseExpenses = purchaseExpenses.reduce((sum, expense) => sum + expense, 0);
  const totalResaleExpenses = resaleExpenses.reduce((sum, expense) => sum + expense, 0);
  
  const totalExpenses = purchasePrice + totalPurchaseExpenses;
  const feeAmount = standardPrice * feeRate;
  const profit = standardPrice - totalExpenses - totalResaleExpenses - feeAmount;
  const profitRate = (profit / totalExpenses) * 100;
  
  document.getElementById('profit').textContent = `利益: ${profit.toFixed(2)} 円`;
  document.getElementById('profitRate').textContent = `利益率: ${profitRate.toFixed(2)}%`;

  if (cashOut) {
    updateReinvestmentProfit();
  } else {
    document.getElementById('totalProfit').textContent = `総利益: ${profit.toFixed(2)} 円`;
    document.getElementById('totalProfitRate').textContent = `利益率: ${profitRate.toFixed(2)}%`;
  }
}

function updateReinvestmentProfit() {
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
  const reinvestmentExpenses = Array.from(document.querySelectorAll('#reinvestmentPurchaseExpenses .reinvestmentExpense')).map(input => parseFloat(input.value) || 0);
  const reinvestmentResaleExpenses = Array.from(document.querySelectorAll('#reinvestmentResaleExpenses .reinvestmentResaleExpense')).map(input => parseFloat(input.value) || 0);
  const reinvestmentFeeRate = parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked')?.value) || 0;

  const totalReinvestmentExpenses = reinvestmentExpenses.reduce((sum, expense) => sum + expense, 0);
  const totalReinvestmentResaleExpenses = reinvestmentResaleExpenses.reduce((sum, expense) => sum + expense, 0);

  const totalReinvestmentExpensesSum = reinvestmentPurchasePrice + totalReinvestmentExpenses;
  const reinvestmentFeeAmount = reinvestmentStandardPrice * reinvestmentFeeRate;
  const reinvestmentProfit = reinvestmentStandardPrice - totalReinvestmentExpensesSum - totalReinvestmentResaleExpenses - reinvestmentFeeAmount;
  const reinvestmentProfitRate = (reinvestmentProfit / totalReinvestmentExpensesSum) * 100;

  document.getElementById('reinvestmentProfit').textContent = `再投資総利益: ${reinvestmentProfit.toFixed(2)} 円`;
  document.getElementById('reinvestmentProfitRate').textContent = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;

  const totalProfit = parseFloat(document.getElementById('profit').textContent.replace('利益: ', '').replace(' 円', '')) || 0;
  const updatedTotalProfit = totalProfit + reinvestmentProfit;
  const updatedTotalProfitRate = (updatedTotalProfit / (totalExpenses + totalReinvestmentExpensesSum)) * 100;

  document.getElementById('totalProfit').textContent = `総利益: ${updatedTotalProfit.toFixed(2)} 円`;
  document.getElementById('totalProfitRate').textContent = `総利益率: ${updatedTotalProfitRate.toFixed(2)}%`;
}

function addExpense() {
  const expenseItem = document.createElement('div');
  expenseItem.className = 'expense-item';
  expenseItem.innerHTML = '<input type="number" class="expense" oninput="updateProfit()" placeholder="経費">';
  document.getElementById('purchaseExpenses').appendChild(expenseItem);
}

function addResaleExpense() {
  const resaleExpenseItem = document.createElement('div');
  resaleExpenseItem.className = 'resale-item';
  resaleExpenseItem.innerHTML = '<input type="number" class="resaleExpense" oninput="updateProfit()" placeholder="転売経費">';
  document.getElementById('resaleExpenses').appendChild(resaleExpenseItem);
}

function addReinvestmentExpense() {
  const reinvestmentExpenseItem = document.createElement('div');
  reinvestmentExpenseItem.className = 'reinvestmentExpense-item';
  reinvestmentExpenseItem.innerHTML = '<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentProfit()" placeholder="経費">';
  document.getElementById('reinvestmentPurchaseExpenses').appendChild(reinvestmentExpenseItem);
}

function addReinvestmentResaleExpense() {
  const reinvestmentResaleExpenseItem = document.createElement('div');
  reinvestmentResaleExpenseItem.className = 'reinvestmentResale-item';
  reinvestmentResaleExpenseItem.innerHTML = '<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentProfit()" placeholder="転売経費">';
  document.getElementById('reinvestmentResaleExpenses').appendChild(reinvestmentResaleExpenseItem);
}

function updateFee() {
  const feeRate = parseFloat(document.querySelector('input[name="fee"]:checked')?.value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const feeAmount = standardPrice * feeRate;
  document.getElementById('feeAmount').value = feeAmount.toFixed(2);
  updateProfit();
}

function updateReinvestmentFee() {
  const reinvestmentFeeRate = parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked')?.value) || 0;
  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
  const reinvestmentFeeAmount = reinvestmentStandardPrice * reinvestmentFeeRate;
  document.getElementById('reinvestmentFeeAmount').value = reinvestmentFeeAmount.toFixed(2);
  updateReinvestmentProfit();
}

function toggleReinvestmentForm() {
  const cashOut = document.getElementById('cashOut').checked;
  document.getElementById('reinvestmentForm').style.display = cashOut ? 'block' : 'none';
  updateProfit(); // Update profit when toggling reinvestment form
}
