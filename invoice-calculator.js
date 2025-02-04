document.addEventListener("DOMContentLoaded", function () {
    const VAT_RATE = 0.24; // Example VAT rate (24%)

    const invoiceForm = document.getElementById("invoice-form");
    const resultDiv = document.getElementById("result");

    invoiceForm.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const numInvoices = parseInt(document.getElementById("numInvoices").value);
        let totalAmount = 0;

        for (let i = 1; i <= numInvoices; i++) {
            let amountWithoutVAT = parseFloat(document.getElementById(`amountWithoutVAT${i}`).value) || 0;
            let tips = parseFloat(document.getElementById(`tips${i}`).value) || 0;
            let deduction = parseFloat(document.getElementById(`deduction${i}`).value) || 0;
            
            let vatAmount = amountWithoutVAT * VAT_RATE;
            totalAmount += amountWithoutVAT + vatAmount + tips - deduction;
        }

        resultDiv.innerHTML = `<h3>Total Amount: ${totalAmount.toFixed(2)} €</h3>`;
    });
});
