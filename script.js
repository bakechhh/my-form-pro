function calculateLimits() {
  const standardPrice = parseFloat(document.getElementById('standardPrice').value);
  if (isNaN(standardPrice)) return;

  const lowerLimit = standardPrice * 0.95;
  const upperLimit = standardPrice * 1.05;

  document.getElementById('lowerLimit').value = lowerLimit.toFixed(2);
  document.getElementById('upperLimit').value = upperLimit.toFixed(2);

  updateProfit();
}

function updateFee() {
  const feeRadioButtons = document.getElementsByName('fee');
  let fee = 0;
  for (const radioButton of feeRadioButtons) {
    if (radioButton.checked) {
      fee = parseFloat(radioButton.value);
      break;
    }
  }

  const standardPrice = parseFloat(document.getElementById('standardPrice').value);
  const feeAmount = standardPrice * fee;

  document.getElementById('feeAmount').value = feeAmount.toFixed(2);

  updateProfit();
}

function updateReinvestmentFee() {
  const feeRadioButtons = document.getElementsByName('reinvestmentFee');
  let fee = 0;
  for (const radioButton of feeRadioButtons) {
    if (radioButton.checked) {
      fee = parseFloat(radioButton.value);
      break;
    }
  }

  const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value);
  const reinvestmentFeeAmount = reinvestmentStandardPrice * fee;

  document.getElementById('reinvestmentFeeAmount').value = reinvestmentFeeAmount.toFixed(2);

  updateReinvestmentProfit();
}

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

  let profitText = `利益: ${profit.toFixed(2)}円`;
  if (points > 0) {
    profitText += ` + ${points.toFixed(0)}P`;
  }
  document.getElementById('profit').textContent = profitText;
  document.getElementById('profitRate').textContent = `利益率: ${profitRate.toFixed(2)}%`;

  if (profitRate < 10) {
    document.getElementById('profit').className = 'result red';
  } else {
    document.getElementById('profit').className = 'result green';
  }

  if (cashOut) {
    showReinvestForm();
  } else {
    document.getElementById('reinvestmentForm').style.display = 'none';
  }
}

function showReinvestForm() {
  document.getElementById('reinvestmentForm').style.display = 'block';
  updateReinvestmentProfit();
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

  let reinvestmentProfitText = `再投資利益: ${reinvestmentProfit.toFixed(2)}円`;
  if (reinvestmentPoints > 0) {
    reinvestmentProfitText += ` + ${reinvestmentPoints.toFixed(0)}P`;
  }
  document.getElementById('reinvestmentProfit').textContent = reinvestmentProfitText;
  document.getElementById('reinvestmentProfitRate').textContent = `再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%`;

  if (reinvestmentProfitRate < 10) {
    document.getElementById('reinvestmentProfit').className = 'result red';
  } else {
    document.getElementById('reinvestmentProfit').className = 'result green';
  }

  document.getElementById('reinvestmentDetails').innerHTML = `
    <h3>再投資詳細:</h3>
    <p>再投資仕入れ価格: ${reinvestmentPurchasePrice.toFixed(2)}円</p>
    <p>再投資経費: ${reinvestmentExpenses.toFixed(2)}円</p>
    <p>再投資転売時経費: ${reinvestmentResaleExpenses.toFixed(2)}円</p>
    <p>再投資標準価格: ${reinvestmentSellingPrice.toFixed(2)}円</p>
    <p>再投資手数料: ${reinvestmentFeeAmount.toFixed(2)}円</p>
    <p>再投資利益: ${reinvestmentProfit.toFixed(2)}円</p>
    <p>再投資利益率: ${reinvestmentProfitRate.toFixed(2)}%</p>
  `;
}

function addExpense() {
  const expenseDiv = document.createElement('div');
  expenseDiv.className = 'expense-item';
  expenseDiv.innerHTML = '<input type="number" class="expense" oninput="updateProfit()" placeholder="仕入れ経費">';
  document.getElementById('purchaseExpenses').appendChild(expenseDiv);
}

function addResaleExpense() {
  const resaleExpenseDiv = document.createElement('div');
  resaleExpenseDiv.className = 'resale-item';
  resaleExpenseDiv.innerHTML = '<input type="number" class="resaleExpense" oninput="updateProfit()" placeholder="転売経費">';
  document.getElementById('resaleExpenses').appendChild(resaleExpenseDiv);
}

function addReinvestmentExpense() {
  const reinvestmentExpenseDiv = document.createElement('div');
  reinvestmentExpenseDiv.className = 'reinvestmentExpense-item';
  reinvestmentExpenseDiv.innerHTML = '<input type="number" class="reinvestmentExpense" oninput="updateReinvestmentProfit()" placeholder="再投資経費">';
  document.getElementById('reinvestmentPurchaseExpenses').appendChild(reinvestmentExpenseDiv);
}

function addReinvestmentResaleExpense() {
  const reinvestmentResaleExpenseDiv = document.createElement('div');
  reinvestmentResaleExpenseDiv.className = 'reinvestmentResale-item';
  reinvestmentResaleExpenseDiv.innerHTML = '<input type="number" class="reinvestmentResaleExpense" oninput="updateReinvestmentProfit()" placeholder="再投資転売経費">';
  document.getElementById('reinvestmentResaleExpenses').appendChild(reinvestmentResaleExpenseDiv);
}

function toggleReinvestmentForm() {
  if (document.getElementById('cashOut').checked) {
    showReinvestForm();
  } else {
    document.getElementById('reinvestmentForm').style.display = 'none';
  }
}

function submitForm() {
  const form = document.getElementById('form');
  const formData = new FormData(form);

  fetch('https://script.google.com/macros/s/AKfycbwRE2a0pqFvTWz5t-E6rddwK-TmO52E5tCVbCp5JSh5HGh7_gauXY3OiMx5tNrsPEJz/exec', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData))
  })
  .then(response => response.text())
  .then(result => alert('稟議書が送信されました。'))
  .catch(error => console.error('Error:', error));
}
