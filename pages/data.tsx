import React from 'react';
import withAuth from '../src/components/common/withAuth';

import DataContent from '../src/components/content/dataContent';

function data() {
  return <DataContent />;
}

export default withAuth(data);
