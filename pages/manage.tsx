import React from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/pages/managePage.module.scss';
import MenubarList from '../src/components/ui/menubarList';

const cx = classNames.bind(styles);

function manage() {
  return (
    <div className={cx('manage-page')}>
      <MenubarList />
      <div>Manage Page</div>
    </div>
  );
}

export default manage;
