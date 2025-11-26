function initItems() {
    requireAuth();

    window.items = JSON.parse(localStorage.getItem('items') || '[]');
    renderItems();
}

function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

function renderItems() {
    const table = document.getElementById('itemsTable');
    table.innerHTML = "";

    items.forEach((item, index) => {
        table.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.unit}</td>
                <td><button class="btn-danger" onclick="deleteItem(${index})">حذف</button></td>
            </tr>
        `;
    });
}

function addItem() {
    const name = document.getElementById('itemName').value.trim();
    const unit = document.getElementById('itemUnit').value.trim();

    if (!name) return alert("الرجاء إدخال اسم الصنف");

    const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
        name,
        unit
    };

    items.push(newItem);
    saveItems();
    renderItems();

    document.getElementById('itemName').value = "";
    document.getElementById('itemUnit').value = "";
}

function deleteItem(index) {
    if (!confirm("متأكد من الحذف؟")) return;
    items.splice(index, 1);
    saveItems();
    renderItems();
}
