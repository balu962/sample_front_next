// Sidebar.tsx
'use client'
import {
    List,
    ListItemText,
    ListSubheader,
    ListItemButton,
    ListItemIcon
} from '@mui/material';
import {
    ExpandLess,
    ExpandMore,
    StarBorder,
} from'@mui/icons-material'
import Collapse from '@mui/material/Collapse';
import React from 'react';
import Link from 'next/link';


const Sidebar = () =>{
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
    return (
        <>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Nested List Items
            </ListSubheader>
          }
        >
          <ListItemButton href="/guestbook">
            <ListItemText primary="방명록" />
          </ListItemButton>
          <ListItemButton href="/posts">
              <ListItemText primary="전체 글 보기" />
          </ListItemButton>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="게시판 목록" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/board/1" sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="공지사항" />
              </ListItemButton>
              <ListItemButton href="/board/2" sx={{ pl: 4 }}>
                <ListItemText primary="잡담" />
              </ListItemButton>
              <ListItemButton href="/board/3" sx={{ pl: 4 }}>
                <ListItemText primary="개발 이야기" />
              </ListItemButton>
              <Link href="/board/form">
              <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="게시판 만들기" />
              </ListItemButton>
              </Link>
            </List>
          </Collapse>
        </List>
        </>
    )

};

export default Sidebar;