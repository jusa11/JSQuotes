# Текущие

1. При генерации цитаты, чтобы блок не дергался сделать;
1. Последний элемент в степпере если complete то палка вниз идет
1. Еще в степпере сделать цвет текста complete, pending
1. Убрать как-то из git файл .env
1. Сделать кнопку скопировать у генератора вообще доработать блок с генерацией цитаты
1. Кнопки стрелки у слайдера в популярно сделать больше и ближе к центру
1. Сделать ограниче в поиске на количество выдываемых цитат (сделать кнопку показать еще)
1. Добавить лого при регистрации;
1. В поиске если уже есть результат, и поменять фильтр, то результат не обновляется
2. Посмотреть логин и регистрацию были какие-то косяки
3. Лайк не обновляется по клику в QuotesCard
4. В Popular вообше не работают лайки (работают но не обновляются)
5. На мобильной версии в бургере нет ссылки в личный кабинет.
6. При получении левела если ошибка, то все ломается
7. В прифиле в right блок степпера уже чем статы
8. В статистике если число длинное, то не помещается на 1 брейке

# Закомитить

1. Fix the errors in the burger and UserCard
2. Edited the list item's opening on click. 

# Выполнено

1. убрать лайк; +
2. Блок с генерацией цитаты, ограничить ширину, сейчас если цитата длиная она выходит за пределы страницы; +
3. Сделать Джейсона в space посветлее или чтобы светился; +
4. Сделать планый скрол для пунктов меню; +
5. Сделать паралакс эффект при прокрутке; +
6. Реализовать логику лайков и UI. Что-то придумать, чтобы нельзя было лайкать несколько раз, даже незарегистрированому пользователю; +
7. Добавить лайки в блок с последними цитатами; +
8. Оформить блок по клику на планету (один для всех); +
9. Добавить лайки везде;+
10. Поправить инпут в shareForm. +
11. Поработать над длиной текста. Сделать ограничение длины текста при отправке цитаты. В случае если циатата обрезается в карточке популярных или последних, реализовать возможность при клике на нее, отобразить весь текст.
12. По клику по планете открывать popup с цитатой и информции о поделившемся; +
13. Сделать, чтобы когда неавторизованный пользователь отправляет мысль, вылезало окно регистрации или авторизации +
14. последние и популярные цитаты в основной странице показывает только авторизованным пользователям
    Пройтись везде и поставлять иконки из react-icons.
15. Определиться с цветами при ховере
16. Пройтись везде и установить где нужно setError. Возможно вообще переработать setError
17. Ховер при наведении на планету
18. Кнопка "Присоединиться" в футере не исчезает после авторизации Fix the "Join" button in the footer. After don't disappeared.
19. Upgrade the UserCard.

# На будущее

1. Возможно реализовать просмотр всех цитат (бесконечная прокрутка);
2. Подтверждение регистрации по email?
3. Пока не будет возможности восстановить пароль, возможно добавить в будещем
4. про токен, изучить нужен ли при пост и гет запросах на получение цитат связанных с пользователем (authMiddleWare)(понравившееся, его циататы и тд)
5. Продумать if (url === LIKED_QUOTES.replace(':username', username)) ListQuotes
6. Изучить про типы запрососов. Загловки, body, query запросов.
7. На будущее добавить возможность комментариев и отправки личных сообщений;
8. Верстка в степпере ломается если добавлять текст
9. Сделать, что то вроде таблицы лидеров
10. Добавление друзей, ЛС.
11. При генерации цитаты сделать эффект Chat GPT (анимировать и выдавать по буквам)
12. Показывать инфо пользователя при наведении
13. Если вышел с логина на одной странице, на другой странице еще можно просатривать ЛК
14. Сделать смайлики в инпуте формы
15. поиграться с цветами
16. Уведомление в виде попапа о том, что перешел на следующий уровень
17. Провести рефакторинг scss profile и сопутствующих файлов со стилями
