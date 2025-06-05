import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar'
import { v4 as uuidv4 } from 'uuid';
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import FileManagerGUI from './FileManagerGUI'
import { FileNode, File } from '../types/fileTypes'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CustomSnackBar from './CustomSnackBar';
import Playground from '../pages/Playground';
import {fetchCurrentPathAndFileTree, updateCurrentPathAndFileTree} from '../backend/db';
import { useAuth } from '../contexts/AuthContext';


export default function FileManager() {
  const { currentUser } = useAuth();  
  const [currpath, setCurrpath] = React.useState<string>('~');
    const [fileTree, setFileTree] = React.useState<any>({
      id: 'root',
      name: '~',
      type: 'folder',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      children: [],
    });
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [createType, setCreateType] = React.useState<string>();
    const [snackProps,setSnackProps] = React.useState<any>({snackMessage: "Default", snackStatus:false, fileCreated: false});
    const [clickedFile, setClickedFile] = React.useState<File | null>(null);

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
    
    const fetchData = async () => {
      if (currentUser) {
        const { currentPath, fileTree }:any = await fetchCurrentPathAndFileTree(currentUser.uid);
        setCurrpath(currentPath);
        setFileTree(fileTree);
      }
    };
    console.log(currpath);
    console.log(fileTree);
    useEffect(() => {
      if (!currentUser) return;
  
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
  
      debounceTimeout.current = setTimeout(() => {
        updateCurrentPathAndFileTree(currentUser.uid, currpath, fileTree)
          .then(() => {
            console.log('Auto-saved successfully!');
          })
          .catch((error) => {
            console.error('Auto-save error:', error);
          });
      }, 1000);
  
      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }, [currpath, fileTree, currentUser]);
    
    useEffect(() => {
      fetchData();
    }, []);
    
    const openSnackBar = (status: string)=>{
      if(status == "created"){
        setSnackProps({snackMessage: `${createType} created successfully!`, snackStatus: true, fileCreated: true});
      }else if(status == "exists"){
        setSnackProps({snackMessage: `${createType} with same name exists!`, snackStatus: true, fileCreated: false});
      }else{
        setSnackProps({snackMessage: `${createType} must have a name`, snackStatus: true, fileCreated: false});
      }
    }

    const checkFolderOrFileExists = (node: FileNode,name:string)=>{
      if(node.type === 'folder'){
        for(const n of node.children){
          if(n.name === name){
            return true;
          }
        }
      }
      return false;
    }

    const getNodeOfPath = (tree = fileTree) => {
      const pathToParse = currpath.split("/");
      let currNode = tree;
      for(let i=1;i<pathToParse.length;i++){
        for(const node of currNode.children){
          if(node.name === pathToParse[i]){
            currNode = node;
            break;
          }
        }
      }
      return currNode;
    }
    const addNodeToTree = (node: FileNode) => {
      const newTree = structuredClone(fileTree);
      const targetFolder = getNodeOfPath(newTree);
    
      if (checkFolderOrFileExists(targetFolder, node.name)) {
        return false;
      }
    
      if (targetFolder.type === 'folder') {
        targetFolder.children.push(node);
        setFileTree(newTree);
        return true;
      }
    
      return false;
    };
    

    const removedNodeFromTree = (node: FileNode) => {
      const newTree = structuredClone(fileTree);
      const pathToParse = currpath.split("/");
      let current = newTree;
      const nodeTo = getNodeOfPath(current);
      if (nodeTo.type === 'folder') {
        const index = nodeTo.children.findIndex((child: FileNode) => child.id === node.id);
        nodeTo.children.splice(index, 1);
        setFileTree(newTree);
        return true;
      }
    
      return false;
    };
    

    const handleDialogOpen = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }

    const handleSubmit = (event: any) => {
			const inputName = event.target.form[0].value.trim();
      if(inputName === ''){
        openSnackBar("empty");
        return;
      }
      let res = false;
			if (createType === 'file') {
				const newNode: FileNode = {
					id: uuidv4(),
					name: inputName,
					type: 'file',
					content: '',
					input: '',
					output: '',
					createdAt: new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				}
        res = addNodeToTree(newNode);
        if(res){
          console.log(`File created with name: ${inputName}`);
        }
        else{
          console.log(`File already exists by name: ${inputName}`);
        }
			}
			if (createType === 'folder') {
        const newNode: FileNode = {
          id: uuidv4(),
          name: inputName,
          type: 'folder',
          children: [],
        }
        res = addNodeToTree(newNode);
				if(res){
          console.log(`Folder created with name: ${inputName}`);
        }
        else{
          console.log(`Folder already exists by name: ${inputName}`);
        }
			}
      res ? openSnackBar("created"):openSnackBar("exists");
			handleDialogClose();
		}

    const handleFileCreation = () => {
        handleDialogOpen();
        setCreateType('file');
    }

    const handleFolderCreation = () => {
        handleDialogOpen();
        setCreateType('folder');
    }

  const handleGoBack = (event: any): void => {
    let currPathSplit = currpath.split("/");
    currPathSplit.pop();
    const newPath = currPathSplit.join("/");
    setCurrpath(newPath);
  }

  return (
    clickedFile ? <Playground file={clickedFile} setClickedFile={setClickedFile} setFileTree={setFileTree} fileTree={fileTree} /> :
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        currentPage="File Manager"
        setCurrentPage={() => {}}
        user={null}
        setUser={() => {}}
      />
      <Box sx={{ display: 'flex', flex: 1, padding: 2 }}>
        <Box sx={{ width: '100%' }}>
          <h1>{currpath}</h1>
          <ButtonGroup size="large" aria-label="Large button group">
            <Button 
              key="three" 
              onClick={handleGoBack}
              disabled={currpath.split("/").length === 1}
            >
              <ArrowBackIosIcon/>
            </Button>
            <Button key="one" onClick={handleFileCreation}>Create File</Button>
            <Button key="two" onClick={handleFolderCreation}>Create Folder</Button>
          </ButtonGroup>
          <FileManagerGUI 
            getNodeOfPath={getNodeOfPath}
            currentPath = {currpath}
            setCurrentpath={setCurrpath}
            setClickedFile={setClickedFile}
            removeNodeFromTree={removedNodeFromTree}
          />
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries((formData as any).entries());
              const email = formJson.email;
              handleDialogClose();
            },
          },
        }}
      >
				<DialogTitle>Create {createType}</DialogTitle>
				<DialogContent>
					<DialogContentText>
							Enter the name of the {createType} you want to create.
					</DialogContentText>
					<TextField
							autoFocus
							required
							margin="dense"
							id="name"
							name="dialogInput"
							label="Name"
							fullWidth
							variant="standard"
					/>
				</DialogContent>
				<DialogActions>
						<Button onClick={handleDialogClose}>Cancel</Button>
						<Button onClick={handleSubmit}>Create</Button>
				</DialogActions>
      </Dialog>
      
      <CustomSnackBar snackProps={snackProps} setSnackProps={setSnackProps} />
    </Box>
  )
}
