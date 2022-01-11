angular.module('app')
    .config(RouterConfig);

function RouterConfig($routeProvider){
    $routeProvider.when('/home', {
        templateUrl : 'app/views/home.html',
        controller: HomeController,
        controllerAs: 'homeCtrl'
    }).when('/herois', {
        templateUrl : 'app/views/herois.html',
        controller: HeroisController,
        controllerAs: 'heroisCtrl'
    }).when('/ver-mais', {
        templateUrl : 'app/views/informacoesDoHeroi.html',
        controller: VerMaisController,
        controllerAs: 'VerMaisCtrl'
    }).otherwise({
        redirectTo: '/home'
    });
}