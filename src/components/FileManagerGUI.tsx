import React, { useEffect } from 'react'
import { FileNode, Folder, File } from '../types/fileTypes'
import { Box, Grid, Typography } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import FolderIcon from '@mui/icons-material/Folder'
import Playground from '../pages/Playground'

export interface FileManagerGUIProps {
    getNodeOfPath: any
    currentPath: string
    setCurrentpath: React.Dispatch<React.SetStateAction<string>>
    setClickedFile: React.Dispatch<React.SetStateAction<File | null>>
}

export default function FileManagerGUI(props: FileManagerGUIProps) {
  const { getNodeOfPath, currentPath, setCurrentpath, setClickedFile } = props
  const nodeToDisplay = getNodeOfPath();

  const renderNodes = (node: Folder) => {
    return node.children.map(
      (node: FileNode) => {
        return <Grid size={2} key={node.id}>
          <Box
            onClick={() => {
              node.type === 'folder'? setCurrentpath(currentPath + "/"+ node.name): setClickedFile(node);
            }}
            sx={{
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

  return (
      <Box sx={{ flexGrow: 1, mt:4 }}>
        <Grid container spacing={2}>
          {renderNodes(nodeToDisplay)}
        </Grid>
      </Box>
  )
}
