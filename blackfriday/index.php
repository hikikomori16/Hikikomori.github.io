<?php

$url = "https://obi-services.directcrm.ru/v2/customers/perform-operation?operation=CybermondayJanuary2017";
$page = "/v2/customers/perform-operation?operation=CybermondayJanuary2017";
$headers = array(

    'X-Brand: Obi',
    'X-Point-Of-Contact: diy.obi.ru',
    'Authorization: DirectCrm key="g3F9XfGjRzRwlTviqNZd"',
    'Accept: application/xml',
    'Content-Type: application/xml'
);

if(isset($_POST['data']) &&  !empty($_POST['data'])) {

$xml_data = "<customer><email>" .$_POST['data']. "</email></customer>";

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_TIMEOUT, 60);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

  // Apply the XML to our curl call
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_data);

  $data = curl_exec($ch);

  if (curl_errno($ch)) {
      print "Error: ".curl_error($ch);
  } else {
      // Show me the result
      // print "success: ".$data;
      // print "success: ".$xml_data;
      // var_dump($data);
      curl_close($ch);
  }

    die();
}

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <!--[if lt IE 9]><script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script><![endif]-->
    <title>Черная пятница</title>
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <link href="http://obi-diy.coding.dev.bstd.ru/f/css/main.css" rel="stylesheet">
    <link href="f/css/flipclock.css" rel="stylesheet">
    <link href="f/css/main.css" rel="stylesheet">
    <link href="f/css/blackfriday.css" rel="stylesheet">
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
</head>

<body class="body">
<header class="header header_mod_fixed">
  <a class="header-logo" href=""></a>
    <div class="header__body">
        <div class="header-menu-mobile__menu"></div>
        <div class="header-menu-mobile__close"></div>
        <ul class="header-menu">
            <li class="header-menu__item header-menu__item_mod_arrow">
                <span>Делимся опытом</span>
                <ul class="header-menu_lev_2">
                    <ul class="header-menu-title">
                        <li class="header-menu-title__item"><a href="">Ремонт и строительство</a></li>
                        <li class="header-menu-title__item"><a href="">Декор</a></li>
                        <li class="header-menu-title__item"><a href="">Сад</a></li>
                        <li class="header-menu-title__item"><a href="">Вдохновляйтесь с ОБИ</a></li>
                    </ul>
                    <li class="header-menu__item">
                        <!--<a href="">Ремонт и строительство</a>-->
                        <ul class="header-menu_lev_3">
                            <li class="header-menu__item"><a href="">Общестроительные работы</a></li>
                            <li class="header-menu__item"><a href="">Электромонтажные работы</a></li>
                            <li class="header-menu__item"><a href="">Сборочные и плотницкие работы</a></li>
                            <li class="header-menu__item"><a href="">Штукатурно-плиточные работы</a></li>
                            <li class="header-menu__item"><a href="">Сантехнические работы</a></li>
                            <li class="header-menu__item"><a href="">Кровельные работы</a></li>
                        </ul>
                    </li>
                    <li class="header-menu__item">
                        <!--<a href="">Декор</a>-->
                        <ul class="header-menu_lev_3">
                            <li class="header-menu__item"><a href="">Архитектурное проектирование</a></li>
                            <li class="header-menu__item"><a href="">Реставрация</a></li>
                            <li class="header-menu__item"><a href="">Разработка дизайн-проекта</a></li>
                            <li class="header-menu__item"><a href="">Художественная роспись</a></li>
                            <li class="header-menu__item"><a href="">Лепные работы</a></li>
                            <li class="header-menu__item"><a href="">Новый год</a></li>
                            <li class="header-menu__item"><a href="">Другое</a></li>
                        </ul>
                    </li>
                    <li class="header-menu__item">
                        <!--<a href="">Сад</a>-->
                        <ul class="header-menu_lev_3">
                            <li class="header-menu__item"><a href="">Озеленение</a></li>
                            <li class="header-menu__item"><a href="">Зимние сады</a></li>
                            <li class="header-menu__item"><a href="">Ландшафтный дизайн и Проектирование</a></li>
                            <li class="header-menu__item"><a href="">Благоустройство</a></li>
                            <li class="header-menu__item"><a href="">Декоративные водоемы</a></li>
                            <li class="header-menu__item"><a href="">Другое</a></li>
                        </ul>
                    </li>
                    <ul class="header-menu-title header-menu-title_mod_last">
                        <li class="header-menu-title__item"><a href="">Вдохновляйтесь с ОБИ</a></li>
                    </ul>
                    <li class="header-menu__item">
                        <ul class="header-menu_lev_3">
                            <li class="header-menu__item"><a href="">Дачный отдых для все семьи</a></li>
                            <li class="header-menu__item"><a href="">На пороге лета</a></li>
                            <li class="header-menu__item"><a href="">Весеннее обновление дачи и квартиры</a></li>
                            <li class="header-menu__item"><a href="">Подготовка к весне началась!</a></li>
                            <li class="header-menu__item"><a href="">Ландшафтный дизайн</a></li>
                            <li class="header-menu__item"><a href="">Современный декор и стильное освещение</a></li>
                            <li class="header-menu__item"><a href="">Готовимся к встрече Нового года</a></li>
                            <li class="header-menu__item"><a href="">Холодно и снег? Мы знаем, что делать!</a></li>
                            <li class="header-menu__item"><a href="">Начинаем ремонт: кухня и ванная комната</a></li>
                            <li class="header-menu__item"><a href="">Продолжаем ремонт: гостиная, детская и балкон</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="header-menu__item"><a href="">Полезные советы</a></li>
            <li class="header-menu__item"><a href="">Вопрос-Ответ</a></li>
            <li class="header-menu__item header-menu__item_state_active"><a href="">Рейтинги</a></li>
            <!--<li class="header-menu__item header-menu__item_mobile_hide"><a href="">Мастер-классы в ОБИ</a></li>-->
            <li class="header-menu__item header-menu__item_mobile_hide"><a href="">Вдохновляйтесь</a></li>
            <li class="header-menu__item header-menu__item_mobile_hide"><a href="">Каталог готовых решений</a></li>

            <li class="header-menu__item header-menu__item_mod_arrow header-menu__item_mobile_show">
                <span>Еще</span>
                <ul class="header-menu_mod_more">
                    <!--<li class="header-menu__item"><a href="">Мастер-классы в ОБИ</a></li>-->
                    <li class="header-menu__item"><a href="">Вдохновляйтесь</a></li>
                    <li class="header-menu__item"><a href="">Каталог готовых решений</a></li>
                </ul>
            </li>
        </ul>
    </div>

    <div class="header-nav">
        <a href="" class="header-nav__item header-nav__item_mod_cart"></a>
        <div class="header-nav__item header-nav__item_mod_search"></div>
        <div class="header-nav__item header-nav__item_mod_singin">
            <img class="header-user__photo" src="f/i/header-user__photo.png" alt="" title="">
            <div class="header-user">
                <ul class="header-user-list">
                    <li class="header-user-list__item header-user-list__item_mod_enter"><a href="">Войти</a></li>
                    <li class="header-user-list__item"><a href="">Регистрация</a></li>
                </ul>
            </div>
        </div>
    </div>
</header><!-- .header-->

<div class="header-search">
    <form class="header-search__body">
        <input class="header-search__input" type="" name="" placeholder="Поиск по сайту">
    </form>
    <div class="header-search__close"></div>
</div>

<div class="header-menu-mobile">
    <ul class="header-menu-mobile__list">
        <li class="header-menu-mobile__item"><a href="">Статьи</a></li>
        <li class="header-menu-mobile__item"><a href="">Советы</a></li>
        <li class="header-menu-mobile__item"><a href="">Вопросы и ответы</a></li>
        <li class="header-menu-mobile__item"><a href="">Рейтинги</a></li>
        <li class="header-menu-mobile__item"><a href="">Мастер-классы</a></li>
        <li class="header-menu-mobile__item"><a href="">Вдохновляйтесь</a></li>
        <li class="header-menu-mobile__item"><a href="">Готовые решения</a></li>
    </ul>
    <div class="header-search-mobile">
        <form class="header-search-mobile__body">
            <input class="header-search-mobile__input" type="" name="" placeholder="Поиск по сайту">
        </form>
    </div>
    <a class="header-cart-mobile" href="">Интернет-магазин ОБИ</a>
</div>

<div class="wrapper wrapper--blackfriday">

    <div class="middle">
        <div class="middle__body">

            <div class="container">
                <main class="content">
                    <div class="blackfriday-about">
                        <h1 class="blackfriday-about__heading">Получите скидку первыми!</h1>
                        <p class="blackfriday-about__text">В Черную пятницу вы сможете купить товары ОБИ по&nbsp;специальным ценам. А чтобы узнать заранее, какие товары будут участвовать в акции и цены на них, оставьте свой email в поле ниже, на который мы пришлем Вам письмо с анонсом распродажи!</p>
                        <form action="/" class="blackfriday-about__form" method="POST">
                            <div class="blackfriday-about__input-label-pair blackfriday-about__input-label-pair--email">
                                <label for="blackfriday-email" class="blackfriday-about__label-email">Укажите свой email:</label>
                                <input type="email" id="blackfriday-email" class="blackfriday-about__input-email">
                            </div>
                            <div class="blackfriday-about__input-label-pair blackfriday-about__input-label-pair--checkbox">
                                <input type="checkbox" id="blackfriday-checkbox" class="blackfriday-about__input-checkbox">
                                <label for="blackfriday-checkbox" class="blackfriday-about__label-checkbox">Настоящим я даю согласие на обработку своих персональных&nbsp;данных <span class="blackfriday-obigroup-popup-trigger">Группой компаний ОБИ</span>
                                <p class="blackfriday-obigroup-popup">
                                    ООО “ОБИ Франчайзинговый Центр” ОГРН 1027710013033<br>
                                    ООО “Сделай Своими Руками Северо-Запад” ОГРН 5067847013493<br>ООО “Сделай Своими Руками” ОГРН 1025000661344<br>
                                    ООО “Сделай Своими Руками – Казань” ОГРН 1051622131010
                                </p> 
                                в соответствии с ч.1 ст 9. №152- ФЗ “О персональных данных” и получение информации о текущих предложениях, специальных акциях и эксклюзивных предложениях от ОБИ.</label>
                            </div>
                            <button type="submit" class="blackfriday-about__form-submit">Хочу узнать первым!</button>
                            <p class="blackfriday-about__form-submit-ok-text">
                                Вы успешно подписались!
                                Теперь&nbsp;вы&nbsp;первыми узнаете о самых выгодных предложениях черной пятницы.
                            </p>
                        </form>
                    </div>
                    <div class="blackfriday-counter">
                        <h2 class="blackfriday-counter__heading">До начала распродажи осталось:</h2>   
                        <div class="blackfriday-counter__clock"></div>
                    </div>
                </main><!-- .content -->
            </div><!-- .container-->

        </div>
    </div><!-- .middle-->

</div><!-- .wrapper -->

<footer class="footer">
    <div class="footer__body">
        <div class="footer__column">
            <p class="footer__topic">Основная информация</p>
            <ul class="footer-list">
                <li class="footer-list__item"><a href="">О сайте</a></li>
                <li class="footer-list__item"><a href="">Часто задаваемые вопросы</a></li>
                <li class="footer-list__item"><a href="">Правила</a></li>
                <li class="footer-list__item"><a href="">Помощь по сайту</a></li>
                <li class="footer-list__item"><a href="">Личный кабинет</a></li>
            </ul>
            <div class="footer-shop__wrap-mobile">
                <p class="footer__topic">Интернет-магазин ОБИ</p>
                <div class="footer-shop">
                    <img class="footer-shop__img" src="f/i/footer-shop__img.png" alt="" title="">
                    <a class="footer-shop__link" href="">www.obi.ru</a>
                </div>
            </div>
        </div>
        <div class="footer__column">
            <p class="footer__topic">Основные разделы</p>
            <ul class="footer-list">
                <li class="footer-list__item"><a href="">Статьи</a></li>
                <li class="footer-list__item"><a href="">Советы</a></li>
                <li class="footer-list__item"><a href="">Вопросы и ответы</a></li>
                <li class="footer-list__item"><a href="">Рейтинги</a></li>
                <li class="footer-list__item"><a href="">Мастер-классы</a></li>
                <li class="footer-list__item"><a href="">Вдохновляйтесь</a></li>
                <li class="footer-list__item"><a href="">Готовые решения</a></li>
            </ul>
        </div>
        <div class="footer__column">
            <p class="footer__topic">Подписаться на рассылку</p>
            <form class="footer-subscription">
                <!--<p class="footer-subscription__success">Вы успешно подписались</p>-->
                <input class="footer-subscription__input" type="email" name="" placeholder="Ваш e-mail">
                <button class="footer-subscription__submit" type="submit"></button>
            </form>
            <p class="footer__topic">Присоединяйтесь к нам</p>
            <ul class="footer-social">
                <li class="footer-social__item footer-social__item_mod_vk"><a href=""></a></li>
                <li class="footer-social__item footer-social__item_mod_ok"><a href=""></a></li>
                <li class="footer-social__item footer-social__item_mod_fb"><a href="https://www.facebook.com/obirussia/" target="_blank"></a></li>
            </ul>
            <a href="" class="footer-mobile footer-mobile_mod_mobile">
                <div class="footer-mobile__img"></div>
                <p class="footer-mobile__text">Мобильное<br>приложение</p>
            </a>
            <div class="footer-store footer-store_mod_mobile">
                <a class="footer-store__item footer-store__item_mod_apple" href=""></a>
                <a class="footer-store__item footer-store__item_mod_google" href=""></a>
            </div>
        </div>
        <div class="footer__column footer__column_mod_4">
            <p class="footer__topic">Интернет-магазин ОБИ</p>
            <div class="footer-shop">
                <img class="footer-shop__img" src="f/i/footer-shop__img.png" alt="" title="">
                <a class="footer-shop__link" href="">www.obi.ru</a>
            </div>
            <a href="" class="footer-mobile">
                <div class="footer-mobile__img"></div>
                <p class="footer-mobile__text">Мобильное<br>приложение</p>
            </a>
            <div class="footer-store">
                <a class="footer-store__item footer-store__item_mod_apple" href=""></a>
                <a class="footer-store__item footer-store__item_mod_google" href=""></a>
            </div>
        </div>
        <div class="footer__bottom">
            <p class="footer-legal">
                <a href="">Правовая информация</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="">Все магазины</a>
            </p>
            <p class="footer-copyright">© 2011 - 2016 diy.obi.ru советы по ремонту, строительству и дизайну вашего дома</p>
        </div>
    </div>
</footer><!-- .footer -->

<script src="http://obi-diy.coding.dev.bstd.ru/f/js/main.min.js"></script>
<script src="f/js/flipclock.min.js"></script>
<script type="text/javascript">
            var clock;

            $(function() {

                // Grab the current date
                var currentDate = new Date();

                // Set some date in the future. In this case, it's always Jan 1
                var futureDate  = new Date(2017,10,23);

                // Calculate the difference in seconds between the future and current date
                var diff = futureDate.getTime() / 1000 - currentDate.getTime() / 1000;

                // Instantiate a coutdown FlipClock
                clock = $('.blackfriday-counter__clock').FlipClock(diff, {
                    clockFace: 'DailyCounter',
                    countdown: true,
                    language: "russian"
                });
            });
        </script>

</body>
</html>
