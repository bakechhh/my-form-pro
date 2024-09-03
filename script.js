function updateCalculations() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const fee = parseFloat(document.querySelector('input[name="fee"]:checked').value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const purchaseExpenses = Array.from(document.querySelectorAll('.expense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);
  const resaleExpenses = Array.from(document.querySelectorAll('.resaleExpense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);
  const cashOut = document.getElementById('cashOut').checked;

  const totalExpenses = purchasePrice + purchaseExpenses;
  const totalResaleExpenses = resaleExpenses;
  const feeAmount = standardPrice * fee;

  const lowerLimit = Math.max(0, standardPrice * 0.9); // Example calculation
  const upperLimit = Math.max(0, standardPrice * 1.1); // Example calculation

  const profit = standardPrice - totalExpenses - totalResaleExpenses - feeAmount;
  const profitRate = totalExpenses > 0 ? (profit / totalExpenses) * 100 : 0;

  document.getElementById('lowerLimit').value = lowerLimit.toFixed(2);
  document.getElementById('upperLimit').value = upperLimit.toFixed(2);
  document.getElementById('feeAmount').value = feeAmount.toFixed(2);

  document.getElementById('profit').textContent = `総利益: ${profit.toFixed(2)} 円`;
  document.getElementById('profitRate').textContent = `利益率: ${profitRate.toFixed(2)}%`;
  document.getElementById('totalProfit').textContent = `利益 (ポイント現金化${cashOut ? 'あり' : 'なし'}): ${profit.toFixed(2)} 円`;
  document.getElementById('totalProfitRate').textContent = `利益率 (ポイント現金化${cashOut ? 'あり' : 'なし'}): ${profitRate.toFixed(2)}%`;
}

function addExpense() {
  const expenseDiv = document.createElement('div');
  expenseDiv.className = 'expense-item';
  expenseDiv.innerHTML = `<input type="number" class="expense" oninput="updateCalculations()" placeholder="経費">`;
  document.getElementById('purchaseExpenses').appendChild(expenseDiv);
  updateCalculations();
}

function addResaleExpense() {
  const resaleExpenseDiv = document.createElement('div');
  resaleExpenseDiv.className = 'resale-item';
  resaleExpenseDiv.innerHTML = `<input type="number" class="resaleExpense" oninput="updateCalculations()" placeholder="転売経費">`;
  document.getElementById('resaleExpenses').appendChild(resaleExpenseDiv);
  updateCalculations();
}

function toggleReinvestmentForm() {
  const form = document.getElementById('reinvestmentForm');
  form.style.display = document.getElementById('cashOut').checked ? 'block' : 'none';
  updateReinvestmentCalculations();
}

function updateReinvestmentCalculations() {
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
  const reinvestmentFee = parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked').value) || 0;
  const reinvestmentPurchaseExpenses = Array.from(document.querySelectorAll('.reinvestmentExpense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);
  const reinvestmentResaleExpenses = Array.from(document.querySelectorAll('.reinvestmentResaleExpense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  const reinvestmentTotalExpenses = reinvestmentPurchasePrice + reinvestmentPurchaseExpenses;
  const reinvestmentTotalResaleExpenses = reinvestmentResaleExpenses;
  const reinvestmentFeeAmount = reinvestmentStandardPrice * reinvestmentFee;

  const reinvestmentLowerLimit = Math.max(0, reinvestmentStandardPrice * 0.9); // Example calculation
  const reinvestmentUpperLimit = Math.max(0, reinvestmentStandardPrice * 1.1); // Example calculation

  const reinvestmentProfit = reinvestmentStandardPrice - reinvestmentTotalExpenses - reinvestmentTotalResaleExpenses - reinvestmentFeeAmount;
  const reinvestmentProfitRate = reinvestmentTotalExpenses > 0 ? (reinvestmentProfit / reinvestmentTotalExpenses) * 100 : 0;

  document.getElementById('reinvestmentLowerLimit').value = reinvestmentLowerLimit.toFixed(2);
  document.getElementById('reinvestmentUpperLimit').value = reinvestmentUpperLimit.toFixed(2);
  document.getElementById('reinvestmentFeeAmount').value = reinvestmentFeeAmount.toFixed(2);

  document.getElementById('reinvestmentProfit').textContent = `再投資総利益: ${reinvestmentProfit.toFixed(2)} 円`;
  document.getElementById('reinvestmentProfitRate').textContent = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;

  document.getElementById('totalProfitAll').textContent = `再投資利益 (ポイント現金化あり): ${reinvestmentProfit.toFixed(2)} 円`;
  document.getElementById('totalProfitRateAll').textContent = `再投資利益率 (ポイント現金化あり): ${reinvestmentProfitRate.toFixed(2)}%`;
}

function addReinvestmentExpense() {
  const reinvestmentExpenseDiv = document.createElement('div');
  reinvestmentExpenseDiv.className = 'reinvestmentExpense-item';
  reinvestmentExpenseDiv.innerHTML = `<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentCalculations()" placeholder="経費">`;
  document.getElementById('reinvestmentPurchaseExpenses').appendChild(reinvestmentExpenseDiv);
  updateReinvestmentCalculations();
}

function addReinvestmentResaleExpense() {
  const reinvestmentResaleExpenseDiv = document.createElement('div');
  reinvestmentResaleExpenseDiv.className = 'reinvestmentResale-item';
  reinvestmentResaleExpenseDiv.innerHTML = `<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentCalculations()" placeholder="転売経費">`;
  document.getElementById('reinvestmentResaleExpenses').appendChild(reinvestmentResaleExpenseDiv);
  updateReinvestmentCalculations();
}

function submitForm() {
  // Form submission logic
  alert('フォームが送信されました！');
}
