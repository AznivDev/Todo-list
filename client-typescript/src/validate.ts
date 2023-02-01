function validateEmail (email: string) {
    const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);  
    return regex.test(email);
}
export default validateEmail;

