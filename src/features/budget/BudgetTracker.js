import React from 'react';
import ComingSoon from '../../components/common/ComingSoon';
import { COMING_SOON } from '../../constants/uiText';

function BudgetTracker() {
  const { title, description, phase } = COMING_SOON.BUDGET;
  return (
    <ComingSoon
      title={title}
      description={description}
      phase={phase}
    />
  );
}

export default BudgetTracker;