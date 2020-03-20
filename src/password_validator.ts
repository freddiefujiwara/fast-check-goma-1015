export default function validate(password:string) :boolean {
    return password.length >= 8 && 
        password.length <= 20 && 
        /^[0-9a-zA-Z!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]{8,20}$/.test(password) &&
        !/^[0-9]{8,20}$/.test(password) && 
        !/^[a-zA-Z]{8,20}$/.test(password) && 
        !/^[!"#$%&'()*+,.\-\/:;<=>?@\[\\\]^_`{|}~]{8,20}$/.test(password);
};
