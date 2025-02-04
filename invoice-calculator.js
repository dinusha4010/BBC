document.addEventListener("DOMContentLoaded", function () {
    const VAT_RATE = 0.255; // Updated VAT rate (25.5%)

    const invoiceForm = document.getElementById("invoice-form");
    const invoiceFields = document.getElementById("invoice-fields");
    const numInvoicesInput = document.getElementById("numInvoices");
    const resultDiv = document.getElementById("result");

    // Function to generate input fields dynamically
    function generateInvoiceFields() {
        const numInvoices = parseInt(numInvoicesInput.value);
        invoiceFields.innerHTML = ""; // Clear existing fields

        for (let i = 1; i <= numInvoices; i++) {
            const invoiceDiv = document.createElement("div");
            invoiceDiv.classList.add("invoice-item");
            invoiceDiv.innerHTML = `
                <h4>Invoice ${i}</h4>
                <label>Amount without VAT: <input type="number" id="amountWithoutVAT${i}" step="any" required></label><br>
                <label>Tips: <input type="number" id="tips${i}" step="any"></label><br>
                <label>Deductions: <input type="number" id="deduction${i}" step="any"></label><br>
            `;
            invoiceFields.appendChild(invoiceDiv);
        }
    }

    // Generate fields on input change
    numInvoicesInput.addEventListener("input", generateInvoiceFields);
    generateInvoiceFields(); // Initial call

    invoiceForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const numInvoices = parseInt(numInvoicesInput.value);
        let totalWithoutVAT = 0;
        let totalVAT = 0;
        let totalTips = 0;
        let finalTotalAmount = 0;

        for (let i = 1; i <= numInvoices; i++) {
            let amountWithoutVAT = parseFloat(document.getElementById(`amountWithoutVAT${i}`).value) || 0;
            let tips = parseFloat(document.getElementById(`tips${i}`).value) || 0;
            let deduction = parseFloat(document.getElementById(`deduction${i}`).value) || 0;

            let netTips = tips - deduction; // Deduct deductions from tips
            if (netTips < 0) netTips = 0; // Ensure net tips don't go negative

            let vatAmount = amountWithoutVAT * VAT_RATE;

            totalWithoutVAT += amountWithoutVAT;
            totalVAT += vatAmount;
            totalTips += netTips; // Use adjusted tips
            finalTotalAmount += amountWithoutVAT + vatAmount + netTips;
        }

        // Display results with breakdown
        resultDiv.innerHTML = `
            <h3>Total Breakdown</h3>
            <p><strong>Total Amount Without VAT:</strong> ${totalWithoutVAT.toFixed(2)} €</p>
            <p><strong>Total VAT (25.5%):</strong> ${totalVAT.toFixed(2)} €</p>
            <p><strong>Total Tips (After Deductions):</strong> ${totalTips.toFixed(2)} €</p>
            <h3><strong>Final Total Amount:</strong> ${finalTotalAmount.toFixed(2)} €</h3>
        `;
    });
});
