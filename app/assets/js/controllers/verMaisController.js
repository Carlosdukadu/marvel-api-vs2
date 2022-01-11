angular.module('app')
    .controller('VerMaisCtrl', VerMaisController);

function VerMaisController(){
    var vm = this;
    vm.message = 'Bem vindos a pagina home';
}
