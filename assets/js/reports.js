let entries = [];
let exits = [];

function initReports() {
    requireAuth();

    entries = JSON.parse(localStorage.getItem('entries') || '[]');
    exits   = JSON.parse(localStorage.getItem('exits') || '[]');
}

function searchByInvoice() {
    const id = document.getElementById('searchInvoiceId').value.trim();
    if (!id) return alert("أدخل رقم الفاتورة");

    const list = [
        ...entries.map(e => ({ type: "دخول", ...e })),
        ...exits.map(e => ({ type: "خروج", ...e }))
    ];

    const result = list.filter(inv => inv.invoiceId == id);
    renderResults(result);
}

function searchByDate() {
    const date = document.getElementById('searchDate').value;
    if (!date) return alert("أدخل التاريخ");

    const list = [
        ...entries.map(e => ({ type: "دخول", ...e })),
        ...exits.map(e => ({ type: "خروج", ...e }))
    ];

    const result = list.filter(inv => inv.date == date);
    renderResults(result);
}

function renderResults(list) {
    const box = document.getElementById('results');
    box.innerHTML = "";

    if (list.length === 0) {
        box.innerHTML = "<p>لا توجد نتائج</p>";
        return;
    }

    list.forEach(inv => {
        const div = document.createElement('div');
        div.className = "invoice-box";
        div.innerHTML = `
            <h3>فاتورة ${inv.type}: ${inv.invoiceId}</h3>
            <p>التاريخ: ${inv.date}</p>
            <p>عدد الأصناف: ${inv.items.length}</p>
        `;
        box.appendChild(div);
    });
}

function printDiv(divId) {
    const content = document.getElementById(divId).innerHTML;
    const win = window.open('', '', 'width=800,height=600');

    win.document.write(`
        <html>
        <head>
            <title>التقرير</title>
            <link rel="stylesheet" href="assets/css/style.css">
        </head>
        <body>${content}</body>
        </html>
    `);

    win.document.close();
    win.print();
}
