import React from 'react';
import withAuth from '../src/components/common/withAuth';

import MenuContent from '../src/components/content/menuContent';

function menu() {
  return <MenuContent />;
}

export default withAuth(menu);
