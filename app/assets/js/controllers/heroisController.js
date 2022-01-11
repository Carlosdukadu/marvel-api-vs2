angular.module('app')
    .controller('heroisCtrl', HeroisController);

function HeroisController(){
    var vm = this;
    vm.message = 'Bem vindos a pagina herois';
}