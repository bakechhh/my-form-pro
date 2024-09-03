function calculateLimits() {
  const standardPrice = parseFloat(document.getElementById('standardPrice').value);
  if (isNaN(standardPrice)) return;

  const lowerLimit = standardPrice * 0.95; // 標準価格の5%下限
  const upperLimit = standardPrice * 1.05; // 標準価格の5%上限

  document.getElementById('lowerLimit').value = lowerLimit.toFixed(2);
  document.getElementById('upperLimit').value = upperLimit.toFixed(2);

  // 利益の計算と表示
  updateProfit();
}

function updateProfit() {
  const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
  const sellingPrice = parseFloat(document.getElementById('standardPrice').value);
  const expenses = parseFloat(document.getElementById('expenses').value) || 0;
  const points = parseFloat(document.getElementById('points').value) || 0;
  const cashOut = document.getElementById('cashOut').checked;

  // 手数料の取得
  const feeRadioButtons = document.getElementsByName('fee');
  let fee = 0;
  for (const radioButton of feeRadioButtons) {
    if (radioButton.checked) {
      fee = parseFloat(radioButton.value);
      break;
    }
  }

  if (isNaN(purchasePrice) || isNaN(sellingPrice)) return;

  let profit = sellingPrice - purchasePrice - expenses - (sellingPrice * fee);
  const profitRate = (profit / (purchasePrice + expenses)) * 100;

  // ポイントの処理
  if (cashOut) {
    profit += points;
  }

  // 利益と利益率の表示
  const profitDisplay = document.getElementById('profit');
  const profitRateDisplay = document.getElementById('profitRate');
  const profitWithPointsDisplay = document.getElementById('profitWithPoints');

  profitDisplay.innerText = `利益: ${profit.toFixed(2)} 円`;
  profitRateDisplay.innerText = `利益率: ${profitRate.toFixed(2)} %`;

  if (profitRate < 10) {
    profitDisplay.className = 'result red';
  } else {
    profitDisplay.className = 'result green';
  }

  if (cashOut) {
    profitWithPointsDisplay.innerText = `ポイント現金化後の利益: ${profit.toFixed(2)} 円（+${points.toFixed(0)}P）`;
  } else {
    profitWithPointsDisplay.innerText = '';
  }
}

function submitForm() {
  const form = document.getElementById('form');
  const formData = new FormData(form);

  fetch('https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec', {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(formData))
  })
  .then(response => response.text())
  .then(result => alert('稟議書が送信されました。'))
  .catch(error => console.error('Error:', error));
}
