import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/storeManagementContent.module.scss';

function storeManagementContent() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <p>헬로우~</p>
    </div>
  );
}

export default storeManagementContent;
