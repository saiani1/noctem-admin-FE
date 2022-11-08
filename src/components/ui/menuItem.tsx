import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import classNames from 'classnames/bind';
import toast from 'react-hot-toast';

import { useRecoilValue } from 'recoil';
import styles from '../../../styles/ui/menuItem.module.scss';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { addSoldOutMenu } from '../../store/api/menu';
import { IMenuList, ISoldOutList } from '../../types/menu.d';
import CustomAlert from './customAlert';
import { tokenState } from '../../store/atom/auth';

interface IProps {
  menu: IMenuList;
  soldOutList: ISoldOutList[];
}

function menuItem({ menu, soldOutList }: IProps) {
  const { menuName, imgUrl, menuId } = menu;
  const token = useRecoilValue(tokenState);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const cx = classNames.bind(styles);

  useEffect(() => {
    if (soldOutList.find((item: ISoldOutList) => item.soldOutMenuId === menuId))
      setIsSoldOut(true);
    else setIsSoldOut(false);
  }, []);

  const callAddSoldOutMenuAPI = (id: string) => {
    const comment = `${isSoldOut ? '판매재개' : '품절처리'}되었습니다.`;
    addSoldOutMenu(id, token).then(res => {
      if (res.data.data === true) {
        setIsSoldOut(prev => {
          return !prev;
        });
        toast.success(comment);
      }
    });
  };

  const handleClickSoldOutBtn = (e: React.MouseEvent<HTMLElement>) => {
    const { name } = e.target as HTMLInputElement;
    const { value } = e.target as HTMLInputElement;
    const comment = `${isSoldOut ? '판매재개' : '품절처리'} 하시겠습니까?`;
    confirmAlert({
      customUI: ({ onClose }) => (
        <CustomAlert
          title={value}
          desc={comment}
          btnTitle={isSoldOut ? '판매재개' : '품절처리'}
          id={name}
          onAction={callAddSoldOutMenuAPI}
          onClose={onClose}
        />
      ),
    });
  };

  return (
    <li className={cx('menu-item-wrap')}>
      <span className={cx('img-wrap')}>
        <img src={imgUrl} alt={menuName} />
      </span>
      <span className={cx('menu-name')}>{menuName}</span>
      <div className={cx('btn-wrap')}>
        <button
          type='button'
          name={menuId}
          value={menuName}
          onClick={handleClickSoldOutBtn}
          className={cx(isSoldOut ? 'restart' : 'soldout')}
        >
          {isSoldOut ? '판매재개' : '품절처리'}
        </button>
      </div>
    </li>
  );
}

export default menuItem;
