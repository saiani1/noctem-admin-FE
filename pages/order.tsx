import React from 'react';

import OrderContent from '../src/components/content/orderContent';
import withAuth from '../src/components/common/withAuth';

function order() {
  return <OrderContent />;
}

export default withAuth(order);
