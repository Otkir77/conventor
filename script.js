// ExchangeRate-API kalitini shu yerda o'zgartiring
const apiKey = '4f468819d10362ffb1e74a73';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

async function getCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const currencies = data.conversion_rates;

        let fromCurrency = document.getElementById('fromCurrency');
        let toCurrency = document.getElementById('toCurrency');

        for (let currency in currencies) {
            let option1 = document.createElement('option');
            option1.value = currency;
            option1.text = currency;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement('option');
            option2.value = currency;
            option2.text = currency;
            toCurrency.appendChild(option2);
        }
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convertCurrency() {
    let amount = document.getElementById('amount').value;
    let fromCurrency = document.getElementById('fromCurrency').value;
    let toCurrency = document.getElementById('toCurrency').value;

    if (amount === "" || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const data = await response.json();

        const convertedAmount = data.conversion_result;

        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
    }
}

getCurrencies();
