export const getRewardPoints = () => {
  const savedPoints = localStorage.getItem('rewardPoints');
  return savedPoints ? parseInt(savedPoints, 10) : 0;
};

export const getTotalRewardPoints = () => {
  const savedTotalPoints = localStorage.getItem('totalRewardPoints');
  return savedTotalPoints ? parseInt(savedTotalPoints, 10) : 0;
};

export const addRewardPoints = (points) => {
  const currentPoints = getRewardPoints();
  const newPoints = currentPoints + points;
  localStorage.setItem('rewardPoints', newPoints);

  const totalPoints = getTotalRewardPoints() + points;
  localStorage.setItem('totalRewardPoints', totalPoints);
  
  updateMembershipTier(totalPoints);
  return newPoints;
};

export const redeemRewardPoints = (pointsToRedeem) => {
  const currentPoints = getRewardPoints();
  if (currentPoints < pointsToRedeem) {
    return { success: false, message: 'Không đủ điểm để đổi.' };
  }
  const newPoints = currentPoints - pointsToRedeem;
  localStorage.setItem('rewardPoints', newPoints);

  const discountCode = generateDiscountCode();
  return { success: true, newPoints, discountCode };
};

export const generateDiscountCode = () => {

  return `DISCOUNT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
};

export const applyDiscount = (totalAmount, discountCode) => {
  if (discountCode) {
    const discount = 0.10; 
    return totalAmount * (1 - discount);
  }
  return totalAmount; 
};

export const getMembershipTier = (totalPoints) => {
  if (totalPoints >= 1000) return 'Platinum';
  if (totalPoints >= 500) return 'Gold';
  if (totalPoints >= 100) return 'Silver';
  return 'Bronze';
};

export const updateMembershipTier = (totalPoints) => {
  const membershipTier = getMembershipTier(totalPoints);
  localStorage.setItem('membershipTier', membershipTier);
};

export const getMembershipTierFromStorage = () => {
  return localStorage.getItem('membershipTier') || 'Bronze';
};

export const getDiscountCode = () => {
  return localStorage.getItem('discountCode');
};
