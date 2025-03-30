
async function checkWithSafeBrowsingAPI(url) {
        const apiKey = "<AIzaSyAQ8H9-xCjmxPsG5sTbGuwO_4-_5nKVtIY>"; // Replace with your actual API key
        const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;
        
        const body = {
            client: { clientId: "phishshield", clientVersion: "1.0" },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url }]
            }
        };
    
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
    
            if (!response.ok) {
                console.error(`Safe Browsing API error: ${response.statusText}`);
                return false;
            }
    
            const data = await response.json();
            return data.matches && data.matches.length > 0;
        } catch (error) {
            console.error("API check failed:", error);
            return false;
        }
    }
    