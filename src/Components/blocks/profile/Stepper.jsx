const Stepper = () => {
  return (
    <div className="stepper content-right__card profile-card">
      <div className="stepper-wrapper">
        <ul className="stepper-list">
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_complete"></div>
            <div className="stepper-item__body">
              <div className="stepper-item__title">Новичок</div>
              <div className="stepper-item__description">
                Только зашёл, пока присматриваешься
              </div>
            </div>
          </li>
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_process"></div>
            <div className="stepper-item__body">
              <div className="stepper-item__title">Браток</div>
              <div className="stepper-item__description">
                Тебя уже знают, но пока ты просто рядом
              </div>
            </div>
          </li>
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_pending"></div>
            <div className="stepper-item__body">
              <div className="stepper-item__title">Работяга</div>
              <div className="stepper-item__description">
                Выполняешь грязную работу, но качаешь авторитет
              </div>
            </div>
          </li>
          <li className="stepper-list__item ">
            <div className="stepper-item__icon stepper-item__icon_pending"></div>
            <div className="stepper-item__body stepper-item__no-active">
              <div className="stepper-item__title">Приближённый</div>
              <div className="stepper-item__description stepper-item__no-active">
                Тебя уважают, доверяют важные мелкие дела
              </div>
            </div>
          </li>
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_pending"></div>
            <div className="stepper-item__body stepper-item__no-active">
              <div className="stepper-item__title">Авторитет</div>
              <div className="stepper-item__description stepper-item__no-active">
                Твои слова весят, тебя слушают
              </div>
            </div>
          </li>
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_pending"></div>
            <div className="stepper-item__body">
              <div className="stepper-item__title stepper-item__no-active">
                Советник
              </div>
              <div className="stepper-item__description stepper-item__no-active">
                Даёшь ценные советы, влияешь на решения
              </div>
            </div>
          </li>
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_pending "></div>
            <div className="stepper-item__body">
              <div className="stepper-item__title stepper-item__no-active">
                Отец
              </div>
              <div className="stepper-item__description stepper-item__no-active">
                без твоего одобрения никто не делает важных движений
              </div>
            </div>
          </li>
          <li className="stepper-list__item">
            <div className="stepper-item__icon stepper-item__icon_pending"></div>
            <div className="stepper-item__body">
              <div className="stepper-item__title stepper-item__no-active">
                Стэтхэм
              </div>
              <div className="stepper-item__description stepper-item__no-active">
                Не ты проходишь игру, а игра пытается пройти тебя
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Stepper;
