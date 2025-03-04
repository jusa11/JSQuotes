import { useSelector } from 'react-redux';
import MyChart from './MyChart';
import { selectUser } from '../../../redux/slices/userSlice';
import { useGetQuotesCountQuery } from '../../../redux/api/countQuotesApi';
import { useEffect, useRef } from 'react';
import { useOutletRef } from '../../../../Hooks/useOutletRef';

const StatsProfile = () => {
  const ref = useRef(null);
  const outletRef = useOutletRef();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (ref.current && !outletRef.current.includes(ref.current)) {
      outletRef.current.push(ref.current);
    }
  }, [outletRef]);

  const { data, error, isLoading } = useGetQuotesCountQuery(user.username, {
    skip: !user?.username,
  });

  if (isLoading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    console.log('Ошибка:', error);
    return <p>Ошибка загрузки данных</p>;
  }
  const statsInfo = data;

  return (
    <div className="stats" ref={ref}>
      <div className="decor-wrapper">
        <div className="stats-decor_1"></div>
        <div className="stats-decor_2"></div>
        <div className="stats-decor_3">
          <MyChart dataLevel={data} />
        </div>
      </div>
      <div className="stats-userinfo">
        <div className="stats-user">
          <div className="stats-user__username">{user.username}</div>
          <div className="stats-user__level">{statsInfo?.titleLevel}</div>
        </div>
        <div className="stats-info">
          <div className="stats-info__block">
            <div className="stats-total__title">Всего поделился</div>
            <div className="stats-total__value">
              {statsInfo?.currentCountQuotes}
            </div>
          </div>
          <div className="stats-info__block">
            <div className="stats-total__title">До следующего уровня</div>
            <div className="stats-total__value">
              {statsInfo?.needQuoteForNextLevel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsProfile;
