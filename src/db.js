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
    currentPath: '',
    fileTree: [],
    };

    await setDoc(docRef, docData);
    console.log('Playground document created successfully!');
    } catch (error) {
        console.error('Error creating playground document:', error.message);
    }
}


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
}

// addQuestion({
//   question_id: 'two_sum',
//   question_heading: 'Two Sum',
//   question_difficulty: 'Easy',
//   description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
//   exampleList: [
//     {
//       input: [2, 7, 11, 15],
//       output: [0, 1],
//       explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
//     },
//     {
//       input: [3, 2, 4],
//       output: [1, 2],
//       explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
//     },
//     {
//       input: [3, 3],
//       output: [0, 1],
//       explanation: 'Because nums[0] + nums[1] == 6, we return [0, 1].',
//     },
//   ],
//   constraints: [
//     '2 <= nums.length <= 10^4',
//     '-10^9 <= nums[i] <= 10^9',
//     '-10^9 <= target <= 10^9',
//     'Only one valid answer exists.',
//   ],
//   starter_code: 'function twoSum(nums, target) {\n  // your code here\n}',
//   test_cases: [
//     { input: '2,7,11,15;9', output: '0,1' },
//     { input: '3,2,4;6', output: '1,2' },
//   ],
//   code_verify: {},
//   user_code: '',
// });