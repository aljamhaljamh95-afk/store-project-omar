function initInventory() {
    requireAuth();

    const items = JSON.parse(localStorage.getItem('items') || '[]');
    const stock = JSON.parse(localStorage.getItem('stock') || '{}');

    const table = document.getElementById('inventoryTable');
    table.innerHTML = "";

    if (items.length === 0) {
        table.innerHTML = `<tr><td colspan="3">لا يوجد أصناف</td></tr>`;
        return;
    }

    items.forEach(item => {
        const qty = stock[item.id] || 0;

        table.innerHTML += `
            <tr style="background:${qty <= 5 ? '#ffe5e5' : 'white'}">
                <td>${item.name}</td>
                <td>${item.unit}</td>
                <td style="color:${qty <= 5 ? 'red' : '#333'}; font-weight:bold;">
                    ${qty}
                </td>
            </tr>
        `;
    });
}
