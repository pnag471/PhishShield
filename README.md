# PhishShield
PhishShield detects phishing sites using regex and Google Safe Browsing API, alerts users, and educates on password security.

 ├── manifest.json        # Configuration file for Chrome extension
 ├── popup/               # Files for popup UI
 │    ├── popup.html      # HTML structure of popup
 │    ├── popup.js        # Logic for popup interactions
 │    ├── styles.css      # Styling for popup UI
 ├── background/          # Files for background logic
 │    ├── background.js   # Core logic for phishing detection
 ├── content/             # Files for content scripts
 │    ├── content.js      # Analyzes webpage content dynamically
 ├── assets/              # Assets like icons and images
 │    ├── icons/          # Icons for different resolutions
 │        ├── icon16.png  # Small icon (16px)
 │        ├── icon48.png  # Medium icon (48px)
 │        ├── icon128.png # Large icon (128px)
