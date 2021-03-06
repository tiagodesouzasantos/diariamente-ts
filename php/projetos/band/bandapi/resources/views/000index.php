<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>BandHelp</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="lib/angularjs/css/angularjs.min.css">
    <link rel="stylesheet" href="lib/angular-gridster/css/angular-gridster.min.css">
    <link rel="stylesheet" href="lib/angular-ui-carousel/css/angular-ui-carousel.min.css">
    <link rel="stylesheet" href="css/main.min.css">
    <link rel="stylesheet" href="bower_components/swiper/dist/css/swiper.min.css">
    <link rel="stylesheet" href="lib/slider/slider.min.css">
    <link rel="shortcut icon" href="favicon.ico" />
</head>

<body ng-app="bandHelp" ng-clock>
    <!-- bandAdManage -->

    <section class="container" ui-view="content" style="height: 100%"></section>

    <!-- Bibliotecas/dependências -->
    <script src="bower_components/swiper/dist/js/swiper.js"></script>
    <script src="lib/angularjs/angular.min.js"></script>
    <script src="lib/angular-ui-router/angular-ui-router.min.js"></script>
    <script src="lib/angular-material/angular-animate.min.js"></script>
    <script src="lib/angular-material/angular-aria.min.js"></script>
    <script src="lib/angular-messages/angular-messages.min.js"></script>
    <script src="lib/angular-material/angular-material.min.js"></script>
    <script src="lib/angular-gridster/angular-gridster.min.js"></script>
    <script src="lib/angular-ui-carousel/angular-ui-carousel.min.js"></script>
    <script src="lib/angular-chart/Chart.min.js"></script>
    <script src="lib/angular-chart/angular-chart.min.js"></script>
    <script src="lib/moment/moment.min.js"></script>
    <script src="lib/xls-js/xlsx.full.min.js"></script>
    <script src="bower_components/angular-swiper/dist/angular-swiper.js"></script>
    <script src="lib/slider/slider.min.js"></script>

    <!-- <script src="js/src/app.min.js"></script> -->

    <script src="js/config.js"></script>
    <script src="modules/_app/js/mainConfig.js"></script>
    <script src="modules/initial/js/initialController.js"></script>
    <script src="modules/home/js/homeController.js"></script>
    <script src="modules/menu/js/menuController.js"></script>
    <script src="modules/home/js/homeService.js"></script>
    <script src="modules/initial/js/initialService.js"></script>
    <script src="modules/_app/js/services/dbServerService.js"></script>
    <script src="modules/_app/js/services/appUrlsService.js"></script>
    <script src="modules/_app/js/services/dialogService.js"></script>
    <script src="modules/_app/js/services/errorRequestService.js"></script>
    <script src="modules/_app/js/services/msgsService.js"></script>
    <script src="modules/_app/js/services/mapsService.js"></script>
    <script src="modules/_app/js/services/sessionDataService.js"></script>
    <script src="modules/_app/js/services/timeService.js"></script>
    <script src="modules/_app/js/services/authService.js"></script>

    <!-- <link rel="stylesheet" type="text/css" href="lib/google/places/autocomplete.css">
    <script src="lib/google/places/autocomplete.js"></script> -->

    <div class="loading-main-div" ng-show="$root.showLoading">
        <div layout="column" class="loading-child-div" layout-sm="column" layout-align="center center">
            <md-progress-circular md-mode="indeterminate"></md-progress-circular>
        </div>
    </div>

</body>

</html>