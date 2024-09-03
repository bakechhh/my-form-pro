function updateProfit() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
  const sellingPrice = parseFloat(document.getElementById('standardPrice').value);
  const points = parseFloat(document.getElementById('points').value) || 0;
  const cashOut = document.getElementById('cashOut').checked;
  const feeAmount = parseFloat(document.getElementById('feeAmount').value) || 0;

  const expenses = Array.from(document.getElementsByClassName('expense'))
    .map(input => parseFloat(input.value) || 0)
    .reduce((a, b) => a + b, 0);

  const resaleExpenses = Array.from(document.getElementsByClassName('resaleExpense'))
    .map(input => parseFloat(input.value) || 0)
    .reduce((a, b) => a + b, 0);

  const totalPurchaseCost = purchasePrice + expenses;
  const totalSellingCost = sellingPrice - feeAmount + resaleExpenses;
  const profit = totalSellingCost - totalPurchaseCost;
  const profitRate = totalSellingCost === 0 ? 0 : (profit / totalPurchaseCost) * 100;

  const lowerBoundPrice = sellingPrice * 0.95;
  const upperBoundPrice = sellingPrice * 1.05;
  const lowerBoundProfit = lowerBoundPrice - totalPurchaseCost;
  const upperBoundProfit = upperBoundPrice - totalPurchaseCost;

  document.getElementById('profit').textContent = `利益: ${profit.toFixed(2)}円`;
  document.getElementById('profitRate').textContent = `利益率: ${profitRate.toFixed(2)}%`;

  if (profitRate < 10) {
    document.getElementById('profit').className = 'result red';
  } else {
    document.getElementById('profit').className = 'result green';
  }

  document.getElementById('lowerBoundProfit').textContent = `下限価格での利益: ${lowerBoundProfit.toFixed(2)}円`;
  document.getElementById('standardProfit').textContent = `標準価格での利益: ${profit.toFixed(2)}円`;
  document.getElementById('upperBoundProfit').textContent = `上限価格での利益: ${upperBoundProfit.toFixed(2)}円`;

  if (cashOut) {
    showReinvestForm();
  } else {
    document.getElementById('reinvestmentForm').style.display = 'none';
    document.getElementById('totalProfit').style.display = 'none';
    document.getElementById('totalProfitRate').style.display = 'none';
  }
}

function updateReinvestmentProfit() {
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value);
  const reinvestmentSellingPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value);
  const reinvestmentPoints = parseFloat(document.getElementById('points').value) || 0;
  const reinvestmentFeeAmount = parseFloat(document.getElementById('reinvestmentFeeAmount').value) || 0;

  const reinvestmentExpenses = Array.from(document.getElementsByClassName('reinvestmentExpense'))
    .map(input => parseFloat(input.value) || 0)
    .reduce((a, b) => a + b, 0);

  const reinvestmentResaleExpenses = Array.from(document.getElementsByClassName('reinvestmentResaleExpense'))
    .map(input => parseFloat(input.value) || 0)
    .reduce((a, b) => a + b, 0);

  const totalReinvestmentPurchaseCost = reinvestmentPurchasePrice + reinvestmentExpenses;
  const totalReinvestmentSellingCost = reinvestmentSellingPrice - reinvestmentFeeAmount + reinvestmentResaleExpenses;
  const reinvestmentProfit = totalReinvestmentSellingCost - totalReinvestmentPurchaseCost;
  const reinvestmentProfitRate = totalReinvestmentSellingCost === 0 ? 0 : (reinvestmentProfit / totalReinvestmentPurchaseCost) * 100;

  const initialProfit = parseFloat(document.getElementById('profit').textContent.replace(/利益: /, '').replace(/円.*/, '')) || 0;
  const totalProfit = initialProfit + reinvestmentProfit;
  const totalProfitRate = totalProfit === 0 ? 0 : (totalProfit / (parseFloat(document.getElementById('purchasePrice').value) + reinvestmentPurchasePrice)) * 100;

  document.getElementById('reinvestmentDetails').textContent = `
    再投資仕入れ価格: ${reinvestmentPurchasePrice.toFixed(2)}円
    再投資利益: ${reinvestmentProfit.toFixed(2)}円
    再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%
  `;

  document.getElementById('totalProfit').textContent = `総利益: ${totalProfit.toFixed(2)}円 + ${reinvestmentPoints.toFixed(2)}P`;
  document.getElementById('totalProfitRate').textContent = `総利益率: ${totalProfitRate.toFixed(2)}%`;
}

function showReinvestForm() {
  document.getElementById('reinvestmentForm').style.display = 'block';
}

function addExpense() {
  const div = document.createElement('div');
  div.innerHTML = `<input type="number" class="expense" oninput="updateProfit()">円`;
  document.getElementById('purchaseExpenses').appendChild(div);
}

function addResaleExpense() {
  const div = document.createElement('div');
  div.innerHTML = `<input type="number" class="resaleExpense" oninput="updateProfit()">円`;
  document.getElementById('reinvestmentResaleExpenses').appendChild(div);
}

function addReinvestmentExpense() {
  const div = document.createElement('div');
  div.innerHTML = `<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentProfit()">円`;
  document.getElementById('reinvestmentPurchaseExpenses').appendChild(div);
}

function addReinvestmentResaleExpense() {
  const div = document.createElement('div');
  div.innerHTML = `<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentProfit()">円`;
  document.getElementById('reinvestmentResaleExpenses').appendChild(div);
}

function toggleReinvestmentForm() {
  const cashOut = document.getElementById('cashOut').checked;
  if (cashOut) {
    showReinvestForm();
  } else {
    document.getElementById('reinvestmentForm').style.display = 'none';
    document.getElementById('totalProfit').style.display = 'none';
    document.getElementById('totalProfitRate').style.display = 'none';
  }
}

function submitForm() {
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // テキストを整形してLINE用のフォーマットを作成
  const formattedText = `
商品名: ${data.productName}
仕入れ価格: ${data.purchasePrice}円
仕入れ時経費: ${getExpenses('expense')}
標準価格: ${data.standardPrice}円
下限価格: ${calculateLowerBound(data.standardPrice)}円
上限価格: ${calculateUpperBound(data.standardPrice)}円
転売時経費: ${getExpenses('resaleExpense')}
手数料: ${getFee()}円
ポイント: ${data.points}P
${data.cashOut ? getReinvestmentInfo() : ''}
  `.trim();

  // Google Apps Script にデータを送信
  fetch('https://script.google.com/macros/s/AKfycbxfLrAfByuxCDokTwrFbprU7TKBufVrjOVMYXXa85NVBf2_M695xytzaLwoiIQlc-Dp/exec', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.text())
  .then(result => {
    alert('稟議書が送信されました。');
    copyToClipboard(formattedText); // クリップボードにコピー
  })
  .catch(error => console.error('Error:', error));
}

// 経費を取得するヘルパー関数
function getExpenses(className) {
  return Array.from(document.getElementsByClassName(className))
    .map(input => `${parseFloat(input.value) || 0}円`)
    .join(', ');
}

// 下限価格を計算するヘルパー関数
function calculateLowerBound(standardPrice) {
  return (standardPrice * 0.95).toFixed(2);
}

// 上限価格を計算するヘルパー関数
function calculateUpperBound(standardPrice) {
  return (standardPrice * 1.05).toFixed(2);
}

// 手数料を取得するヘルパー関数
function getFee() {
  const fee = parseFloat(document.getElementById('feeAmount').value) || 0;
  return fee.toFixed(2);
}

// 再投資情報を取得するヘルパー関数
function getReinvestmentInfo() {
  const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
  const reinvestmentSellingPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
  const reinvestmentFee = parseFloat(document.getElementById('reinvestmentFeeAmount').value) || 0;

  const reinvestmentExpenses = Array.from(document.getElementsByClassName('reinvestmentExpense'))
    .map(input => `${parseFloat(input.value) || 0}円`)
    .join(', ');

  return `
再投資仕入れ価格: ${reinvestmentPurchasePrice}円
再投資標準価格: ${reinvestmentSellingPrice}円
再投資手数料: ${reinvestmentFee}円
再投資経費: ${reinvestmentExpenses}
  `.trim();
}

// クリップボードにコピーする関数
function copyToClipboard(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert('内容がクリップボードにコピーされました。');
}
