import React from 'react'
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, ButtonGroup } from '@mui/material'
import { Link } from 'react-router-dom'

export default function Navbar({ currentPage, setCurrentPage, user, setUser }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [menuOpen, setMenuOpen] = React.useState(false)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setMenuOpen(false)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          DevForge
        </Typography>

        <Button
          color="inherit"
          onClick={handleMenuClick}
        >
          Pages
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={menuOpen}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Playground
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/arena" style={{ textDecoration: 'none', color: 'inherit' }}>
              Arena
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/battleground" style={{ textDecoration: 'none', color: 'inherit' }}>
              Battleground
            </Link>
          </MenuItem>
        </Menu>
        <Button color="inherit" onClick={() => setUser(null)}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}
