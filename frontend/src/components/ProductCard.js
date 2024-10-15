import React from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const ProductCard = ({ product, addToCart }) => {
  return (
    <Card>
      <CardMedia component="img" height="140" image={product.image} alt={product.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography variant="h6">{product.price}₫</Typography>
        <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
          Thêm vào giỏ hàng
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
