angular.module("app").controller("marvelApiCtrl", function($scope, $http, $filter) {

    // Arrys utilizados nas funções
    $scope.itensQuadrinhos = []
    $scope.quadrinhosArray = []
    $scope.quadrinhosInfo = []
    $scope.listaHerois = []

    $scope.imagePath = 'assets/angular-material-assets/img/washedout.png';
    $scope.heroiId;
    $scope.mostrarLimparQuadrinhos = false
    $scope.naoEncontrado = true
    $scope.app = "Marvel Api";

    time = $filter('date')(new Date(), "MMM/dd/yyyy HH:mm:ss");

    $scope.pesquisarHeroi = function(heroi) {

        $scope.limparQuadrinhos()
        
        if (heroi == undefined) return

        heroiName = heroi;
        const apiKey = 'e310420c2c151aed139b9a85d557f030';
        const hash = '02c521fce1d75358d86df112cc3fed32 ';
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?';

        $http({
            url: baseUrl,
            method: 'GET',
            params: {
                name: heroiName,
                apikey: apiKey,
                hash: hash,
            }
        }).then(function(response) {

            if (response.data.data.total) {} else {
                $scope.naoEncontrado = false;
            }
            response.data.data.results.forEach((element) => {

                element.id != $scope.heroiId ? $scope.limparQuadrinhos() : '';

                $scope.heroiId = element.id
                $scope.naoEncontrado = true;
                $scope.heroiName = element.name
                $scope.heroiDesc = element.description

                if (element.thumbnail.path != 'IMAGE_NOT_AVAIL' & element.thumbnail.extension != 'IMAGE_NOT_AVAIL') {
                    $scope.heroiImg = element.thumbnail.path + '/portrait_xlarge' + '.' + element.thumbnail.extension
                } else { $scope.heroiImg = false }

            })

        }, function(err) {
            console.log(err);
        });
    };

    $scope.pesquisarListaHeroi = function(heroi) {

        const apiKey = 'e310420c2c151aed139b9a85d557f030';
        const hash = '02c521fce1d75358d86df112cc3fed32 ';
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters?';

        $http({
            url: baseUrl,
            method: 'GET',
            params: {
                apikey: apiKey,
                hash: hash,
            }
        }).then(function(response) {

            if (response.data.data.total) {} else {
                $scope.naoEncontrado = false;
            }
            response.data.data.results.forEach((element) => {

                $scope.quadrinhoImg = element.thumbnail
                $scope.quadrinhoImg = { img: $scope.quadrinhoImg.path + '/portrait_xlarge' + '.' + $scope.quadrinhoImg.extension, title: element.title }
                $scope.quadrinhosInfo.push($scope.quadrinhoImg)
                
                $scope.quadrinhoImg = element.thumbnail
                $scope.quadrinhoImg = { img: $scope.quadrinhoImg.path + '/portrait_xlarge' + '.' + $scope.quadrinhoImg.extension, name: element.name, id: element.id }
                $scope.listaHerois.push($scope.quadrinhoImg)


            })

        }, function(err) {
            console.log(err);
        });
    };

    $scope.init = $scope.pesquisarListaHeroi();



    $scope.pesquisarQuadrinhos = function(quadrinhos) {
        console.log(quadrinhos, '----chamou pesquisarQuadrinhos----');

        const apiKey = '?apikey=e310420c2c151aed139b9a85d557f030';
        const hash = '&hash=c68771660709d8e5655903aba47eab3cedef9768';
        const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters/';
        if (quadrinhos != undefined){
            $scope.heroiId = quadrinhos
        }
        $http.get(baseUrl + $scope.heroiId + apiKey + hash)
            .then(function(response) {

                response.data.data.total ? '' : $scope.naoEncontrado = false;

                response.data.data.results.forEach((element) => {
                    $scope.itensQuadrinhos.push(element)
                    $scope._quadrinhos = element
                    $scope.naoEncontrado = true;
                    $scope.mostrarLimparQuadrinhos = true;
                    $scope.quadrinhoDesc = element.description
                })

            }, function(err) {
                console.log(err);
            });

        $http.get(baseUrl + $scope.heroiId + '/comics' + apiKey + hash)
            .then((response) => {

                response.data.data.results.forEach((element) => {

                    $scope.quadrinhoImg = element.thumbnail
                    $scope.quadrinhoImg = { img: $scope.quadrinhoImg.path + '/portrait_xlarge' + '.' + $scope.quadrinhoImg.extension, title: element.title }
                    $scope.quadrinhosInfo.push($scope.quadrinhoImg)

                })
            }, err => {
                console.log(err);
            })

    };

    $scope.limparInput = function(heroi) {
        console.log(heroi, '----LIMPARiNPUT---');
        heroi == undefined ? '':  heroi.nome = null

        // heroi.nome = null
        $scope.heroiImg = null
        $scope.heroiName = null
        $scope.heroiDesc = null
        $scope.naoEncontrado = true;
        $scope.mostrarLimparQuadrinhos = false
        $scope.quadrinhosInfo = []
    }
    $scope.limparQuadrinhos = function() {
        console.log( '----limpou---');

        $scope.mostrarLimparQuadrinhos = false
        $scope.quadrinhosInfo = []
        $scope.heroiImg = null
        $scope.heroiName = null
    }

});