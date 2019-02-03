(function () {
  'use strict';

  describe('Papars Route Tests', function () {
    // Initialize global variables
    var $scope,
      PaparsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PaparsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PaparsService = _PaparsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('papars');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/papars');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          PaparsController,
          mockPapar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('papars.view');
          $templateCache.put('modules/papars/client/views/view-papar.client.view.html', '');

          // create mock Papar
          mockPapar = new PaparsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Papar Name'
          });

          // Initialize Controller
          PaparsController = $controller('PaparsController as vm', {
            $scope: $scope,
            paparResolve: mockPapar
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:paparId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.paparResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            paparId: 1
          })).toEqual('/papars/1');
        }));

        it('should attach an Papar to the controller scope', function () {
          expect($scope.vm.papar._id).toBe(mockPapar._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/papars/client/views/view-papar.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PaparsController,
          mockPapar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('papars.create');
          $templateCache.put('modules/papars/client/views/form-papar.client.view.html', '');

          // create mock Papar
          mockPapar = new PaparsService();

          // Initialize Controller
          PaparsController = $controller('PaparsController as vm', {
            $scope: $scope,
            paparResolve: mockPapar
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.paparResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/papars/create');
        }));

        it('should attach an Papar to the controller scope', function () {
          expect($scope.vm.papar._id).toBe(mockPapar._id);
          expect($scope.vm.papar._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/papars/client/views/form-papar.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PaparsController,
          mockPapar;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('papars.edit');
          $templateCache.put('modules/papars/client/views/form-papar.client.view.html', '');

          // create mock Papar
          mockPapar = new PaparsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Papar Name'
          });

          // Initialize Controller
          PaparsController = $controller('PaparsController as vm', {
            $scope: $scope,
            paparResolve: mockPapar
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:paparId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.paparResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            paparId: 1
          })).toEqual('/papars/1/edit');
        }));

        it('should attach an Papar to the controller scope', function () {
          expect($scope.vm.papar._id).toBe(mockPapar._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/papars/client/views/form-papar.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
