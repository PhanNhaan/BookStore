export const addPreOrder = (userId, productId, quantity) => {
    const preOrderList = JSON.parse(localStorage.getItem('preOrderList')) || [];
    preOrderList.push({ userId, productId, quantity });
    localStorage.setItem('preOrderList', JSON.stringify(preOrderList));
  };
  
  export const handleRestock = (productId, quantity) => {
    const products = JSON.parse(localStorage.getItem('products'));
    const updatedProducts = products.map((product) =>
      product.id === productId ? { ...product, stock: product.stock + quantity } : product
    );
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  
    const preOrderList = JSON.parse(localStorage.getItem('preOrderList')) || [];
    const relevantPreOrders = preOrderList.filter((order) => order.productId === productId);
    
    relevantPreOrders.forEach((order) => {
      alert(`Sản phẩm ${productId} đã có hàng. Vui lòng kiểm tra giỏ hàng.`);
    });
  
    const updatedPreOrderList = preOrderList.filter((order) => order.productId !== productId);
    localStorage.setItem('preOrderList', JSON.stringify(updatedPreOrderList));
  };
  