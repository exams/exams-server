(function () {
  'use strict';

  describe('Papers Route Tests', function () {
    // Initialize global variables
    var $scope,
      PapersService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _PapersService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      PapersService = _PapersService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('papers');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/papers');
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
          PapersController,
          mockPaper;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('papers.view');
          $templateCache.put('modules/papers/client/views/view-paper.client.view.html', '');

          // create mock Paper
          mockPaper = new PapersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Paper Name'
          });

          // Initialize Controller
          PapersController = $controller('PapersController as vm', {
            $scope: $scope,
            paperResolve: mockPaper
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:paperId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.paperResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            paperId: 1
          })).toEqual('/papers/1');
        }));

        it('should attach an Paper to the controller scope', function () {
          expect($scope.vm.paper._id).toBe(mockPaper._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/papers/client/views/view-paper.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          PapersController,
          mockPaper;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('papers.create');
          $templateCache.put('modules/papers/client/views/form-paper.client.view.html', '');

          // create mock Paper
          mockPaper = new PapersService();

          // Initialize Controller
          PapersController = $controller('PapersController as vm', {
            $scope: $scope,
            paperResolve: mockPaper
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.paperResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/papers/create');
        }));

        it('should attach an Paper to the controller scope', function () {
          expect($scope.vm.paper._id).toBe(mockPaper._id);
          expect($scope.vm.paper._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/papers/client/views/form-paper.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          PapersController,
          mockPaper;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('papers.edit');
          $templateCache.put('modules/papers/client/views/form-paper.client.view.html', '');

          // create mock Paper
          mockPaper = new PapersService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Paper Name'
          });

          // Initialize Controller
          PapersController = $controller('PapersController as vm', {
            $scope: $scope,
            paperResolve: mockPaper
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:paperId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.paperResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            paperId: 1
          })).toEqual('/papers/1/edit');
        }));

        it('should attach an Paper to the controller scope', function () {
          expect($scope.vm.paper._id).toBe(mockPaper._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/papers/client/views/form-paper.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
