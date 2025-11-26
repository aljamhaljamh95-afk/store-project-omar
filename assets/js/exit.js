let exitItems = [];
let exitItemList = [];

function initExit() {
    requireAuth();

    exitItemList = JSON.parse(localStorage.getItem('items') || '[]');
    exitItems = [];

    const select = document.getElementById('itemSelect');
    select.innerHTML = "";

    exitItemList.forEach(item => {
        const op = document.createElement('option');
        op.value = item.id;
        op.textContent = item.name;
        select.appendChild(op);
    });
}

function addItemToExit() {
    const id = document.getElementById('itemSelect').value;
    const qty = Number(document.getElementById('qty').value);
    const price = Number(document.getElementById('price').value);

    if (!id || !qty || !price) return alert("أكمل كل البيانات");

    exitItems.push({ itemId: id, qty, price });
    renderExitTable();
}

function renderExitTable() {
    const table = document.getElementById('itemsTable');
    table.innerHTML = "";

    exitItems.forEach((row, index) => {
        const item = exitItemList.find(i => i.id == row.itemId);
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${row.qty}</td>
                <td>${row.price}</td>
                <td><button class="btn-danger" onclick="delExitItem(${index})">حذف</button></td>
            </tr>
        `;
    });
}

function delExitItem(index) {
    exitItems.splice(index, 1);
    renderExitTable();
}

function saveExitInvoice() {
    const id = document.getElementById('invoiceId').value.trim();
    const date = document.getElementById('invoiceDate').value;
    const customer = document.getElementById('customer').value.trim();

    if (!id || !date || !customer) return alert("أكمل بيانات الفاتورة");
    if (exitItems.length === 0) return alert("أضف صنف واحد على الأقل");

    let exits = JSON.parse(localStorage.getItem('exits') || '[]');
    exits.push({
        invoiceId: id,
        date,
        customer,
        items: exitItems
    });
    localStorage.setItem('exits', JSON.stringify(exits));

    let stock = JSON.parse(localStorage.getItem('stock') || '{}');
    exitItems.forEach(i => {
        stock[i.itemId] = (stock[i.itemId] || 0) - i.qty;
        if (stock[i.itemId] < 0) stock[i.itemId] = 0;
    });
    localStorage.setItem('stock', JSON.stringify(stock));

    alert("تم حفظ الفاتورة");
    location.reload();
}

function printDiv(divId) {
    const content = document.getElementById(divId).innerHTML;
    const win = window.open('', '', 'width=800,height=600');

    win.document.write(`
        <html>
        <head>
            <title>فاتورة خروج</title>
            <link rel="stylesheet" href="assets/css/style.css">
        </head>
        <body>${content}</body>
        </html>
    `);

    win.document.close();
    win.print();
}
