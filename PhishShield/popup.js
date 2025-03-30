document.addEventListener("DOMContentLoaded", async function () {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url) {
        document.getElementById("status").innerText = "Unable to fetch URL.";
        return;
    }

    document.getElementById("url").innerText = `URL: ${tab.url}`;

    chrome.runtime.sendMessage({ action: "checkPhishing", url: tab.url }, function (response) {
        if (chrome.runtime.lastError) {
            document.getElementById("status").innerText = "Error checking site.";
            return;
        }
        document.getElementById("status").innerText = response.message;
        document.body.style.backgroundColor = response.safe ? "lightgreen" : "red";
    });

    document.getElementById("report").addEventListener("click", function () {
        alert("Reported. Thank you!");
        // Optionally send this report to your backend or log it locally.
    });
});
