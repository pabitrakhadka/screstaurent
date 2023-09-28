//has password
import bcrypt from 'bcrypt';
const hashpassword = async (password, saltRounds = 10) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export default hashpassword;

//varify_password
// export async function varify_password(password, hash_password) {
//     const password_match = await bcrypt.
//         console.log('passwrdss :', password, hash_password);
//     console.log("passswoprd mathc index :", password_match);

// }
export const comparePassword = async (password, hash_password) => {
    return bcrypt.compare(password, hash_password);
}