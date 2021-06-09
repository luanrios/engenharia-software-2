import firebase from '../firebase';

/*
    Função de criação de uma instância do usuário
    Importa conexão com o backend de ../firebase
*/

export default async function createUser(uid, email, borrowedBooks) {
  const database = firebase.firestore();

  const userCollection = database.collection('users');
  const libraryCollection = database.collection('libraries');

  try {
    const newLibraryDoc = await libraryCollection.add({
      user: uid,
      books: [],
    });

    await userCollection.doc(uid).set({
      email,
      library: newLibraryDoc.id,
      borrowedBooks,
    });
  } catch (e) {
    console.log(e);
  }
}
