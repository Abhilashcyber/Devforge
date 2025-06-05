import { db } from './firebase.js';
import { collection, where, getDocs, query, doc, updateDoc, setDoc, addDoc } from 'firebase/firestore';

export const createUserInDb = async (user, email, fullName) => {
    try {
      const docRef = doc(db, 'users', user.uid);
      const docData = {
        userId: user.uid,
        fullName: fullName,
        email: email,
        solved_questions: [],
        contests: [],
      };
  
      await setDoc(docRef, docData);
      console.log('User document created successfully!');
    } catch (error) {
      console.error('Error creating user document:', error.message);
    }
  };
  
export const createPlaygroundInDb = async (userId) => {
  try {
    const docRef = doc(db, 'playground', userId);
    const docData = {
      userId: userId,
      currentPath: '~',
      fileTree: {
        id: 'root',
        name: '~',
        type: 'folder',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
      },
    };

    await setDoc(docRef, docData);
    console.log('Playground document created successfully!');
    } catch (error) {
        console.error('Error creating playground document:', error.message);
    }
  };

export const fetchCurrentPathAndFileTree = async (userId) => {
  try {
    const q = query(
      collection(db, 'playground'),
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } else {
      console.log('No matching document found!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching current path:', error.message);
    return null;
  }
  };

export const updateCurrentPathAndFileTree = async (userId, newPath, fileTree) => {
    try {
      const q = query(
        collection(db, 'playground'),
        where('userId', '==', userId)
      );
  
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const matchedDoc = querySnapshot.docs[0];
        
        const docRef = doc(db, 'playground', matchedDoc.id);
  
        await updateDoc(docRef, {
          currentPath: newPath,
          fileTree: fileTree,
        });
  
        console.log('Current path updated successfully!');
      } else {
        console.log('No matching document found!');
      }
    } catch (error) {
      console.error('Error updating current path:', error.message);
    }
  };
  
export const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questions = [];
  
      querySnapshot.forEach((doc) => {
        questions.push({ id: doc.id, ...doc.data() });
      });
  
      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error.message);
      return [];
    }
  };
  
export const addQuestion = async (question) => {
    try {
      const docRef = doc(db, 'questions', question.question_id);

      await setDoc(docRef, {
        question_id: question.question_id,
        question_heading: question.question_heading,
        question_difficulty: question.question_difficulty,
        description: question.description,
        exampleList: question.exampleList,
        constraints: question.constraints,
        starter_code: question.starter_code,
        test_cases: question.test_cases,
        code_verify: question.code_verify,
        user_code: question.user_code,
      });

      console.log('Question added/updated successfully!');
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  };
