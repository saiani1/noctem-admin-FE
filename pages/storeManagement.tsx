import React from 'react';
import classNames from 'classnames/bind';

import styles from '../styles/pages/storeManagement.module.scss';

function storeManagement() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <p>헬로우~</p>
    </div>
  );
}

export default storeManagement;
