function addExpense() {
    const expenseContainer = document.getElementById('purchaseExpenses');
    const newExpenseInput = document.createElement('input');
    newExpenseInput.type = 'number';
    newExpenseInput.name = 'purchaseExpense';
    expenseContainer.insertBefore(newExpenseInput, expenseContainer.lastElementChild);
}

function addSellingExpense() {
    const sellingExpenseContainer = document.getElementById('sellingExpenses');
    const newSellingExpenseInput = document.createElement('input');
    newSellingExpenseInput.type = 'number';
    newSellingExpenseInput.name = 'sellingExpense';
    sellingExpenseContainer.insertBefore(newSellingExpenseInput, sellingExpenseContainer.lastElementChild);
}

function submitForm() {
    // フォームデータの処理
    const form = document.getElementById('approvalForm');
    const formData = new FormData(form);
    const resultDiv = document.getElementById('result');
    
    let resultText = '稟議書の内容:\n';
    formData.forEach((value, key) => {
        resultText += `${key}: ${value}\n`;
    });
    
    resultDiv.textContent = resultText;
}
