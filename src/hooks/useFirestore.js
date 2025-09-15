import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(documents);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addData = async (newData) => {
    try {
      const docRef = await addDoc(collection(db, collectionName), newData);
      setData(prev => [...prev, { id: docRef.id, ...newData }]);
      return docRef.id;
    } catch (err) {
      setError(err.message);
    }
  };

  const updateData = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, collectionName, id), updatedData);
      setData(prev => prev.map(item => 
        item.id === id ? { ...item, ...updatedData } : item
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteData = async (id) => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      setData(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [collectionName]);

  return { data, loading, error, addData, updateData, deleteData, refetch: fetchData };
};