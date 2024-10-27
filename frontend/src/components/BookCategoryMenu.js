import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

const categories = [
  'Thiếu Nhi', 'Giáo Khoa - Tham Khảo', 'Văn Học', 'Tâm Lý - Kỹ Năng Sống',
  'Manga - Comic', 'Sách Học Ngoại Ngữ', 'Kinh Tế', 'Lịch Sử - Địa Lý',
  'Khoa Học Kỹ Thuật', 'Nuôi Dạy Con', 'Chính Trị - Pháp Lý', 'Tiểu Sử - Hồi Ký',
];

const BookCategoryMenu = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(isOpen);
  };

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        variant="contained"
        sx={{
          bgcolor: '#2e7d32',
          color: 'white',
          marginTop: 1,
          marginLeft: 2, 
        }}
      >
        DANH MỤC SẢN PHẨM
      </Button>
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <List sx={{ width: 250 }}>
          {categories.map((category, index) => (
            <ListItem button key={index}>
              <ListItemText primary={category} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default BookCategoryMenu;
