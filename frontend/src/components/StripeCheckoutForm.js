import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@mui/material';

const StripeCheckoutForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!error && paymentMethod) {
      // Here, you would typically send the paymentMethod.id to your server to create a payment intent.
      onSuccess(); // Call onSuccess if payment is successful.
    } else {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="submit" variant="contained" sx={{ mt: 2 }} disabled={!stripe}>
        Pay {amount.toLocaleString()} ₫
      </Button>
    </form>
  );
};

export default StripeCheckoutForm;
