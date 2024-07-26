angular.module('myapp', ['ngRoute'])
    .run(function ($rootScope, $timeout) {
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function () {
            $timeout(function () {
                $rootScope.loading = false;
            }, 1000);
        });
        $rootScope.$on('$routeChangeError', function () {
            $rootScope.loading = false;
            alert('Lỗi Rồi');
        });
    })
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                controller: 'homeCtrl'
            })
            .when('/aside', {
                templateUrl: 'aside.html',
                controller: 'asideCtrl'
            })
            .when('/giohang', {
                templateUrl: 'giohang.html',
                controller: 'giohangCtrl'
            })
            .when('/chitietsanpham', {
                templateUrl: 'chitietsanpham.html',
                controller: 'chitietsanphamCtrl'
            })
            .when('/non34', {
                templateUrl: 'non34.html',
                controller: 'non34Ctrl'
            })
            .when('/non12', {
                templateUrl: 'non12.html',
                controller: 'non12Ctrl'
            })
            .when('/nonfullface', {
                templateUrl: 'nonfullface.html',
                controller: 'nonfullfaceCtrl'
            })
            .when('/gangtay', {
                templateUrl: 'gangtay.html',
                controller: 'gangtayCtrl'
            })
            .when('/kinhgannon', {
                templateUrl: 'kinhgannon.html',
                controller: 'kinhgannonCtrl'
            })

            .when('/lienhe', {
                templateUrl: 'lienhe.html',
                controller: 'lienheCtrl',

            })
            .when('/admin', {
                templateUrl: 'admin.html',
                controller: 'adminCtrl',

            })
            .when('/dangki', {
                templateUrl: 'dangki.html',
                controller: 'dangkiCtrl',

            })
            .when('/dangnhap', {
                templateUrl: 'dangnhap.html',
                controller: 'dangnhapCtrl',

            })
            .when('/chitietsanpham/:masp', {
                templateUrl: 'chitietsanpham.html',
                controller: 'chitietsanphamCtrl'
            })
            .otherwise({
                templateUrl: 'home.html'
            })
    })
    .controller("myctrl", function ($scope, $http) {
        $scope.dssp = [];
        $http.get('data1.json').then(
            function (res) {//tải thành công
                $scope.dssp = res.data;
                console.log(typeof $scope.dssp);
            },
            function (res) {//tải thất bại
                alert('lỗi rồi');
            }
        )

    })
    .controller("adminCtrl", function ($scope, $http) {
        $scope.dssp = [];
        
        $http.get('http://localhost:3000/products').then(
            function (res) {//tải thành công
                $scope.dssp = res.data;
                console.log(typeof $scope.dssp);
            },
            function (res) {//tải thất bại
                alert('lỗi rồi');


            })
            $scope.loadData = function () {
                $scope.dssp = [];
                $http.get('http://localhost:3000/products').then(function(res){
                   $scope.dssp = res.data;
  
                })
                
            }

            $scope.deletesp = function (id) {
                $http.delete("http://localhost:3000/products/" + id).then(function (res) {
                $scope.loadData();
                });
                };
                $scope.updateU = function () {
                    console.log($scope.esp);
                    // if ($scope.eForm.$valid) {
                    $http.put("http://localhost:3000/products/" + $scope.esp.id, $scope.esp)
                    .then(function (res) {
                    $scope.loadData();
                    }); 
                    // }
                    };
                    

                    $scope.editsp = function (sp) {
                        $scope.esp = sp;
                        };
              
                        $scope.addproducts = function () {
                          
                            $http.post("http://localhost:3000/products", $scope.esp)
                            .then(function (res) {
                            $scope.loadData();
                            });
                            
                            };

    })
    .controller('chitietsanphamCtrl', function ($scope, $routeParams) {
        $scope.id = $routeParams.masp;
        $scope.sp = {};
        for (var sp of $scope.dssp) {
            if (sp.id == $scope.id) {
                $scope.sp = sp;
                break;
            }
        }
    })

    .controller('giohangCtrl', function ($scope, $rootScope) {
        $scope.removeItem = function (index) {
            $rootScope.cart.splice(index, 1);
        };
        $scope.incrementQuantity = function (item) {
            item.quantity++;
            calculateTotal();
        };

        $scope.decrementQuantity = function (item) {
            if (item.quantity > 1) {
                item.quantity--;
                calculateTotal();
            }
        };

        function calculateTotal() {
            $rootScope.totalAmount = 0;
            for (var i = 0; i < $rootScope.cart.length; i++) {
                $rootScope.totalAmount += $rootScope.cart[i].quantity * $rootScope.cart[i].price;
            }
        }
        $scope.removeItem = function (index) {
            $rootScope.cart.splice(index, 1);
           
            calculateTotal(); // Tính toán lại tổng sau khi loại bỏ một mặt hàng
            alert('Bạn muốn xoá phẩm phẩm này')
        }
        $scope.incrementQuantity = function (item) {
            item.quantity++;
            calculateTotal(); // Tính toán lại tổng sau khi tăng số lượng
        }
        $scope.decrementQuantity = function (item) {
            if (item.quantity > 1) {
                item.quantity--;
                calculateTotal(); // Tính toán lại tổng sau khi giảm số lượng
            }
        }
    })

    .controller('homeCtrl', function ($scope, $interval, $rootScope) {
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('non34Ctrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id": 341,
                "name": "Nón 3/4 Joyce Trắng",
                "price": 450000,
                "img": "img/341.webp"
            },

            {
                "id": 342,
                "name": "Nón 3/4 MASIA",
                "price": 430000,
                "img": "img/342.webp"
            },

            {
                "id": 343,
                "name": "Nón KYT SaKuRa",
                "price": 420000,
                "img": "img/343.webp"
            },

            {
                "id": 344,
                "name": "Nón 3/4 Royal",
                "price": 550000,
                "img": "img/344.webp"
            },

            {
                "id": 345,
                "name": "Nón 3/4 LAVA Xanh",
                "price": 650000,
                "img": "img/345.webp"
            },

            {
                "id": 346,
                "name": "Nón 3/4 LAVA Hồng",
                "price": 350000,
                "img": "img/346.webp"
            },

            {
                "id": 347,
                "name": "Nón Royal LAVA Trắng",
                "price": 950000,
                "img": "img/347.webp"
            },

            {
                "id": 348,
                "name": "Nón 3/4 Sundan 388",
                "price": 850000,
                "img": "img/348.webp"
            },

            {
                "id": 349,
                "name": "Nón Fullface YoHe",
                "price": 530000,
                "img": "img/349.webp"
            },
            {
                "id": 3410,
                "name": "Nón 3/4 Đầu ",
                "price": 634000,
                "img": "img/340.webp"
            },
            {
                "id": 3411,
                "name": "Nón  3/4 EGO",
                "price": 479000,
                "img": "img/3401.webp"
            },
            {
                "id": 3412,
                "name": "Nón 3/4 YoHe 858 ",
                "price": 483000,
                "img": "img/3402.webp"
            },
            {
                "id": 3413,
                "name": "Nón 3/4 ROC ",
                "price": 483000,
                "img": "img/3403.webp"
            },
            {
                "id": 3414,
                "name": "Nón 3/4 Trắng ",
                "price": 483000,
                "img": "img/3404.webp"
            },
            {
                "id": 3415,
                "name": "Nón 3/4 EGO ",
                "price": 483000,
                "img": "img/3405.webp"
            },
            {
                "id": 3416,
                "name": "Nón 3/4 KYT VeNom",
                "price": 483000,
                "img": "img/3406.webp"
            }
        ];


        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;

        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('nonfullfaceCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id": "ff01",
                "img": "img/ff1.webp",
                "name": "Nón FullFace Rog 05",
                "price": 2000000

            },
            {
                "id": "ff02",
                "img": "img/ff2.webp",
                "name": "Nón FullFace Rog 05 V6",
                "price": 2500000

            },
            {
                "id": "ff03",
                "img": "img/ff3.webp",
                "name": "Nón FullFace Rog Đen ",
                "price": 2600000

            },
            {
                "id": "ff04",
                "img": "img/ff4.webp",
                "name": "Nón FullFace LS 2",
                "price": 2080000

            },
            {
                "id": "ff05",
                "img": "img/ff5.webp",
                "name": "Nón FullFace Rog 06",
                "price": 2750000

            },
            {
                "id": "ff06",
                "img": "img/ff6.webp",
                "name": "Nón FullFace LS3",
                "price": 2090000

            },
            {
                "id": "ff07",
                "img": "img/ff7.webp",
                "name": "Nón FullFace FF800",
                "price": 2002000

            },
            {
                "id": "ff08",
                "img": "img/ff8.webp",
                "name": "Nón FullFace FS05",
                "price": 2760000

            },
            {
                "id": "ff09",
                "img": "img/ff16.webp",
                "name": "Nón FullFace TORC T18",
                "price": 2080000

            },
            {
                "id": "ff10",
                "img": "img/ff17.webp",
                "name": "Nón FullFace YOHE 978",
                "price": 3000000

            },

            {
                "id": "ff11",
                "img": "img/ff18.webp",
                "name": "Nón FullFace Sundal ",
                "price": 2220000

            },
            {
                "id": "ff12",
                "img": "img/ff12.webp",
                "name": "Nón FullFace Rog 01 TRC",
                "price": 2230000

            },
            {
                "id": "ff13",
                "img": "img/ff13.webp",
                "name": "Nón FullFace LEOPARD",
                "price": 2100000

            },
            {
                "id": "ff14",
                "img": "img/ff14.webp",
                "name": "Nón FullFace Rog FF353",
                "price": 4500000

            },
            {
                "id": "ff15",
                "img": "img/ff15.webp",
                "name": "Nón FullFace Đen Xanh",
                "price": 3506000

            },
            {
                "id": "ff16",
                "img": "img/b12.webp",
                "name": "Nón FullFace Rog 05",
                "price": 2150000
            },
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('non12Ctrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id": "1201",
                "img": "img/121.webp",
                "name": "Nón Xe Đạp Zeus",
                "price": 330000
            },
            {
                "id": "1202",
                "img": "img/122.webp",
                "name": "Nón 1/2 Susan",
                "price": 350000
            },
            {
                "id": "1203",
                "img": "img/123.webp",
                "name": "Nón xe đạp Royal",
                "price": 335000
            },
            {
                "id": "1204",
                "img": "img/124.webp",
                "name": "Nón Pog Có Kính",
                "price": 430000
            },
            {
                "id": "1205",
                "img": "img/125.webp",
                "name": "Nón POG thể thao",
                "price": 530000
            },
            {
                "id": "1206",
                "img": "img/126.webp",
                "name": "Nón 1/2 Falcon Xám",
                "price": 630000
            }, {
                "id": "1207",
                "img": "img/127.webp",
                "name": "Nón Falcon hồng",
                "price": 730000
            },
            {
                "id": "1208",
                "img": "img/128.webp",
                "name": "Nón 1/2 Napoli",
                "price": 830000
            },
            {
                "id": "1209",
                "img": "img/129.webp",
                "name": "Nón 1/2 Asia",
                "price": 930000
            },
            {
                "id": "1210",
                "img": "img/130.webp",
                "name": "Nón Pog Thể Thao ",
                "price": 1330000
            },
            {
                "id": "1211",
                "img": "img/131.webp",
                "name": "Nón Thể Thao Xe Đạp",
                "price": 435000
            },
            {
                "id": "1212",
                "img": "img/132.webp",
                "name": "Nón Mỏ Quạ POG",
                "price": 332000
            },
            {
                "id": "1213",
                "img": "img/133.webp",
                "name": "Nón Pog Có Kính",
                "price": 766000
            },
            {
                "id": "1214",
                "img": "img/134.webp",
                "name": "Nón POG Tím",
                "price": 899000
            },
            {
                "id": "1215",
                "img": "img/135.webp",
                "name": "Nón thể thao Respol",
                "price": 756000
            },
            {
                "id": "1216",
                "img": "img/136.webp",
                "name": "Nón 1/2 Napoly Xanh",
                "price": 981000
            },

        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('kinhgannonCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id": "k01",
                "img": "img/k1.webp",
                "name": "Kính MSD",
                "price": 210000
               
            },
            {
                "id": "k02",
                "img": "img/k2.webp",
                "name": "Kính GOGGLES ",
                "price": 215000
               
            },
            {
                "id": "k03",
                "img": "img/k3.webp",
                "name": "Kính 3/4 Ego",
                "price": 220000
               
            },
            {
                "id": "k04",
                "img": "img/k4.webp",
                "name": "Kính BEON 7 Màu",
                "price": 230000
               
            },
            {
                "id": "k05",
                "img": "img/k5.webp",
                "name": "Kính EGO E7",
                "price": 240000
               
            },
            {
                "id": "k06",
                "img": "img/k6.webp",
                "name": "Kính E-7 Đen",
                "price": 250000
               
            },
            {
                "id": "k07",
                "img": "img/k7.webp",
                "name": "Kính E7 Trong",
                "price": 260000
               
            },
            {
                "id": "k08",
                "img": "img/k8.webp",
                "name": "Kính Bulldog Trong",
                "price": 270000
               
            },
            {
                "id": "k09",
                "img": "img/k9.webp",
                "name": "Kính Bulldog Đen",
                "price": 280000
               
            },
            {
                "id": "k010",
                "img": "img/k10.webp",
                "name": "Kính Tráng Gương",
                "price": 290000
               
            },
            {
                "id": "k011",
                "img": "img/k11.webp",
                "name": "Kính 7 Màu",
                "price": 215000
               
            },
            {
                "id": "k012",
                "img": "img/k12.webp",
                "name": "Kính Tráng Bạc",
                "price": 225000
               
            },
            {
                "id": "k013",
                "img": "img/k13.webp",
                "name": "Kính T18 NANO",
                "price": 255000
               
            },
            {
                "id": "k014",
                "img": "img/k14.webp",
                "name": "Kính Nửa Mặt ",
                "price": 295000
               
            },
            {
                "id": "k015",
                "img": "img/k15.webp",
                "name": "Kính TORC Bạc",
                "price": 287000
               
            },
            {
                "id": "k016",
                "img": "img/k16.webp",
                "name": "Kính TORC Đen",
                "price": 206000
               
            },
              
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })
    .controller('gangtayCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id": "g01",
                "img": "img/g1.webp",
                "name": "Găng Tay Mechanix",
                "price": 100000
                
            },
            {
                "id": "g02",
                "img": "img/g2.webp",
                "name": "Găng Tay impact",
                "price": 110000
                
            },
            {
                "id": "g03",
                "img": "img/g3.webp",
                "name": "Găng Tay Suonme ",
                "price": 120000
                
            },
            {
                "id": "g04",
                "img": "img/g4.webp",
                "name": "Găng Tay Cụt ",
                "price": 125000
                
            },
            {
                "id": "g05",
                "img": "img/g5.webp",
                "name": "Găng Tay SWAT",
                "price": 127000
                
            },
            {
                "id": "g06",
                "img": "img/g6.webp",
                "name": "Găng Tay VEMAR",
                "price": 123000
                
            },
            {
                "id": "g07",
                "img": "img/g7.webp",
                "name": "Găng Tay VEMARTITAN",
                "price": 155000
                
            },
            {
                "id": "g08",
                "img": "img/g8.webp",
                "name": "Găng Tay SCOYCO",
                "price": 162000
                
            },
            {
                "id": "g09",
                "img": "img/g9.webp",
                "name": "Găng Tay SCY MC29D",
                "price": 170000
                
            },
            {
                "id": "g10",
                "img": "img/g10.webp",
                "name": "Găng Tay Bike",
                "price": 189000
                
            },
            {
                "id": "g11",
                "img": "img/g11.webp",
                "name": "Găng Tay PRO-BIKER",
                "price": 176000
                
            },
            {
                "id": "g12",
                "img": "img/g12.webp",
                "name": "Găng Tay SSPEC dài",
                "price": 145000
                
            },
            {
                "id": "g13",
                "img": "img/g13.webp",
                "name": "Găng Tay Chiến Thuật",
                "price": 134000
                
            },
            {
                "id": "g14",
                "img": "img/g14.webp",
                "name": "Găng Tay MSD",
                "price": 132000
                
            },
            {
                "id": "g15",
                "img": "img/g15.webp",
                "name": "Găng Tay Thẻ Thao",
                "price": 156000
                
            },
            {
                "id": "g16",
                "img": "img/g16.webp",
                "name": "Găng Tay Bảo Hộ ",
                "price": 145000
                
            },

            
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })

    .controller('mohinhnarutoCtrl', function ($scope, $interval, $rootScope) {
        $scope.dssp = [
            {
                "id": "Naruto 01",
                "img": "TaiNguyen/naruto/naruto (1).webp",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Itachi Susano",
                "price": 2100000
            },
            {
                "id": "Naruto 02",
                "img": "TaiNguyen/naruto/naruto (2).webp",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Sasuke Saringan",
                "price": 3200000
            },
            {
                "id": "Naruto 03",
                "img": "TaiNguyen/naruto/naruto (3).webp",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Minato Rasengan",
                "price": 5400000
            },
            {
                "id": "Naruto 04",
                "img": "TaiNguyen/naruto/naruto (4).webp",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Naruto Làng Lá",
                "price": 6700000
            },
            {
                "id": "Naruto 05",
                "img": "TaiNguyen/naruto/naruto (5).webp",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Sakura Rìu Chiến",
                "price": 6700000
            },
            {
                "id": "Naruto 06",
                "img": "TaiNguyen/naruto/naruto (6).webp",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Deidara Akatsuki",
                "price": 7600000
            },
            {
                "id": "Naruto 07",
                "img": "TaiNguyen/naruto/naruto (7).jpg",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Naruto Phân Thân",
                "price": 3400000
            },
            {
                "id": "Naruto 08",
                "img": "TaiNguyen/naruto/naruto (8).jpg",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Sakura Rìu Chiến V2",
                "price": 2300000
            },
            {
                "id": "Naruto 09",
                "img": "TaiNguyen/naruto/naruto (9).jpg",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Tia Chớp Vàng ",
                "price": 2300000
            },
            {
                "id": "Naruto 10",
                "img": "TaiNguyen/naruto/naruto (10).jpg",
                "chitietsp": "Mô hình Lyffi thức tỉnh dạng nika siêu đẹp siêu cấp",
                "name": "Namikaze Minato",
                "price": 2200000
            }
        ];
        $interval(function () {
            $scope.now = new Date();
        }, 1000);
        $scope.page = 1;
        $scope.limit = 8;
        // Trang 1: start = 0
        // Trang 2: start = 4
        // Trang 3: start = 8
        // Trang 1: start = (n-1)*4
        $scope.start = ($scope.page - 1) * $scope.limit;
        $scope.tongTrang = Math.ceil($scope.dssp.length / $scope.limit);//$scope.dssp:Tổng số sản Phẩm ||  $scope.limit: Số sản phẩm Mỗi Trang
        $scope.dsTrang = [];
        for (var i = 1; i <= $scope.tongTrang; i++) {
            $scope.dsTrang.push(i);
        }
        $scope.chontrang = function (trang) {
            $scope.page = trang;
            $scope.start = ($scope.page - 1) * $scope.limit;
        };


        $rootScope.cart = [];
        $rootScope.addToCart = function (sp) {
            var inCart = false;
            //sp đã có trong cart -> tăng số lượng 
            for (var i = 0; i < $rootScope.cart.length; i++) {
                if ($rootScope.cart[i].id == sp.id) {
                    console.log($rootScope.cart[i].id, sp.id)
                    inCart = true;
                    $rootScope.cart[i].quantity++;
                    break;
                }
            }
            //sp chưa có trong cart -> thêm vào với số lượng là 1
            if (!inCart) {
                sp.quantity = 1;
                $rootScope.cart.push(sp);;
            }
            console.log($rootScope.cart);
        }


    })





