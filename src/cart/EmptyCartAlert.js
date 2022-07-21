import React from 'react';
import Container from '../container/Container';

export default function EmptyCartAlert() {
  return (
    <Container>
        <div className='cart-empty-wrapper'>
            <header className='empty-cart-header'>
                <h6>Your Cart is empty.</h6>
            </header>
        </div>
    </Container>
  )
}
