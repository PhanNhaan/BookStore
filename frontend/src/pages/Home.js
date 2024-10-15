import React from 'react';
import { Box, Grid, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

const Home = ({ products, addToCart }) => {
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 3, color: '#2e7d32' }}>Sản phẩm nổi bật</Typography>
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card className="card" sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">{product.name}</Typography>
                <Typography variant="body2" color="textSecondary">Thể loại: {product.category}</Typography>
                <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>{product.price.toLocaleString()} ₫</Typography>
                <Button variant="contained" color="primary" onClick={() => addToCart(product)} sx={{ borderRadius: '20px' }}>
                  Thêm vào giỏ hàng
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
