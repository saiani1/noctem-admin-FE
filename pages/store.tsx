import React from 'react';
import withAuth from '../src/components/common/withAuth';

import StoreContent from '../src/components/content/storeContent';

function store() {
  return <StoreContent />;
}

export default withAuth(store);
