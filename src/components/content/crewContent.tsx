import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from '../../../styles/content/crewContent.module.scss';
import { getCrewList } from '../../store/api/crew';
import { ICrew } from '../../types/crew.d';

function crewContent() {
  const [crewInfo, setCrewInfo] = useState<ICrew[]>([]);
  const cx = classNames.bind(styles);

  useEffect(() => {
    getCrewList().then(res => {
      setCrewInfo(res.data.data);
    });
  }, []);

  return (
    <div className={cx('wrap')}>
      <h1>직원관리</h1>
      <div className={cx('content-wrap')}>
        <table>
          <colgroup>
            <col width='1%' />
            <col width='5%' />
            <col width='5%' />
            <col width='5%' />
            <col width='5%' />
            <col width='5%' />
            <col width='8%' />
            <col width='8%' />
            <col width='5%' />
          </colgroup>
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
            {crewInfo &&
              crewInfo.map((crew: ICrew) => (
                <tr key={crew.index}>
                  <td className={cx('input-wrap')}>
                    <input type='checkbox' />
                    <img src='/assets/svg/icon-check.svg' alt='check' />
                  </td>
                  <td>{crew.id}</td>
                  <td>{crew.placeOfWork}</td>
                  <td>
                    {crew.role === 'ROLE_STAFF' && '정직원'}
                    {crew.role === 'ROLE_ADMIN' && '관리자'}
                    {crew.role === 'ROLE_MANAGER' && '책임자'}
                  </td>
                  <td>{crew.name}</td>
                  <td>{crew.sex === 'FEMALE' ? '여' : '남'}</td>
                  <td>{crew.startDate}</td>
                  <td> </td>
                  <td>{crew.workingHours}시간</td>
                </tr>
              ))}
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
