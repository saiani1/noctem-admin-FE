import React from 'react';

import StockContent from '../src/components/content/stockContent';
import withAuth from '../src/components/common/withAuth';

function stock() {
  return <StockContent />;
}

export default withAuth(stock);
