const msalConfig = {
    auth: {
      clientId: '219b84aa-e37b-474c-ab85-52510687b1d1',
      authority: 'https://login.microsoftonline.com/f6d4f0cd-4cf4-4f19-8815-f321e3e1024a',
      redirectUri: 'http://localhost:3000', // Your app's redirect URI
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false,
    },
  };
  
  export const loginRequest = {
    scopes: ["api://8f3493cc-48b8-43f9-ba2f-2737850ff0a6/.default"]
  };

  export default msalConfig;
  