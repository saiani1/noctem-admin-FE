import React from 'react';
import withAuth from '../src/components/common/withAuth';

import CrewContent from '../src/components/content/crewContent';

function crew() {
  return <CrewContent />;
}

export default withAuth(crew);
