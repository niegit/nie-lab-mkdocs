// MSAL configuration
const msalConfig = {
    auth: {
        clientId: "32aac2ba-c417-49b6-b471-44a3b09741a3",
        authority: "https://login.microsoftonline.com/36b96bfe-8a1c-43ed-8c38-867abefcbc05",
        redirectUri: "https://docs.nielabs.com", 
    },
    cache: {
        cacheLocation: "sessionStorage",  // Store the session in the browser sessionStorage
        storeAuthStateInCookie: false,  // Use cookies for IE11 or Edge support
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        break;
                    case msal.LogLevel.Info:
                        console.info(message);
                        break;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        break;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        break;
                    default:
                        break;
                }
            }
        }
    }
};

const loginRequest = {
    scopes: ["User.Read"],  // Ensure the user has the required scopes
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

// Function to check if the user is authenticated
function checkAuth() {
    const account = msalInstance.getAllAccounts();
    if (account.length === 0) {
        // User is not authenticated, redirect to login
        msalInstance.loginRedirect(loginRequest).catch(error => {
            console.error("Login failed", error);
        });
    } else {
        // User is authenticated, proceed to load the page content
        console.log("User is authenticated", account[0]);
    }
}

// Call the checkAuth function when the page loads
checkAuth();

// Optionally, you can fetch user profile info from Graph API after login
msalInstance.handleRedirectPromise().then((response) => {
    if (response) {
        console.log("Login successful", response);
        // You can further call Graph API to get user data
    }
}).catch(error => {
    console.error("Error during redirect", error);
});
