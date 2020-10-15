 
export function validateAlphaLowerCase(value){
    const passwordReg = /^(?=.*?[a-z]).{8,}$/; // Lower Case Letters
    return passwordReg.test(value)
}

export function validateNumeric(value){
    const passwordReg = /^(?=.*?[0-9]).{8,}$/; //Numbers
    return passwordReg.test(value)
}

export function validateSpecialCharacters(value){
    const passwordReg = /^(?=.*?[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]).{8,}$/; // Special characters
    return passwordReg.test(value)
}

 