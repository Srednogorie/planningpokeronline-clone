import {auth, clientFirestore} from './firebase_client'
import {addDoc, collection, deleteDoc, doc, getDoc, Timestamp, updateDoc} from "@firebase/firestore"
import {onAuthStateChanged} from "@firebase/auth"
import {Game} from "../types"


const getDocument = (collectionName: string, id: string) => {
    return new Promise<Game | undefined>((resolve, reject) => {
        const docRef = doc(clientFirestore, collectionName, id)
        getDoc(docRef)
            .then(docSnapshot => {
                if (docSnapshot.exists()) {
                    resolve({...docSnapshot.data(), id: docSnapshot.id} as Game)
                } else {
                    // doc.data() will be undefined in this case
                    resolve( undefined)
                }
            })
            .catch(e => reject(e))
    })
}

const updateDocument = (id: string, data: any, collection: string) => {
    return new Promise((resolve, reject) => {
        const docRef = doc(clientFirestore, collection, id)
        updateDoc(docRef, data)
            .then(() => resolve(200))
            .catch(e => reject(e))
    })
}

const deleteDocument = (collection: string, id: string ) => {
    return new Promise((resolve, reject) => {
        deleteDoc(doc(clientFirestore, collection, id))
            .then(() => resolve(200))
            .catch(e => reject(e))
    })
}

const authState = () => {
    return new Promise((resolve, reject) =>
        onAuthStateChanged(auth, (user) => {
                if (user) {
                    // User is signed in.
                    resolve(user)
                } else {
                    // No user is signed in.
                    reject('no user logged in')
                }
            },
            // Prevent console error
            error => reject(error),
        )
    )
}

const createDocument = (data: any, collectionName: string) => {
    data = {...data, "created": Timestamp.now()}
    return new Promise((resolve, reject) => {
        addDoc(collection(clientFirestore, collectionName), data)
            .then(docRef => resolve(docRef))
            .catch(e => reject(e))
    })
}

const isLoggedIn = async () => {
    try {
        await authState()
        return true
    } catch (e) {
        return false
    }
}

const getNameCookieString = (playerName: string, gameId: string) => {
    const path = '/'
    return `${gameId}__Na=${playerName}; path=${path}; max-age=1800;`
}

export {
    getDocument, updateDocument, deleteDocument, isLoggedIn, createDocument, getNameCookieString,
}
