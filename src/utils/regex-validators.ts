const PhoneNumberRegex = new RegExp('^[0][0-9]+$')
const orgRegEx = new RegExp('^[0-9]+$')
const textFieldRegEx = new RegExp('^[A-Za-z]+$')

function ValidatePhoneNumber(phoneNumber:string):boolean{
    return PhoneNumberRegex.test(phoneNumber)
}
function ValidateOrgCode(orgCode:string):boolean{
    return orgRegEx.test(orgCode)
}
function ValidateTextFields(textFieldValue:string){
    return /^[a-zA-Z\s]*$/.test(textFieldValue)
}
export {ValidateOrgCode,ValidatePhoneNumber,ValidateTextFields}