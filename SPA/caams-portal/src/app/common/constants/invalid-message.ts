export class RegistrationInvalidMessage {
    public static CUSTOMER_ID_INVALID_MESSAGE = 'Customer ID is 8 digits long';
    public static CUSTOMER_NAME_INVALID_MESSAGE = 'Customer Name should not empty';
    public static ACCOUNT_NUMBER_INVALID_MESSAGE_1 = 'Account Number starts with 01 or 02';
    public static ACCOUNT_NUMBER_INVALID_MESSAGE_2 = 'Account Number is 14 digits OR 15 digits long';
    public static DATE_OF_BIRTH_INVALID_MESSAGE = 'Invalid format (e.g. dd/mm/yyyy)';
    public static MOBILE_NUMBER_INVALID_MESSAGE_1 = 'Starts with 013|014|015|016|017|018|019';
    public static MOBILE_NUMBER_INVALID_MESSAGE_2 = 'Mobile Number is 11 digits long';
    public static NID_INVALID_MESSAGE = 'NID card number must be of 10 or 13 or 17 digit';
}

export class ConfirmPasswordMessage {
    public static CONFIRM_PASSWORD_INVALID_MESSAGE = 'Password does not match';
}

export class ConfirmPasswordMessage2 {
    public static CONFIRM_PASSWORD_INVALID_MESSAGE2 = 'Password is matched';
}

export class PasswordInvalidMessage {

    public static PASS_INVALID_MESSAGE = 'Password must be minimum at least 8 charcaters long';

}
