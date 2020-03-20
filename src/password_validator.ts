export default function validate(password:string) :boolean {
    return !!password &&
        password.length >= 8 && 
        password.length <= 20;
};
