# Текущие

1. При получении левела если ошибка, то все ломается. В целом везде провести работу по отлавливанию ошибок.
2. Провести рефакторинг серверной части. Оптимизировать код. Сейчас есть лишние моменты
3. Написать документацию
4. сделать иконку лайка если лайк стоит чтобы был закрашенный
5. добавить крестик в формах авторизации

# Закомитить

1. добавить кнопку скопировать в QuotesCard / Added a copy button to the QuotesCard
2. Переработать кнопки в HandleIcon / Refactored the buttons UI/UX in HandleIcon
3. в блоке популярное иконки сместить вниз / Fixed the HandleIcon position in the Popular section
4. добавить иконки в поля авторизации и регистрации и форму поиска / Added icons to the Auth and search Forms

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
20. При генерации цитаты, чтобы блок не дергался сделать;
21. Кнопки стрелки у слайдера в популярно сделать больше и ближе к центру
22. Добавить уведомление для лайка если не авторизован / Added a notification for the like if the user not authorizated
23. добавить попап "Вы точно хотите выйти?" / Added a popup 'Are you sure you want to leave'
24. Укоротить проценты в статистике / Fixed the percentage in the stats profile, reduced the number of decimal places
25. добавить крестик в форму поиска в профиле / Added a cross button in the seacrh form
26. Устранил ошибку Invalid prop className supplied to React.Fragment / Fixed the error: "Invalid prop className supplied to React.Fragment"
27. Доработать Popup входа и выхода с профиля / Improved the login and logout popup
28. Последний элемент в степпере если complete то палка вниз идет
29. Улучшил серверную часть работы левелов (если левел последний, чтобы не было ошибок) / Improved the server-side logic for levels (prevented errors when the last level is reached).
30. Еще в степпере сделать цвет текста complete, pending / Fixed the color of the stepper's items (Complete, Pending)
31. В поиске если уже есть результат, и поменять фильтр, то результат не обновляется / Improved the change filter. After change the filter, the search's result updating.
32. Сделать ограниче в поиске на количество выдываемых цитат (сделать кнопку показать еще) / Added the limit of the search result on the quote's count. And also added a 'Show more' button.
33. Добавить лого при регистрации; / Added the logo of the user to the registaration form
34. Посмотреть логин и регистрацию были какие-то косяки / Fixed and improved user athorization. Adjusted the redirect to the profile page after succesful registration.
35. Доработал маршруты если пользователь не авторизован и отображение попапа авторизации если пользователь пытается зайти на страницу профиля / Improved the routing logic for unauthorized users and added an auth popup when trying to access the profile page.
36. Лайк не обновляется по клику в QuotesCard / Fixed the like button update in QuotesCard without page refresh.
37. 1. Доработана форма регистрации. Добавлена возможность выбора аватарки и ее удаления. Добавлена проверка корректности введенных данных в поля. / Improved the registration form. Added the ability to select and delete an avatar. Implemented validation for the entered data in the form fields.
38. Fixed and improved the the listQuote animation.
39. поправить лого если авторизован / Fixed the logo display for authorized users.
40. Если лого не добавил, сделать дефолтную / Added a default logo if none was chosen during registration
41. Попап авторизации не открывается после отправки формы / Fixed the authorization popup in the ShareForm if the user is not authorized.
42. Сделать анимацию для попапов / Added animation for all popups.
43. Добавить поиск на сам сайт / Added the search form in the main page of site
44. Добавить поделиться в профиле / Added the share form in the profile page
45. Опять почему то не работает логика левелов, если достиг последнего, цитаты не получается добавить / Fixed the levels logic. If the last level is reached, quotes cannot be added.
46. как то сделать чтобы результат поиска обнулялся если вышел со страницы / Added the reset of search results when leaving the current page
47. В ListQuote лого появялется только после обновления / Fixed the ShareForm for displaing the user logo in the ListQuote
48. Придумать что показывать если ты Стетхем / Added an image if the max level is reached.
49. статус отображается предыдущий почему то / Fixed checkUserLevel to correctly display the current level title.
50. добавить дату в quotescard / Added the date of the quote to the QuotesCard.
51. Проверка и рефакторинг адапатива / Checked and refactored the adaptive part of layout.

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
11. Показывать инфо пользователя при наведении
12. Если вышел с логина на одной странице, на другой странице еще можно просатривать ЛК
13. Сделать смайлики в инпуте формы
14. поиграться с цветами
15. Уведомление в виде попапа о том, что перешел на следующий уровень
16. Провести рефакторинг scss profile и сопутствующих файлов со стилями
17. Улучшить анимации везде
18. Удалить цитату на странице своих циатат
19. Переработать маршруты если пользователь не авторизован и отображение попапа в этом случае
20. Улучшить анимации всего (в частности анимации при добвлении циатат)
21. Переделать stepper, а именно высоту их палок, чтобы высота вычислялась динамически
22. По форме поиска. Хорошо разобраться как работает. Улучшить ее (задержка, чтобы не по каждому символу уходил запрос на сервер).
23. переработать логику выхода с профиля и открытия попапа посел выхода
24. сделать логику по токенам чтобы обновлялись
