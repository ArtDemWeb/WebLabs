document.addEventListener('DOMContentLoaded', function() {
    const depositTypeSelect = document.getElementById('deposit-type');
    const depositTermSelect = document.getElementById('deposit-term');
    const amountInput = document.getElementById('amount');
    const resultDiv = document.getElementById('result');
    const form = document.getElementById('deposit-form');

    const depositsData = {
        replenishable: [
            { term: '6 месяцев', rate: 20 },
            { term: '1 год', rate: 22 },
            { term: '1,5 года', rate: 15 },
            { term: '2 года', rate: 10 }
        ],
        term: [
            { term: '3 месяца', rate: 20 },
            { term: '6 месяцев', rate: 22 },
            { term: '9 месяцев', rate: 23 },
            { term: '1 год', rate: 24 },
            { term: '1,5 года', rate: 18 },
            { term: '2 года', rate: 15 }
        ]
    };

    // Маппинг типов вкладов на русский язык
    const depositTypesMap = {
        replenishable: 'Пополняемый',
        term: 'Срочный'
    };

    // Обработчик изменения типа вклада
    depositTypeSelect.addEventListener('change', function() {
        const selectedDepositType = this.value;
        depositTermSelect.disabled = false;

        if (selectedDepositType === '') {
            depositTermSelect.innerHTML = '<option value="">Выберите срок вклада</option>';
            return;
        }

        let optionsHtml = '';
        depositsData[selectedDepositType].forEach(deposit => {
            optionsHtml += `<option value="${deposit.term}">${deposit.term}</option>`;
        });

        depositTermSelect.innerHTML = `
            <option value="">Выберите срок вклада</option>
            ${optionsHtml}
        `;
    });

    // Обработка отправки формы
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const selectedDepositType = depositTypeSelect.value;
        const selectedDepositTerm = depositTermSelect.value;
        const amount = parseFloat(amountInput.value);

        if (!selectedDepositType || !selectedDepositTerm || isNaN(amount)) {
            alert('Заполните все обязательные поля!');
            return;
        }

        const depositInfo = depositsData[selectedDepositType].find(deposit => deposit.term === selectedDepositTerm);
        const interestRate = depositInfo.rate / 100;
        const totalAmount = amount * (1 + interestRate);

        // Используем перевод на русский язык для вывода текста
        const depositTypeInRussian = depositTypesMap[selectedDepositType];

        resultDiv.textContent = `
            Вы выбрали вклад "${depositTypeInRussian}" на срок "${selectedDepositTerm}". 
            Сумма вклада составляет ${amount.toFixed(2)} рублей. 
            Итоговая сумма через указанный срок составит ${totalAmount.toFixed(2)} рублей.
        `;
    });
});