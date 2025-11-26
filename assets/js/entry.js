let entryItems = [];
let itemsList = [];

function initEntry() {
    requireAuth();

    itemsList = JSON.parse(localStorage.getItem('items') || '[]');
    entryItems = [];

    const select = document.getElementById('itemSelect');
    select.innerHTML = "";

    itemsList.forEach(item => {
        const op = document.createElement('option');
        op.value = item.id;
        op.textContent = item.name;
        select.appendChild(op);
    });
}

function addItemToEntry() {
    const id = document.getElementById('itemSelect').value;
    const qty = Number(document.getElementById('qty').value);
    const price = Number(document.getElementById('price').value);

    if (!id || !qty || !price) return alert("اكمل كل البيانات");

    entryItems.push({ itemId: id, qty, price });
    renderEntryTable();
}

function renderEntryTable() {
    const table = document.getElementById('itemsTable');
    table.innerHTML = "";

    entryItems.forEach((row, index) => {
        const item = itemsList.find(i => i.id == row.itemId);
        table.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${row.qty}</td>
                <td>${row.price}</td>
                <td><button class="btn-danger" onclick="delEntryItem(${index})">حذف</button></td>
            </tr>
        `;
    });
}

function delEntryItem(index) {
    entryItems.splice(index, 1);
    renderEntryTable();
}

function saveEntryInvoice() {
    const id = document.getElementById('invoiceId').value.trim();
    const date = document.getElementById('invoiceDate').value;
    const supplier = document.getElementById('supplier').value.trim();

    if (!id || !date || !supplier) return alert("أكمل بيانات الفاتورة");
    if (entryItems.length === 0) return alert("أضف صنف واحد على الأقل");

    let entries = JSON.parse(localStorage.getItem('entries') || '[]');
    entries.push({
        invoiceId: id,
        date,
        supplier,
        items: entryItems
    });
    localStorage.setItem('entries', JSON.stringify(entries));

    let stock = JSON.parse(localStorage.getItem('stock') || '{}');
    entryItems.forEach(i => {
        stock[i.itemId] = (stock[i.itemId] || 0) + i.qty;
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
            <title>فاتورة دخول</title>
            <link rel="stylesheet" href="assets/css/style.css">
        </head>
        <body>${content}</body>
        </html>
    `);

    win.document.close();
    win.print();
}
