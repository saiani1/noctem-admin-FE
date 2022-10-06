import React from 'react';
import classNames from 'classnames/bind';

import styles from '../styles/pages/managePage.module.scss';

function manage() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('manage-page')}>
      <div>Manage Page</div>
    </div>
  );
}

export default manage;
