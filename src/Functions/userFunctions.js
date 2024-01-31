// firebaseFunctions.js
import { auth, storage, db } from "../firebase"; // Import Firestore along with Firebase authentication
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc} from 'firebase/firestore';
import { collection, addDoc, getDoc, getDocs } from 'firebase/firestore';
import { signOut } from "firebase/auth";


export const checkCurrentUserStatus = async () => {
    return new Promise((resolve) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                // User is signed in
                unsubscribe(); // Stop listening
                resolve(user.uid); // Resolve with the user's UID
            }
        });
    });
}


// Grab users image from Storage 
export const  downloadProfilePicture = async (pictureType) =>{
    // Wait until currentUser is valid   
    const uid = await checkCurrentUserStatus();
    const image = 'users/'+uid+'/pictures/'+'profilepicture.jpg';
    const reference = ref(storage, image);

    // Create URL from reference
    await getDownloadURL(reference).then((url) => {
        pictureType = url;
    });

    // Return URL
    return pictureType;
}

export const uploadProfilePicture = async (user, file) => {

    const imageRef = ref( storage, 'users/'+ user.uid +'/pictures/'+ 'profilepicture.jpg');
    return await uploadBytes( imageRef, file );
};

export const updateProfileInfo = async (user, profileData) => {
  try {
   // Grab a reference to the "users collection", with new field called "unknown"
   const docReference = doc(db, 'users', user.uid)
          
   // Set new data into database
   return await setDoc(docReference, profileData);
  } catch (error) {
    throw error;
  }
};

export const  grab_user_info = async (grab_items) => {    
    // Wait until currentUser is valid and grab user ID
    const uid = await checkCurrentUserStatus();

    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);

    // Grab that item from the userID object
    for( let i = 0; i < grab_items.length; i++ ) {
        // Check for user_item in array
        grab_items[i] = docSnap.data()[grab_items[i]];
    }
    return grab_items;
}


export const SignOutUser = () => {
    return signOut(auth);
  };
