import React from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/crewContent.module.scss';

function crewContent() {
  const cx = classNames.bind(styles);

  return (
    <div className={cx('wrap')}>
      <h1>직원관리</h1>
      <div className={cx('content-wrap')}>
        <table>
          <thead>
            <tr>
              <th> </th>
              <th>직원번호</th>
              <th>근무점포명</th>
              <th>직책</th>
              <th>직원명</th>
              <th>성별</th>
              <th>입사일</th>
              <th>퇴사일</th>
              <th>근무시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>S-001</td>
              <td>센텀드림월드</td>
              <td>점장</td>
              <td>김점장</td>
              <td>여</td>
              <td>2010.02.05</td>
              <td> </td>
              <td>08:00~15:00</td>
            </tr>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>S-002</td>
              <td>센텀드림월드</td>
              <td>매니저</td>
              <td>이매니저</td>
              <td>남</td>
              <td>2020.02.05</td>
              <td> </td>
              <td>15:00~23:00</td>
            </tr>
            <tr>
              <td className={cx('input-wrap')}>
                <input type='checkbox' />
                <img src='/assets/svg/icon-check.svg' alt='check' />
              </td>
              <td>S-003</td>
              <td>센텀드림월드</td>
              <td>직원</td>
              <td>박직원</td>
              <td>여</td>
              <td>2022.02.05</td>
              <td>2022.09.15</td>
              <td>08:00~13:00</td>
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td />
            </tr>
            <tr>
              <td />
            </tr>
          </tbody>
        </table>
        <div className={cx('btn-wrap')}>
          <button type='button'>직원등록</button>
          <button type='button'>직원삭제</button>
        </div>
      </div>
    </div>
  );
}

export default crewContent;
