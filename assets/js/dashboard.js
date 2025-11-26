function initDashboard() {
    requireAuth();

    const entries = JSON.parse(localStorage.getItem('entries') || '[]');
    const exits   = JSON.parse(localStorage.getItem('exits')   || '[]');
    const items   = JSON.parse(localStorage.getItem('items')   || '[]');
    const stock   = JSON.parse(localStorage.getItem('stock')   || '{}');

    document.getElementById('entryCount').textContent  = entries.length;
    document.getElementById('exitCount').textContent   = exits.length;
    document.getElementById('itemsCount').textContent  = items.length;

    let totalQty = 0;
    for (let id in stock) {
        totalQty += stock[id];
    }


    loadLastInvoices(entries, exits);
}

function loadLastInvoices(entries, exits) {
    const box = document.getElementById('lastInvoices');
    box.innerHTML = "";

    const list = [
        ...entries.map(e => ({...e, type: 'دخول'})),
        ...exits.map(e => ({...e, type: 'خروج'}))
    ];

    list.sort((a,b) => new Date(b.date) - new Date(a.date));

    const last = list.slice(0, 5);
    if (last.length === 0) {
        box.innerHTML = "<p>لا توجد فواتير حتى الآن</p>";
        return;
    }

    last.forEach(inv => {
        const div = document.createElement('div');
        div.className = "invoice-box";
        div.innerHTML = `
            <h3>فاتورة ${inv.type}: ${inv.invoiceId}</h3>
            <p>التاريخ: ${inv.date}</p>
        `;
        box.appendChild(div);
    });
}
