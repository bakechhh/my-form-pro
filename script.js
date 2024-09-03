// 計算を更新する関数
function updateCalculations() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
  const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
  const expenses = Array.from(document.querySelectorAll('#purchaseExpenses .expense')).map(input => parseFloat(input.value) || 0);
  const resaleExpenses = Array.from(document.querySelectorAll('#resaleExpenses .resaleExpense')).map(input => parseFloat(input.value) || 0);
  const feeRate = parseFloat(document.querySelector('input[name="fee"]:checked')?.value) || 0;

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense, 0);
  const totalResaleExpenses = resaleExpenses.reduce((sum, expense) => sum + expense, 0);
  const feeAmount = standardPrice * feeRate;
  const profit = standardPrice - purchasePrice - totalExpenses - totalResaleExpenses - feeAmount;

  document.getElementById('lowerLimit').value = (standardPrice * 0.8).toFixed(2); // 下限価格
  document.getElementById('upperLimit').value = (standardPrice * 1.2).toFixed(2); // 上限価格

  document.getElementById('feeAmount').value = feeAmount.toFixed(2);
  document.getElementById('profit').textContent = `利益: ${profit.toFixed(2)} 円`;
  document.getElementById('profitRate').textContent = `利益率: ${((profit / (purchasePrice + totalExpenses)) * 100).toFixed(2)}%`;

  // 案件利益の更新
  updateReinvestmentCalculations();
}

// 再投資計算を更新する関数
function updateReinvestmentCalculations() {
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
  document.getElementById('reinvestmentProfitRate').textContent = `再投資利益率: ${isNaN(reinvestmentProfitRate) ? 'NaN%' : reinvestmentProfitRate.toFixed(2) + '%'}`;

  // 再投資の上限と下限価格
  document.getElementById('reinvestmentLowerLimit').value = (reinvestmentStandardPrice * 0.9).toFixed(2); // 下限価格
  document.getElementById('reinvestmentUpperLimit').value = (reinvestmentStandardPrice * 1.1).toFixed(2); // 上限価格

  // 案件利益の計算と表示
  const profit = parseFloat(document.getElementById('profit').textContent.replace('利益: ', '').replace(' 円', '')) || 0;
  const totalProfit = profit + reinvestmentProfit;
  const totalProfitRate = (totalProfit / (purchasePrice + totalReinvestmentExpensesSum)) * 100;

  document.getElementById('totalProfit').textContent = `総利益: ${totalProfit.toFixed(2)} 円`;
  document.getElementById('totalProfitRate').textContent = `総利益率: ${totalProfitRate.toFixed(2)}%`;

  document.getElementById('caseProfit').textContent = `案件利益: ${totalProfit.toFixed(2)} 円`;
}

// チェックボックスで再投資フォームの表示/非表示を切り替える関数
function toggleReinvestmentForm() {
  const cashOut = document.getElementById('cashOut').checked;
  document.getElementById('reinvestmentForm').style.display = cashOut ? 'block' : 'none';
}

// フォームの提出
function submitForm() {
  alert('フォームが提出されました。');
  // フォーム送信処理をここに追加できます
}

// 初期計算の呼び出し
document.addEventListener('DOMContentLoaded', () => {
  updateCalculations(); // ページロード時に計算を更新
});
