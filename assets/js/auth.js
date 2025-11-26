// بيانات الدخول الثابتة
const VALID_USER = "عمر";
const VALID_PASS = "1234";

document.getElementById('loginBtn').onclick = handleLogin;

function handleLogin() {
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    const errorBox = document.getElementById('loginError');

    if (!user || !pass) {
        errorBox.textContent = "الرجاء إدخال اسم المستخدم وكلمة المرور";
        return;
    }

    if (user === VALID_USER && pass === VALID_PASS) {
        localStorage.setItem('loggedIn', 'true');
        errorBox.textContent = "";
        window.location.href = "dashboard.html";
    } else {
        errorBox.textContent = "بيانات الدخول غير صحيحة";
    }
}

// تستخدم في باقي الصفحات لحماية الدخول
function requireAuth() {
    const logged = localStorage.getItem('loggedIn');
    if (logged !== 'true') {
        window.location.href = "index.html";
    }
}
