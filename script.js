// グローバル変数
let purchaseExpenses = [];
let resaleExpenses = [];
let reinvestmentPurchaseExpenses = [];
let reinvestmentResaleExpenses = [];

// 仕入れ経費追加
function addExpense() {
  const expenseDiv = document.createElement('div');
  expenseDiv.className = 'expense-item';
  expenseDiv.innerHTML = '<input type="number" class="expense" oninput="updateProfit()" placeholder="経費">';
  document.getElementById('purchaseExpenses').appendChild(expenseDiv);
  updateProfit();
}

// 転売時経費追加
function addResaleExpense() {
  const resaleDiv = document.createElement('div');
  resaleDiv.className = 'resale-item';
  resaleDiv.innerHTML = '<input type="number" class="resaleExpense" oninput="updateProfit()" placeholder="転売経費">';
  document.getElementById('resaleExpenses').appendChild(resaleDiv);
  updateProfit();
}

// 再投資仕入れ経費追加
function addReinvestmentExpense() {
  const expenseDiv = document.createElement('div');
  expenseDiv.className = 'reinvestmentExpense-item';
  expenseDiv.innerHTML = '<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentProfit()" placeholder="経費">';
  document.getElementById('reinvestmentPurchaseExpenses').appendChild(expenseDiv);
  updateReinvestmentProfit();
}

// 再投資転売時経費追加
function addReinvestmentResaleExpense() {
  const resaleDiv = document.createElement('div');
  resaleDiv.className = 'reinvestmentResale-item';
  resaleDiv.innerHTML = '<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentProfit()" placeholder="転売経費">';
  document.getElementById('reinvestmentResaleExpenses').appendChild(resaleDiv);
  updateReinvestmentProfit();
}

// 利益計算
function updateProfit() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const feeRate = parseFloat(document.querySelector('input[name="fee"]:checked').value) || 0;
  const cashOut = document.getElementById('cashOut').checked;

  // 仕入れ経費合計
  const purchaseExpensesTotal = Array.from(document.querySelectorAll('.expense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  // 転売時経費合計
  const resaleExpensesTotal = Array.from(document.querySelectorAll('.resaleExpense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  // 手数料
  const feeAmount = standardPrice * feeRate;

  // 利益計算
  const totalCost = purchasePrice + purchaseExpensesTotal;
  const salePrice = standardPrice - resaleExpensesTotal;
  const profit = salePrice - totalCost - (cashOut ? points : 0);
  const profitRate = (totalCost > 0) ? (profit / totalCost) * 100 : 0;

  // 下限価格と上限価格
  const lowerLimit = standardPrice * 0.9; // 仮の下限価格
  const upperLimit = standardPrice * 1.1; // 仮の上限価格

  document.getElementById('feeAmount').value = feeAmount.toFixed(2);
  document.getElementById('profit').textContent = `総利益: ${profit.toFixed(2)} 円`;
  document.getElementById('profitRate').textContent = `利益率: ${profitRate.toFixed(2)}%`;
  document.getElementById('lowerLimit').value = lowerLimit.toFixed(2);
  document.getElementById('upperLimit').value = upperLimit.toFixed(2);
}

// 再投資利益計算
function updateReinvestmentProfit() {
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
  const reinvestmentPoints = parseFloat(document.getElementById('points').value) || 0;
  const reinvestmentFeeRate = parseFloat(document.querySelector('input[name="reinvestmentFee"]:checked').value) || 0;

  // 再投資仕入れ経費合計
  const reinvestmentPurchaseExpensesTotal = Array.from(document.querySelectorAll('.reinvestmentExpense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  // 再投資転売時経費合計
  const reinvestmentResaleExpensesTotal = Array.from(document.querySelectorAll('.reinvestmentResaleExpense')).reduce((sum, input) => sum + parseFloat(input.value) || 0, 0);

  // 再投資手数料
  const reinvestmentFeeAmount = reinvestmentStandardPrice * reinvestmentFeeRate;

  // 再投資利益計算
  const reinvestmentTotalCost = reinvestmentPurchasePrice + reinvestmentPurchaseExpensesTotal;
  const reinvestmentSalePrice = reinvestmentStandardPrice - reinvestmentResaleExpensesTotal;
  const reinvestmentProfit = reinvestmentSalePrice - reinvestmentTotalCost - (reinvestmentPoints || 0);
  const reinvestmentProfitRate = (reinvestmentTotalCost > 0) ? (reinvestmentProfit / reinvestmentTotalCost) * 100 : 0;

  // 再投資下限価格と上限価格
  const reinvestmentLowerLimit = reinvestmentStandardPrice * 0.9; // 仮の下限価格
  const reinvestmentUpperLimit = reinvestmentStandardPrice * 1.1; // 仮の上限価格

  document.getElementById('reinvestmentFeeAmount').value = reinvestmentFeeAmount.toFixed(2);
  document.getElementById('reinvestmentProfit').textContent = `再投資総利益: ${reinvestmentProfit.toFixed(2)} 円`;
  document.getElementById('reinvestmentProfitRate').textContent = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;
  document.getElementById('reinvestmentLowerLimit').value = reinvestmentLowerLimit.toFixed(2);
  document.getElementById('reinvestmentUpperLimit').value = reinvestmentUpperLimit.toFixed(2);
}

// 手数料の更新
function updateFee() {
  updateProfit();
}

// 再投資手数料の更新
function updateReinvestmentFee() {
  updateReinvestmentProfit();
}

// ポイント現金化のトグル
function toggleReinvestmentForm() {
  const cashOut = document.getElementById('cashOut').checked;
  document.getElementById('reinvestmentForm').style.display = cashOut ? 'block' : 'none';
}

// フォーム提出
function submitForm() {
  alert('フォームが提出されました！');
}
