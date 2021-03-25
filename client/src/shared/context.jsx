import {createContext} from "react";
const context = createContext({
    isAuthorized:false,
    authorize:null,
    unAuthorize:null,
    checkAuthorizationStatus:null,
    data:null,
    isReady:false,
    anyError:false,
    showInactivity:false,
    closeInactivityModal:null
});
export default context;