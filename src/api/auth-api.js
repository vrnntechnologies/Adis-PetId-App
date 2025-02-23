import { auth } from '../core/firebaseConfig'; // ✅ Correct relative path
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';

// ✅ Logout User and Redirect to Login
export const logoutUser = async (navigation) => {
  try {
    await signOut(auth);

    // ✅ Navigate to StartScreen (Login Page)
    navigation.reset({
      index: 0,
      routes: [{ name: 'StartScreen' }],
    });
  } catch (error) {
    console.error('Logout Error:', error.message);
  }
};


// ✅ Sign Up User
export const signUpUser = async ({ name, email, password }) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
};

// ✅ Login User
export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user };
  } catch (error) {
    return { error: error.message };
  }
};

// ✅ Reset Password
export const sendEmailWithPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return {};
  } catch (error) {
    return { error: error.message };
  }
};
