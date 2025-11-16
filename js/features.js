// ============================================
// FEATURES MODULE - Additional Dashboard Features
// Addresses, Payment Methods, Support Tickets, Product Comparison
// ============================================

// ============================================
// ADDRESS MANAGEMENT
// ============================================

function initAddressManagement() {
    loadAddresses();
    setupAddressHandlers();
}

function loadAddresses() {
    const addresses = DataManager.getAddresses();
    const addressesGrid = document.querySelector('.addresses-grid');
    
    if (!addressesGrid) return;
    
    // Clear existing content except add new card
    addressesGrid.innerHTML = '';
    
    // Render each address
    addresses.forEach(address => {
        const addressCard = createAddressCard(address);
        addressesGrid.insertAdjacentHTML('beforeend', addressCard);
    });
    
    // Add new address card
    addressesGrid.insertAdjacentHTML('beforeend', `
        <div class="address-card add-address-card" onclick="openAddAddressModal()">
            <div class="add-address-content">
                <i class="fas fa-plus-circle"></i>
                <h3>Add New Address</h3>
                <p>Click to add a new delivery address</p>
            </div>
        </div>
    `);
}

function createAddressCard(address) {
    const icon = address.label.toLowerCase() === 'home' ? 'home' : 
                 address.label.toLowerCase() === 'business' ? 'briefcase' : 'map-marker-alt';
    
    return `
        <div class="address-card ${address.isDefault ? 'default-address' : ''}">
            ${address.isDefault ? '<div class="address-badge">Default</div>' : ''}
            <div class="address-header">
                <h3><i class="fas fa-${icon}"></i> ${address.label}</h3>
            </div>
            <div class="address-body">
                <p class="address-name">${address.recipientName}</p>
                <p class="address-line">${address.street}</p>
                <p class="address-line">${address.city}</p>
                <p class="address-phone"><i class="fas fa-phone"></i> ${address.phone}</p>
            </div>
            <div class="address-footer">
                ${!address.isDefault ? `
                    <button class="btn-text" onclick="setDefaultAddress(${address.id})">
                        <i class="fas fa-check"></i> Set as Default
                    </button>
                ` : ''}
                <button class="btn-text" onclick="editAddress(${address.id})">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-text text-danger" onclick="deleteAddress(${address.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `;
}

function setupAddressHandlers() {
    const addAddressBtn = document.querySelector('.section-header .btn-primary');
    if (addAddressBtn && addAddressBtn.textContent.includes('Add New Address')) {
        addAddressBtn.addEventListener('click', openAddAddressModal);
    }
}

function openAddAddressModal() {
    const modal = createAddressModal();
    document.body.insertAdjacentHTML('beforeend', modal);
    document.body.style.overflow = 'hidden';
}

function createAddressModal(existingAddress = null) {
    const isEdit = existingAddress !== null;
    
    return `
        <div class="modal-overlay active" id="addressModal">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2><i class="fas fa-${isEdit ? 'edit' : 'plus'}"></i> ${isEdit ? 'Edit' : 'Add New'} Address</h2>
                    <button class="modal-close" onclick="closeAddressModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="addressForm" onsubmit="saveAddress(event, ${isEdit ? existingAddress.id : 'null'})">
                        <div class="form-group">
                            <label>Address Label *</label>
                            <select id="addressLabel" required>
                                <option value="">Select label</option>
                                <option value="Home" ${existingAddress?.label === 'Home' ? 'selected' : ''}>Home</option>
                                <option value="Business" ${existingAddress?.label === 'Business' ? 'selected' : ''}>Business</option>
                                <option value="Other" ${existingAddress?.label === 'Other' ? 'selected' : ''}>Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Recipient Name *</label>
                            <input type="text" id="recipientName" value="${existingAddress?.recipientName || ''}" placeholder="Enter recipient name" required>
                        </div>
                        <div class="form-group">
                            <label>Street Address *</label>
                            <input type="text" id="addressStreet" value="${existingAddress?.street || ''}" placeholder="House/Unit #, Street Name, Barangay" required>
                        </div>
                        <div class="form-group">
                            <label>City & Postal Code *</label>
                            <input type="text" id="addressCity" value="${existingAddress?.city || ''}" placeholder="City, Province, Postal Code" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number *</label>
                            <input type="tel" id="addressPhone" value="${existingAddress?.phone || ''}" placeholder="+63 912 345 6789" required>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" id="setDefaultAddress" ${existingAddress?.isDefault ? 'checked' : ''}>
                            <label for="setDefaultAddress" style="margin: 0;">Set as default address</label>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="closeAddressModal()">Cancel</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i> ${isEdit ? 'Update' : 'Save'} Address
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

window.saveAddress = function(event, addressId = null) {
    event.preventDefault();
    
    const addressData = {
        label: document.getElementById('addressLabel').value,
        recipientName: document.getElementById('recipientName').value,
        street: document.getElementById('addressStreet').value,
        city: document.getElementById('addressCity').value,
        phone: document.getElementById('addressPhone').value,
        isDefault: document.getElementById('setDefaultAddress').checked
    };
    
    let success;
    if (addressId) {
        success = DataManager.updateAddress(addressId, addressData);
    } else {
        success = DataManager.addAddress(addressData);
    }
    
    if (success) {
        if (addressData.isDefault) {
            DataManager.setDefaultAddress(addressData.id || Date.now());
        }
        showNotification(`Address ${addressId ? 'updated' : 'added'} successfully!`, 'success');
        closeAddressModal();
        loadAddresses();
    } else {
        showNotification('Failed to save address. Please try again.', 'error');
    }
};

window.editAddress = function(addressId) {
    const addresses = DataManager.getAddresses();
    const address = addresses.find(a => a.id === addressId);
    
    if (address) {
        const modal = createAddressModal(address);
        document.body.insertAdjacentHTML('beforeend', modal);
        document.body.style.overflow = 'hidden';
    }
};

window.deleteAddress = function(addressId) {
    if (confirm('Are you sure you want to delete this address?')) {
        if (DataManager.deleteAddress(addressId)) {
            showNotification('Address deleted successfully!', 'success');
            loadAddresses();
        } else {
            showNotification('Failed to delete address.', 'error');
        }
    }
};

window.setDefaultAddress = function(addressId) {
    if (DataManager.setDefaultAddress(addressId)) {
        showNotification('Default address updated!', 'success');
        loadAddresses();
    }
};

window.closeAddressModal = function() {
    const modal = document.getElementById('addressModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};

// ============================================
// PAYMENT METHODS MANAGEMENT
// ============================================

function initPaymentMethods() {
    loadPaymentMethods();
    setupPaymentHandlers();
}

function loadPaymentMethods() {
    const methods = DataManager.getPaymentMethods();
    const paymentGrid = document.querySelector('.payment-grid');
    
    if (!paymentGrid) return;
    
    paymentGrid.innerHTML = '';
    
    methods.forEach(method => {
        const paymentCard = createPaymentCard(method);
        paymentGrid.insertAdjacentHTML('beforeend', paymentCard);
    });
    
    // Add new payment card
    paymentGrid.insertAdjacentHTML('beforeend', `
        <div class="payment-card add-payment-card" onclick="openAddPaymentModal()">
            <div class="add-payment-content">
                <i class="fas fa-plus-circle"></i>
                <h3>Add Payment Method</h3>
                <p>Add a credit card or e-wallet</p>
            </div>
        </div>
    `);
}

function createPaymentCard(method) {
    const icon = method.type === 'credit_card' ? 'fa-cc-visa' :
                 method.type === 'debit_card' ? 'fa-cc-mastercard' :
                 method.type === 'gcash' ? 'fa-wallet' : 'fa-credit-card';
    
    return `
        <div class="payment-card ${method.isDefault ? 'default-payment' : ''}">
            ${method.isDefault ? '<div class="payment-badge">Default</div>' : ''}
            <div class="payment-header">
                <i class="fas ${icon} payment-brand"></i>
            </div>
            <div class="payment-body">
                <h3>${method.label}</h3>
                ${method.expiryDate ? `<p>Expires ${method.expiryDate}</p>` : ''}
                <p class="cardholder-name">${method.cardHolderName || 'Verified Account'}</p>
            </div>
            <div class="payment-footer">
                ${!method.isDefault ? `
                    <button class="btn-text" onclick="setDefaultPayment(${method.id})">
                        <i class="fas fa-check"></i> Set as Default
                    </button>
                ` : ''}
                <button class="btn-text text-danger" onclick="deletePayment(${method.id})">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </div>
        </div>
    `;
}

function setupPaymentHandlers() {
    const addPaymentBtn = document.querySelector('.section-header .btn-primary');
    if (addPaymentBtn && addPaymentBtn.textContent.includes('Add Payment Method')) {
        addPaymentBtn.addEventListener('click', openAddPaymentModal);
    }
}

window.openAddPaymentModal = function() {
    const modal = `
        <div class="modal-overlay active" id="paymentModal">
            <div class="modal-content" style="max-width: 600px;">
                <div class="modal-header">
                    <h2><i class="fas fa-credit-card"></i> Add Payment Method</h2>
                    <button class="modal-close" onclick="closePaymentModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="paymentForm" onsubmit="savePayment(event)">
                        <div class="form-group">
                            <label>Payment Type *</label>
                            <select id="paymentType" required onchange="togglePaymentFields()">
                                <option value="">Select type</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="debit_card">Debit Card</option>
                                <option value="gcash">GCash</option>
                                <option value="bank_transfer">Bank Transfer</option>
                            </select>
                        </div>
                        <div id="cardFields" style="display: none;">
                            <div class="form-group">
                                <label>Card Number *</label>
                                <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19">
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Expiry Date *</label>
                                    <input type="text" id="expiryDate" placeholder="MM/YYYY" maxlength="7">
                                </div>
                                <div class="form-group">
                                    <label>CVV *</label>
                                    <input type="text" id="cvv" placeholder="123" maxlength="4">
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Cardholder Name *</label>
                                <input type="text" id="cardholderName" placeholder="Name on card">
                            </div>
                        </div>
                        <div id="gcashFields" style="display: none;">
                            <div class="form-group">
                                <label>GCash Mobile Number *</label>
                                <input type="tel" id="gcashNumber" placeholder="+63 912 345 6789">
                            </div>
                            <div class="form-group">
                                <label>Account Name *</label>
                                <input type="text" id="gcashName" placeholder="Registered name">
                            </div>
                        </div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" id="setDefaultPayment">
                            <label for="setDefaultPayment" style="margin: 0;">Set as default payment method</label>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="closePaymentModal()">Cancel</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-save"></i> Save Payment Method
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    document.body.style.overflow = 'hidden';
};

window.togglePaymentFields = function() {
    const type = document.getElementById('paymentType').value;
    const cardFields = document.getElementById('cardFields');
    const gcashFields = document.getElementById('gcashFields');
    
    if (type === 'credit_card' || type === 'debit_card') {
        cardFields.style.display = 'block';
        gcashFields.style.display = 'none';
    } else if (type === 'gcash') {
        cardFields.style.display = 'none';
        gcashFields.style.display = 'block';
    } else {
        cardFields.style.display = 'none';
        gcashFields.style.display = 'none';
    }
};

window.savePayment = function(event) {
    event.preventDefault();
    
    const type = document.getElementById('paymentType').value;
    let paymentData = {
        type: type,
        isDefault: document.getElementById('setDefaultPayment').checked
    };
    
    if (type === 'credit_card' || type === 'debit_card') {
        const cardNumber = document.getElementById('cardNumber').value;
        const last4 = cardNumber.slice(-4);
        paymentData = {
            ...paymentData,
            label: `${type === 'credit_card' ? 'Credit' : 'Debit'} Card ending in ${last4}`,
            cardNumber: `•••• •••• •••• ${last4}`,
            cardHolderName: document.getElementById('cardholderName').value,
            expiryDate: document.getElementById('expiryDate').value
        };
    } else if (type === 'gcash') {
        paymentData = {
            ...paymentData,
            label: 'GCash',
            cardNumber: document.getElementById('gcashNumber').value,
            cardHolderName: document.getElementById('gcashName').value
        };
    }
    
    if (DataManager.addPaymentMethod(paymentData)) {
        showNotification('Payment method added successfully!', 'success');
        closePaymentModal();
        loadPaymentMethods();
    } else {
        showNotification('Failed to add payment method.', 'error');
    }
};

window.deletePayment = function(methodId) {
    if (confirm('Are you sure you want to remove this payment method?')) {
        if (DataManager.deletePaymentMethod(methodId)) {
            showNotification('Payment method removed!', 'success');
            loadPaymentMethods();
        }
    }
};

window.setDefaultPayment = function(methodId) {
    if (DataManager.setDefaultPaymentMethod(methodId)) {
        showNotification('Default payment method updated!', 'success');
        loadPaymentMethods();
    }
};

window.closePaymentModal = function() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};

// ============================================
// SUPPORT TICKETS SYSTEM
// ============================================

function initSupportTickets() {
    loadTickets();
    setupTicketHandlers();
}

function loadTickets() {
    const currentUser = DataManager.getCurrentUser();
    if (!currentUser) return;
    
    const tickets = DataManager.getUserTickets(currentUser.email);
    const ticketsList = document.querySelector('.tickets-list');
    
    if (!ticketsList) return;
    
    if (tickets.length === 0) {
        ticketsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-ticket-alt"></i>
                <h3>No Support Tickets</h3>
                <p>You haven't created any support tickets yet.</p>
                <button class="btn-primary" onclick="openCreateTicketModal()">
                    <i class="fas fa-plus"></i> Create Your First Ticket
                </button>
            </div>
        `;
        return;
    }
    
    ticketsList.innerHTML = tickets.map(ticket => createTicketCard(ticket)).join('');
}

function createTicketCard(ticket) {
    const statusClass = {
        'open': 'status-pending',
        'in-progress': 'status-processing',
        'resolved': 'status-delivered',
        'closed': 'status-cancelled'
    }[ticket.status] || 'status-pending';
    
    const messageCount = ticket.messages?.length || 0;
    const createdDate = new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    return `
        <div class="ticket-card">
            <div class="ticket-header">
                <div>
                    <h3>Ticket #${ticket.id}</h3>
                    <span class="ticket-category">
                        <i class="fas fa-tag"></i> ${ticket.category}
                    </span>
                </div>
                <span class="status-badge ${statusClass}">${ticket.status}</span>
            </div>
            <div class="ticket-body">
                <h4>${ticket.subject}</h4>
                <p>${ticket.description.substring(0, 150)}${ticket.description.length > 150 ? '...' : ''}</p>
                <div class="ticket-meta">
                    <span><i class="fas fa-calendar"></i> ${createdDate}</span>
                    <span><i class="fas fa-comment"></i> ${messageCount} ${messageCount === 1 ? 'reply' : 'replies'}</span>
                </div>
            </div>
            <div class="ticket-footer">
                <button class="btn-outline btn-sm" onclick="viewTicket('${ticket.id}')">
                    <i class="fas fa-eye"></i> View Ticket
                </button>
                ${ticket.status === 'open' || ticket.status === 'in-progress' ? `
                    <button class="btn-primary btn-sm" onclick="replyToTicket('${ticket.id}')">
                        <i class="fas fa-reply"></i> Reply
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

function setupTicketHandlers() {
    const createTicketBtn = document.querySelector('.section-header .btn-primary');
    if (createTicketBtn && createTicketBtn.textContent.includes('Create New Ticket')) {
        createTicketBtn.addEventListener('click', openCreateTicketModal);
    }
}

window.openCreateTicketModal = function() {
    const modal = `
        <div class="modal-overlay active" id="ticketModal">
            <div class="modal-content" style="max-width: 700px;">
                <div class="modal-header">
                    <h2><i class="fas fa-ticket-alt"></i> Create Support Ticket</h2>
                    <button class="modal-close" onclick="closeTicketModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <form id="ticketForm" onsubmit="submitTicket(event)">
                        <div class="form-group">
                            <label>Category *</label>
                            <select id="ticketCategory" required>
                                <option value="">Select category</option>
                                <option value="Order Inquiry">Order Inquiry</option>
                                <option value="Delivery Issue">Delivery Issue</option>
                                <option value="Product Question">Product Question</option>
                                <option value="Payment Issue">Payment Issue</option>
                                <option value="Technical Support">Technical Support</option>
                                <option value="Account Help">Account Help</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Subject *</label>
                            <input type="text" id="ticketSubject" placeholder="Brief description of your issue" required>
                        </div>
                        <div class="form-group">
                            <label>Description *</label>
                            <textarea id="ticketDescription" rows="6" placeholder="Please provide detailed information about your issue..." required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Priority</label>
                            <select id="ticketPriority">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <div class="modal-actions">
                            <button type="button" class="btn-outline" onclick="closeTicketModal()">Cancel</button>
                            <button type="submit" class="btn-primary">
                                <i class="fas fa-paper-plane"></i> Submit Ticket
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    document.body.style.overflow = 'hidden';
};

window.submitTicket = function(event) {
    event.preventDefault();
    
    const currentUser = DataManager.getCurrentUser();
    
    const ticketData = {
        userEmail: currentUser.email,
        userName: currentUser.name,
        category: document.getElementById('ticketCategory').value,
        subject: document.getElementById('ticketSubject').value,
        description: document.getElementById('ticketDescription').value,
        priority: document.getElementById('ticketPriority').value
    };
    
    if (DataManager.addTicket(ticketData)) {
        showNotification('Support ticket created successfully! We will respond soon.', 'success');
        closeTicketModal();
        loadTickets();
    } else {
        showNotification('Failed to create ticket. Please try again.', 'error');
    }
};

window.viewTicket = function(ticketId) {
    const tickets = DataManager.getTickets();
    const ticket = tickets.find(t => t.id === ticketId);
    
    if (!ticket) return;
    
    const messages = ticket.messages || [];
    const createdDate = new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    
    const modal = `
        <div class="modal-overlay active" id="viewTicketModal">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <div>
                        <h2>Ticket #${ticket.id}</h2>
                        <p style="margin: 5px 0; color: var(--text-light);">${ticket.category} • Created ${createdDate}</p>
                    </div>
                    <button class="modal-close" onclick="closeViewTicketModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" style="max-height: 600px; overflow-y: auto;">
                    <div style="background: var(--light-bg); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h3 style="margin-bottom: 10px;">${ticket.subject}</h3>
                        <p style="margin-bottom: 10px;">${ticket.description}</p>
                        <div style="display: flex; gap: 10px; margin-top: 15px;">
                            <span class="status-badge status-${ticket.status}">${ticket.status}</span>
                            <span class="status-badge" style="background: var(--warning);">Priority: ${ticket.priority}</span>
                        </div>
                    </div>
                    
                    ${messages.length > 0 ? `
                        <h3 style="margin: 20px 0 10px;">Conversation</h3>
                        <div class="ticket-messages">
                            ${messages.map(msg => `
                                <div class="ticket-message ${msg.sender === 'admin' ? 'admin-message' : 'user-message'}">
                                    <div class="message-header">
                                        <strong>${msg.sender === 'admin' ? 'Support Team' : ticket.userName}</strong>
                                        <span>${new Date(msg.timestamp).toLocaleString()}</span>
                                    </div>
                                    <p>${msg.message}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p style="text-align: center; color: var(--text-light); margin: 20px 0;">No replies yet.</p>'}
                    
                    ${ticket.status === 'open' || ticket.status === 'in-progress' ? `
                        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                            <h3 style="margin-bottom: 10px;">Reply to Ticket</h3>
                            <form id="replyForm" onsubmit="submitReply(event, '${ticket.id}')">
                                <textarea id="replyMessage" rows="4" placeholder="Type your reply..." required style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 8px;"></textarea>
                                <button type="submit" class="btn-primary" style="margin-top: 10px;">
                                    <i class="fas fa-paper-plane"></i> Send Reply
                                </button>
                            </form>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
    document.body.style.overflow = 'hidden';
};

window.submitReply = function(event, ticketId) {
    event.preventDefault();
    
    const currentUser = DataManager.getCurrentUser();
    const message = document.getElementById('replyMessage').value;
    
    const messageData = {
        sender: 'customer',
        senderName: currentUser.name,
        message: message
    };
    
    if (DataManager.addTicketMessage(ticketId, messageData)) {
        showNotification('Reply sent successfully!', 'success');
        document.getElementById('replyMessage').value = '';
        closeViewTicketModal();
        viewTicket(ticketId); // Reopen to show new message
        loadTickets(); // Refresh list
    } else {
        showNotification('Failed to send reply.', 'error');
    }
};

window.replyToTicket = function(ticketId) {
    viewTicket(ticketId);
};

window.closeTicketModal = function() {
    const modal = document.getElementById('ticketModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};

window.closeViewTicketModal = function() {
    const modal = document.getElementById('viewTicketModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
};

// ============================================
// INITIALIZE ALL FEATURES
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit to ensure main scripts are loaded
    setTimeout(() => {
        initAddressManagement();
        initPaymentMethods();
        initSupportTickets();
    }, 500);
});

console.log('%c✅ Features Module Loaded', 'color: #4ECDC4; font-weight: bold; font-size: 14px;');
console.log('%cAddress Management, Payment Methods, Support Tickets initialized', 'color: #666;');
