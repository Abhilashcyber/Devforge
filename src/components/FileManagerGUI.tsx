import React, { useEffect } from 'react'
import { FileNode, Folder, File } from '../types/fileTypes'
import { Box, Grid, Icon, IconButton, Typography } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteIcon from '@mui/icons-material/Delete';

export interface FileManagerGUIProps {
    getNodeOfPath: any
    currentPath: string
    setCurrentpath: React.Dispatch<React.SetStateAction<string>>
    setClickedFile: React.Dispatch<React.SetStateAction<File | null>>
    removeNodeFromTree: (node: FileNode) => void
}

export default function FileManagerGUI(props: FileManagerGUIProps) {
  const { getNodeOfPath, currentPath, setCurrentpath, setClickedFile, removeNodeFromTree } = props
  const nodeToDisplay = getNodeOfPath();
  // useEffect(() => {
  //   if (nodeToDisplay) {
  //     setCurrentpath(nodeToDisplay.name);
  //   }
  // }, [nodeToDisplay, setCurrentpath]);

  const renderNodes = (nodes: Folder) => {
    if(nodes.children){
      return nodes.children.map(
      (node: FileNode) => {
        return <Grid size={2} key={node.id}>
          <Box
            onClick={() => {
              node.type === 'folder'? setCurrentpath(currentPath + "/"+ node.name): setClickedFile(node);
            }}
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              height: 200,
              cursor: 'pointer',
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 2,
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                bgcolor: 'action.hover',
              },
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                zIndex: 1,
              }}
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering folder/file open
                removeNodeFromTree(node);
              }}
            >
                <DeleteIcon
                  sx={{
                    color: 'error.main',
                    fontSize: 20,
                  }}/>
            </IconButton>
            {node.type === 'folder' ? (
              <FolderIcon sx={{ fontSize: 50, color: 'primary.main' }} />
            ) : (
              <InsertDriveFileIcon sx={{ fontSize: 50, color: 'text.secondary' }} />
            )}
            <Typography variant="body2" align="center" mt={1}>
              {node.name}
            </Typography>
          </Box>
      </Grid>;
      }
    );
    }
  }

  return (
      <Box sx={{ flexGrow: 1, mt:4 }}>
        <Grid container spacing={2}>
          {renderNodes(nodeToDisplay)}
        </Grid>
      </Box>
  )
}
