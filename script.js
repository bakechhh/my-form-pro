function updateCalculations() {
    // 商品の値を取得
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
    const standardPrice = parseFloat(document.getElementById('standardPrice').value) || 0;
    const points = parseFloat(document.getElementById('points').value) || 0;
    const cashOut = document.getElementById('cashOut').checked;

    // 経費と転売経費の取得
    const purchaseExpenses = Array.from(document.querySelectorAll('#purchaseExpenses .expense')).map(e => parseFloat(e.value) || 0);
    const resaleExpenses = Array.from(document.querySelectorAll('#resaleExpenses .resaleExpense')).map(e => parseFloat(e.value) || 0);

    // 手数料の取得
    const feeRadio = document.querySelector('input[name="fee"]:checked');
    const feePercentage = parseFloat(feeRadio ? feeRadio.value : '0') || 0;

    // 手数料の計算
    const feeAmount = standardPrice * feePercentage;
    document.getElementById('feeAmount').value = feeAmount.toFixed(2);

    // 経費と手数料の合計を計算
    const totalPurchaseExpenses = purchaseExpenses.reduce((sum, expense) => sum + expense, 0);
    const totalResaleExpenses = resaleExpenses.reduce((sum, expense) => sum + expense, 0);

    // 利益の計算
    const profit = standardPrice - purchasePrice - totalPurchaseExpenses - totalResaleExpenses - feeAmount;
    const profitRate = (profit / (purchasePrice + totalPurchaseExpenses)) * 100;

    // ポイント利用の影響を計算
    const totalProfit = cashOut ? profit + points : profit;
    const totalProfitRate = (totalProfit / (purchasePrice + totalPurchaseExpenses)) * 100;

    // 結果の表示
    document.getElementById('profit').textContent = `総利益: ${totalProfit.toFixed(2)} 円`;
    document.getElementById('profitRate').textContent = `利益率: ${isNaN(profitRate) ? '0.00' : profitRate.toFixed(2)}%`;

    // 上限と下限の自動計算
    const lowerLimit = standardPrice * 0.9;
    const upperLimit = standardPrice * 1.1;
    document.getElementById('lowerLimit').value = lowerLimit.toFixed(2);
    document.getElementById('upperLimit').value = upperLimit.toFixed(2);
}

function updateReinvestmentCalculations() {
    // 再投資商品の値を取得
    const reinvestmentPurchasePrice = parseFloat(document.getElementById('reinvestmentPurchasePrice').value) || 0;
    const reinvestmentStandardPrice = parseFloat(document.getElementById('reinvestmentStandardPrice').value) || 0;
    const reinvestmentPoints = 0; // 再投資でポイントを使用しないと仮定
    const reinvestmentCashOut = false; // 再投資で現金化しないと仮定

    // 再投資経費と転売経費の取得
    const reinvestmentPurchaseExpenses = Array.from(document.querySelectorAll('#reinvestmentPurchaseExpenses .reinvestmentExpense')).map(e => parseFloat(e.value) || 0);
    const reinvestmentResaleExpenses = Array.from(document.querySelectorAll('#reinvestmentResaleExpenses .reinvestmentResaleExpense')).map(e => parseFloat(e.value) || 0);

    // 再投資手数料の取得
    const reinvestmentFeeRadio = document.querySelector('input[name="reinvestmentFee"]:checked');
    const reinvestmentFeePercentage = parseFloat(reinvestmentFeeRadio ? reinvestmentFeeRadio.value : '0') || 0;

    // 再投資手数料の計算
    const reinvestmentFeeAmount = reinvestmentStandardPrice * reinvestmentFeePercentage;
    document.getElementById('reinvestmentFeeAmount').value = reinvestmentFeeAmount.toFixed(2);

    // 再投資経費と手数料の合計を計算
    const totalReinvestmentPurchaseExpenses = reinvestmentPurchaseExpenses.reduce((sum, expense) => sum + expense, 0);
    const totalReinvestmentResaleExpenses = reinvestmentResaleExpenses.reduce((sum, expense) => sum + expense, 0);

    // 再投資利益の計算
    const reinvestmentProfit = reinvestmentStandardPrice - reinvestmentPurchasePrice - totalReinvestmentPurchaseExpenses - totalReinvestmentResaleExpenses - reinvestmentFeeAmount;
    const reinvestmentProfitRate = (reinvestmentProfit / (reinvestmentPurchasePrice + totalReinvestmentPurchaseExpenses)) * 100;

    // 再投資の利益にポイント現金化の影響を加算
    const totalReinvestmentProfit = reinvestmentCashOut ? reinvestmentProfit + reinvestmentPoints : reinvestmentProfit;
    const totalReinvestmentProfitRate = (totalReinvestmentProfit / (reinvestmentPurchasePrice + totalReinvestmentPurchaseExpenses)) * 100;

    // 結果の表示
    document.getElementById('reinvestmentProfit').textContent = `再投資総利益: ${totalReinvestmentProfit.toFixed(2)} 円`;
    document.getElementById('reinvestmentProfitRate').textContent = `再投資利益率: ${isNaN(reinvestmentProfitRate) ? '0.00' : reinvestmentProfitRate.toFixed(2)}%`;

    // 案件利益の計算
    const totalProfitAll = (parseFloat(document.getElementById('profit').textContent.replace('総利益: ', '').replace(' 円', '')) || 0) + totalReinvestmentProfit;
    const totalProfitRateAll = (totalProfitAll / (purchasePrice + totalPurchaseExpenses)) * 100;
    
    // 結果の表示
    document.getElementById('totalProfitAll').textContent = `案件利益: ${totalProfitAll.toFixed(2)} 円`;
    document.getElementById('totalProfitRateAll').textContent = `案件利益率: ${isNaN(totalProfitRateAll) ? '0.00' : totalProfitRateAll.toFixed(2)}%`;
}
