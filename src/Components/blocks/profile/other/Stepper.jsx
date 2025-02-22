import { useSelector } from 'react-redux';
import { useGetQuotesCountQuery } from '../../../redux/api/countQuotesApi';
import { selectUser } from '../../../redux/slices/userSlice';
import steps from '../../../../utils/steps';

const Stepper = () => {
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

  const level = data?.currentLevel;
	
  return (
    <div className="stepper content-right__card profile-card">
      <div className="stepper-wrapper">
        <ul className="stepper-list">
          {steps.map((step, index) => {
            return (
              <li className="stepper-list__item" key={index}>
                <div
                  className={`stepper-item__icon ${
                    level >= index
                      ? 'stepper-item__icon_complete'
                      : 'stepper-item__icon_pending'
                  }`}
                ></div>
                <div className="stepper-item__body">
                  <div className="stepper-item__title">{step.title}</div>
                  <div className="stepper-item__description">{step.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Stepper;
