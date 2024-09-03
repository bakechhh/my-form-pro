// 経費追加機能
function addExpense() {
  const container = document.getElementById('purchaseExpenses');
  const newExpense = document.createElement('div');
  newExpense.className = 'expense-item';
  newExpense.innerHTML = '<input type="number" class="expense" oninput="updateProfit()" placeholder="経費">';
  container.appendChild(newExpense);
}

function addResaleExpense() {
  const container = document.getElementById('resaleExpenses');
  const newExpense = document.createElement('div');
  newExpense.className = 'resale-item';
  newExpense.innerHTML = '<input type="number" class="resaleExpense" oninput="updateProfit()" placeholder="転売経費">';
  container.appendChild(newExpense);
}

function addReinvestmentExpense() {
  const container = document.getElementById('reinvestmentPurchaseExpenses');
  const newExpense = document.createElement('div');
  newExpense.className = 'reinvestmentExpense-item';
  newExpense.innerHTML = '<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentProfit()" placeholder="経費">';
  container.appendChild(newExpense);
}

function addReinvestmentResaleExpense() {
  const container = document.getElementById('reinvestmentResaleExpenses');
  const newExpense = document.createElement('div');
  newExpense.className = 'reinvestmentResale-item';
  newExpense.innerHTML = '<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentProfit()" placeholder="転売経費">';
  container.appendChild(newExpense);
}

// 計算関連
function calculateLimits() {
  const standardPrice = parseFloat(document.getElementById('standardPrice').value);
  const lowerLimit = standardPrice * 0.9; // 10%引き
  const upperLimit = standardPrice * 1.1; // 10%上乗せ
  document.getElementById('lowerLimit').value = lowerLimit.toFixed(2);
  document.getElementById('upperLimit').value = upperLimit.toFixed(2);
  updateProfit();
}

function updateProfit() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const feePercentage = parseFloat(document.querySelector('input[name="fee"]:checked').value) || 0;
  const cashOut = document.getElementById('cashOut').checked;

  let totalExpenses = 0;
  document.querySelectorAll('.expense').forEach(expense => {
    totalExpenses += parseFloat(expense.value) || 0;
  });

  let resaleExpenses = 0;
  document.querySelectorAll('.resaleExpense').forEach(expense => {
    resaleExpenses += parseFloat(expense.value) || 0;
  });

  const feeAmount = standardPrice * feePercentage;
  document.getElementById('feeAmount').value = feeAmount.toFixed(2);

  const totalProfit = standardPrice - (purchasePrice + totalExpenses + resaleExpenses + feeAmount - (cashOut ? points : 0));
  document.getElementById('totalProfit').innerText = `利益: ${totalProfit.toFixed(2)} 円`;

  const profitRate = (totalProfit / (purchasePrice + totalExpenses)) * 100;
  document.getElementById('totalProfitRate').innerText = `利益率: ${profitRate.toFixed(2)}%`;

  document.getElementById('profit').innerText = `総利益: ${totalProfit.toFixed(2)} 円`;
  document.getElementById('profitRate').innerText = `利益率: ${profitRate.toFixed(2)}%`;
}

function calculateReinvestmentLimits() {
  const standardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value);
  const lowerLimit = standardPrice * 0.9;
  const upperLimit = standardPrice * 1.1;
  document.getElementById('reinvestmentLowerLimit').value = lowerLimit.toFixed(2);
  document.getElementById('reinvestmentUpperLimit').value = upperLimit.toFixed(2);
  updateReinvestmentProfit();
}

function updateReinvestmentProfit() {
  const purchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
  const feePercentage = parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked').value) || 0;

  let totalExpenses = 0;
  document.querySelectorAll('.reinvestmentExpense').forEach(expense => {
    totalExpenses += parseFloat(expense.value) || 0;
  });

  let resaleExpenses = 0;
  document.querySelectorAll('.reinvestmentResaleExpense').forEach(expense => {
    resaleExpenses += parseFloat(expense.value) || 0;
  });

  const feeAmount = standardPrice * feePercentage;
  document.getElementById('reinvestmentFeeAmount').value = feeAmount.toFixed(2);

  const totalReinvestmentProfit = standardPrice - (purchasePrice + totalExpenses + resaleExpenses + feeAmount);
  document.getElementById('totalReinvestmentProfit').innerText = `再投資利益: ${totalReinvestmentProfit.toFixed(2)} 円`;

  const reinvestmentProfitRate = (totalReinvestmentProfit / (purchasePrice + totalExpenses)) * 100;
  document.getElementById('totalReinvestmentProfitRate').innerText = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;

  document.getElementById('reinvestmentProfit').innerText = `再投資総利益: ${totalReinvestmentProfit.toFixed(2)} 円`;
  document.getElementById('reinvestmentProfitRate').innerText = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;
}

function updateFee() {
  updateProfit();
}

function updateReinvestmentFee() {
  updateReinvestmentProfit();
}

function toggleReinvestmentForm() {
  const form = document.getElementById('reinvestmentForm');
  form.style.display = document.getElementById('cashOut').checked ? 'block' : 'none';
}

function submitForm() {
  alert('稟議書が提出されました');
}
