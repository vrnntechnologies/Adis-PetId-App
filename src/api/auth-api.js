import {auth, database} from '../core/firebaseConfig'; // ✅ Correct relative path
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  sendEmailVerification
} from 'firebase/auth';
import { ref, set } from 'firebase/database';

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


// ✅ Sign Up User with Email Verification
export const signUpUser = async ({ name, email, password }) => {
  try {
    // ✅ Step 1: Create User
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Step 2: Send Email Verification
    await sendEmailVerification(user);

    // ✅ Step 3: Update User Profile
    await updateProfile(user, { displayName: name });

    return { user, message: 'Verification email sent. Please verify your email before logging in.' };
  } catch (error) {
    return { error: error.message };
  }
};

// ✅ Login User (Only if email is verified)
export const loginUser = async ({ email, password }) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user.emailVerified) {
      await signOut(auth); // Logout unverified users
      return { error: 'Please verify your email before logging in.' };
    }

    return { user };
  } catch (error) {
    return { error: error.message };
  }
};

// ✅ Store User Data After Email Verification
export const storeUserData = async (user) => {
  try {
    if (user.emailVerified) {
      await set(ref(database, `users/${user.uid}`), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
      });
      return { message: 'User data stored successfully.' };
    }
    return { error: 'Email not verified. Cannot store user data.' };
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
