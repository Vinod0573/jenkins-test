export const languageMapping = (languageKey) =>{
    const languageKeyValue ={
        "hi-IN": "Hindi",
        "te-IN": "Telugu",
        "ml-IN": "Malayalam",
        "kn-IN": "Kannada",
        "ta-IN": "Tamil",
        "en-IN": "English"
        }  
    const languageValue = languageKeyValue[languageKey];
       return languageValue;
  }