document.addEventListener('DOMContentLoaded', function () {
    const standardPriceInput = document.getElementById('standardPrice');
    const minimumPriceInput = document.getElementById('minimumPrice');
    const maximumPriceInput = document.getElementById('maximumPrice');
    const sellingPriceInput = document.getElementById('sellingPrice');
    const pointsInput = document.getElementById('points');
    const cashoutPointsCheckbox = document.getElementById('cashoutPoints');
    const profitSpan = document.getElementById('profit');
    const pointsDisplaySpan = document.getElementById('pointsDisplay');
    const profitMarginSpan = document.getElementById('profitMargin');

    function calculatePrices() {
        const standardPrice = parseFloat(standardPriceInput.value) || 0;
        minimumPriceInput.value = (standardPrice * 0.95).toFixed(2);
        maximumPriceInput.value = (standardPrice * 1.05).toFixed(2);
    }

    function calculateProfit() {
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
        const resaleExpenses = Array.from(document.querySelectorAll('input[name="resaleExpense"]'))
            .reduce((total, input) => total + (parseFloat(input.value) || 0), 0);
        const sellingPrice = parseFloat(sellingPriceInput.value) || 0;
        const points = parseFloat(pointsInput.value) || 0;
        const isCashout = cashoutPointsCheckbox.checked;

        let profit = sellingPrice - purchasePrice - resaleExpenses;
        let profitMargin = (profit / sellingPrice * 100).toFixed(2);

        if (isCashout) {
            profit += points; // ポイントを加味する
        }

        profitSpan.textContent = profit.toFixed(2);
        pointsDisplaySpan.textContent = `${points.toFixed(2)}P`;
        profitMarginSpan.textContent = `${profitMargin}%`;

        if (profitMargin < 10) {
            profitSpan.style.color = 'red';
            profitMarginSpan.style.color = 'red';
        } else {
            profitSpan.style.color = 'green';
            profitMarginSpan.style.color = 'green';
        }
    }

    standardPriceInput.addEventListener('input', calculatePrices);
    sellingPriceInput.addEventListener('input', calculateProfit);
    pointsInput.addEventListener('input', calculateProfit);
    cashoutPointsCheckbox.addEventListener('change', calculateProfit);
    document.getElementById('purchasePrice').addEventListener('input', calculateProfit);
    document.getElementById('resaleExpenses').addEventListener('input', calculateProfit);
    document.getElementById('resaleExpenses').addEventListener('change', calculateProfit);
    document.getElementById('purchaseExpensesContainer').addEventListener('input', calculateProfit);
    document.getElementById('purchaseExpensesContainer').addEventListener('change', calculateProfit);
});

function addExpense() {
    const container = document.getElementById('purchaseExpenses');
    const newExpense = document.createElement('div');
    newExpense.className = 'expenseItem';
    newExpense.innerHTML = '<input type="number" name="purchaseExpense" placeholder="経費">';
    container.appendChild(newExpense);
}

function addResaleExpense() {
    const container = document.getElementById('resaleExpenses');
    const newExpense = document.createElement('div');
    newExpense.className = 'expenseItem';
    newExpense.innerHTML = '<input type="number" name="resaleExpense" placeholder="経費">';
    container.appendChild(newExpense);
}
