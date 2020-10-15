export default {
    url:  getApiUrl(),
      
}; // use dev / production

function getApiUrl(){
    switch(process.env.REACT_APP_BUILD_ENV){
        case "local": return process.env.REACT_APP_API_URL_LOCAL;  
        default: return process.env.REACT_APP_API_URL;
    }
}
