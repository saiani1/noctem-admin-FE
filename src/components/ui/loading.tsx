import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/ui/loading.module.scss';

function Loading() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('spinner')} />
      <div className={cx('text')}>loading</div>
    </div>
  );
}

export default Loading;
