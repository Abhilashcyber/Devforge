import React, { useContext, useEffect } from 'react'
import { fetchCurrentPathAndFileTree } from '../db';
import { useAuth } from './AuthContext';

const PlaygroundContext = React.createContext<any>(null);
export const usePlayground = () => useContext(PlaygroundContext)!;

export const  PlaygroundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { currentUser } = useAuth();
    const [currentPath, setCurrpath] = React.useState<string>('~');
    const [fTree,setFTree] = React.useState<any>({
        id: 'root',
        name: '~',
        type: 'folder',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [],
      });
    useEffect(() => {
        fetchCurrentPathAndFileTree(currentUser?.uid).then((data:any) => {
            console.log(data);
            if (data) {
              setCurrpath(data.currentPath);
              setFTree(data.fileTree);
            } else {
              console.error('No data found for the current user');
            }
          }).catch((error) => {
            console.error('Error fetching data:', error);
          });
    }, [])
    const values = {
        currentPath,
        fTree,
    }

    return (
    <PlaygroundContext.Provider value={values}>
        {children}        
    </PlaygroundContext.Provider>
    )
}
