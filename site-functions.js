// ===============================
// LOGISTICS WEBSITE FUNCTIONS
// ===============================

// Save logged-in user
function saveLogin(user, role) {
    localStorage.setItem("loggedInUser", user);
    localStorage.setItem("userRole", role);
}

// Get logged-in user
function getLoggedInUser() {
    return localStorage.getItem("loggedInUser");
}

// Get user role
function getUserRole() {
    return localStorage.getItem("userRole");
}

// Logout
function logout() {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("userRole");
    window.location.href = "login.html";
}

// Save shipment
function saveShipment(shipment) {
    const shipments =
        JSON.parse(localStorage.getItem("shipments")) || [];

    shipments.push(shipment);

    localStorage.setItem(
        "shipments",
        JSON.stringify(shipments)
    );
}

// Get shipments
function getShipments() {
    return JSON.parse(
        localStorage.getItem("shipments")
    ) || [];
}

// Save payment
function savePayment(payment) {
    const payments =
        JSON.parse(localStorage.getItem("payments")) || [];

    payments.push(payment);

    localStorage.setItem(
        "payments",
        JSON.stringify(payments)
    );
}

// Get payments
function getPayments() {
    return JSON.parse(
        localStorage.getItem("payments")
    ) || [];
}

// Save notification
function saveNotification(notification) {
    const notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];

    notifications.push(notification);

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );
}

// Get notifications
function getNotifications() {
    return JSON.parse(
        localStorage.getItem("notifications")
    ) || [];
}

console.log("Site functions loaded successfully.");
