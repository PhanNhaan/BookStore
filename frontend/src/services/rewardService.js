// src/services/rewardService.js

// Lấy điểm thưởng hiện tại của người dùng từ localStorage
export const getRewardPoints = () => {
  const savedPoints = localStorage.getItem('rewardPoints');
  return savedPoints ? parseInt(savedPoints, 10) : 0;
};

// Lấy tổng số điểm thưởng tích lũy từ localStorage
export const getTotalRewardPoints = () => {
  const savedTotalPoints = localStorage.getItem('totalRewardPoints');
  return savedTotalPoints ? parseInt(savedTotalPoints, 10) : 0;
};

// Thêm điểm thưởng mới và cập nhật hạng thành viên
export const addRewardPoints = (points) => {
  const currentPoints = getRewardPoints();
  const newPoints = currentPoints + points;
  localStorage.setItem('rewardPoints', newPoints);

  const totalPoints = getTotalRewardPoints() + points;
  localStorage.setItem('totalRewardPoints', totalPoints);
  
  updateMembershipTier(totalPoints);
  return newPoints;
};

// Đổi điểm thưởng lấy mã giảm giá
export const redeemRewardPoints = (pointsToRedeem) => {
  const currentPoints = getRewardPoints();
  if (currentPoints < pointsToRedeem) {
    return { success: false, message: 'Không đủ điểm để đổi.' };
  }
  const newPoints = currentPoints - pointsToRedeem;
  localStorage.setItem('rewardPoints', newPoints);

  const discountCode = generateDiscountCode();
  localStorage.setItem('discountCode', discountCode);

  return { success: true, newPoints, discountCode };
};

// Tạo mã giảm giá ngẫu nhiên
export const generateDiscountCode = () => {
  return `DISCOUNT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
};

// Áp dụng mã giảm giá để tính tổng số tiền sau khi giảm giá
export const applyDiscount = (totalAmount, discountCode) => {
  if (discountCode) {
    const discount = 0.10; // Giảm giá 10%
    return totalAmount * (1 - discount);
  }
  return totalAmount;
};

// Lấy hạng thành viên dựa trên tổng số điểm
export const getMembershipTier = (totalPoints) => {
  if (totalPoints >= 1000) return 'Platinum';
  if (totalPoints >= 500) return 'Gold';
  if (totalPoints >= 100) return 'Silver';
  return 'Bronze';
};

// Cập nhật hạng thành viên và lưu vào localStorage
export const updateMembershipTier = (totalPoints) => {
  const membershipTier = getMembershipTier(totalPoints);
  localStorage.setItem('membershipTier', membershipTier);
};

// Lấy hạng thành viên hiện tại từ localStorage
export const getMembershipTierFromStorage = () => {
  return localStorage.getItem('membershipTier') || 'Bronze';
};

// Lấy mã giảm giá hiện tại từ localStorage
export const getDiscountCode = () => {
  return localStorage.getItem('discountCode');
};

// Cập nhật số lượng tồn kho sau khi đơn hàng được đặt
export const updateStockAfterOrder = (cart) => {
  // Giả sử bạn lưu trữ thông tin sản phẩm trong localStorage với key 'booksData'
  const storedBooks = JSON.parse(localStorage.getItem('booksData')) || [];

  const updatedBooks = storedBooks.map((book) => {
    const cartItem = cart.find((item) => item.id === book.id);
    if (cartItem) {
      return {
        ...book,
        stock: Math.max(book.stock - cartItem.quantity, 0), // Giảm số lượng hàng trong kho
      };
    }
    return book;
  });

  // Lưu lại danh sách sản phẩm đã cập nhật vào localStorage
  localStorage.setItem('booksData', JSON.stringify(updatedBooks));
};
