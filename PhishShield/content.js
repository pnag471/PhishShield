function isSecuritySensitivePage() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const pageText = document.body.innerText.toLowerCase();
    
    return passwordInputs.length > 0 || 
           /(verify.*account|change.*password|security.*question|reset.*credentials)/.test(pageText);
}

function showSecurityGuidelines() {
    const guidelinesPanel = document.createElement('div');
    guidelinesPanel.id = 'phishshield-security-tips';
    
    guidelinesPanel.innerHTML = `
        <div style="position: fixed; top: 20px; right: 20px; z-index: 99999;
                    background: #fff3cd; border-left: 5px solid #ffc107;
                    padding: 15px; max-width: 300px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;">
            <h3 style="margin-bottom:10px;">🔒 Security Reminder</h3>
            <p>You're on a sensitive page. Remember:</p>
            <ul style="padding-left:20px;">
                <li>Never reuse passwords</li>
                <li>Enable two-factor authentication (2FA)</li>
                <li>Check for HTTPS (<span style="font-weight:bold;">${location.protocol.startsWith('https') ? '✅ Secure' : '❌ Not Secure'}</span>)</li>
                <li>Verify domain authenticity</li>
            </ul>
            <button id="dismiss-guidelines" style="background:#ffc107;border:none;padding:5px;margin-top:10px;">Dismiss</button>
        </div>`;
    
    document.body.prepend(guidelinesPanel);
    
    document.getElementById('dismiss-guidelines').addEventListener('click', () => guidelinesPanel.remove());
}

// Run security check when the page loads
if (isSecuritySensitivePage()) {
    showSecurityGuidelines();
}

// ---- Phishing Detection in Emails ----

function getEmails() {
    let emails = [];
    document.querySelectorAll(".a3s.aiL").forEach(email => {
        emails.push(email.innerText);
    });

    if (emails.length > 0) {
        chrome.runtime.sendMessage({ action: "scanEmails", emails: emails }, (response) => {
            if (response && response.flaggedEmails.length > 0) {
                showPhishingWarning(response.flaggedEmails.length);
            }
        });
    }
}

function showPhishingWarning(count) {
    const warningPanel = document.createElement('div');
    warningPanel.id = 'phishshield-warning';
    
    warningPanel.innerHTML = `
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 99999;
                    background: #f8d7da; border-left: 5px solid #dc3545;
                    padding: 15px; max-width: 300px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    font-family: Arial, sans-serif;">
            <h3 style="margin-bottom:10px; color:#dc3545;">⚠️ Phishing Alert</h3>
            <p>Detected ${count} suspicious email(s) in your inbox.</p>
            <p><strong>Do not click on unknown links!</strong></p>
            <button id="dismiss-warning" style="background:#dc3545;color:white;border:none;padding:5px;margin-top:10px;">Dismiss</button>
        </div>`;
    
    document.body.prepend(warningPanel);
    
    document.getElementById('dismiss-warning').addEventListener('click', () => warningPanel.remove());
}

// Run email scan when Gmail loads
if (window.location.href.includes("mail.google.com")) {
    setTimeout(getEmails, 3000);
}
