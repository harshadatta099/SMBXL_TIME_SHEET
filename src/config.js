import { PublicClientApplication } from '@azure/msal-browser';

const   msalConfig = {
  auth: {
    clientId: "be6da587-914f-474f-99ff-593cd29df547",
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: "https://192.168.1.2/",
  }
};
export const msalInstance = new PublicClientApplication(msalConfig);