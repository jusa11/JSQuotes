import { useSelector } from 'react-redux';
import MyChart from './MyChart';
import { selectUser } from '../../../redux/slices/userSlice';
import { useGetQuotesCountQuery } from '../../../redux/api/countQuotesApi';

const StatsProfile = () => {
  const user = useSelector(selectUser);
  const { data, error, isLoading } = useGetQuotesCountQuery(user.username, {
    skip: !user?.username,
  });

  if (isLoading) {
    console.log('Загрузка...');
    return <p>Загрузка...</p>;
  }
  if (error) {
    console.log('Ошибка:', error);
    return <p>Ошибка загрузки данных</p>;
  }
  const statsInfo = data;
  console.log(statsInfo?.currentCountQuotes);
  return (
    <div className="stats">
      <div className="decor-wrapper">
        <div className="stats-decor_1"></div>
        <div className="stats-decor_2"></div>
        <div className="stats-decor_3">
          <MyChart dataLevel={data} />
        </div>
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
  );
};

export default StatsProfile;
