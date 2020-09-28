let cube = document.querySelector('#cube');
//获取的是box的所有html元素
// 定义一个旋转初始量
let init = {
    x: 0,
    y: 0
}
let transformed = cube.style.transform;

PCMove();
MobileMove()

function MobileMove (){
    window.addEventListener('touchstart', (e) => {
        //按下的坐标
        let down = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        };
        if (transformed) {
            let array = transformed.split(' ');
            // 使用正则提取x,y的值
            let nowXY = {
                x: array[0].match(/rotateX\((.*)deg\)/)[1],
                y: array[1].match(/rotateY\((.*)deg\)/)[1] //表示查找rotateY(XXXdeg),(.*)表示查找“(”与“)deg”间的所有内容
            };
            init = {
                x: nowXY.x % 360,
                y: nowXY.y % 360
            };
        }

        let canMove = true;
        // 监听鼠标移动事件【拖拽】
        window.addEventListener('touchend', function () {
            canMove = false;
        });
        window.addEventListener('touchmove', (e) => {
            if (canMove) { // 如果canMove为真时，即表示move正常工作
                let move = {
                    x: e.touches[0].clientX,
                    y: e.touches[0].clientY
                }
                rotateXY(down, move);
            }
        })
    })

    function rotateXY(down, move) {
        let x = move.x - down.x, // x,y为偏移量，通过速度变量来控制偏移量即可
            y = move.y - down.y,
            speed = 0.5; // 速度控制器
        let result = {
            x: init.x - speed * y + 'deg',
            y: init.y + speed * x + 'deg'
        }
        console.log(result.x);
        console.log(result.y);
        cube.style.transform = `rotateX(${result.x}) rotateY(${result.y}) rotateZ(0deg) translate3d(38px, 0px, 200px)`
    }
}

// 鼠标拖拽包装
function PCMove() {
    // 监听鼠标左键点击事件【鼠标按下】
    //鼠标按下时触发e_down函数
    window.addEventListener('mousedown', (e) => {
        let down = {
            x: e.clientX,
            y: e.clientY
        };
        if (transformed) {
            let array = transformed.split(' ');
            // 使用正则提取x,y的值
            let nowXY = {
                x: array[0].match(/rotateX\((.*)deg\)/)[1],
                y: array[1].match(/rotateY\((.*)deg\)/)[1] //表示查找rotateY(XXXdeg),(.*)表示查找“(”与“)deg”间的所有内容
            };
            init = {
                x: nowXY.x % 360,
                y: nowXY.y % 360
            };
        }

        let canMove = true;
        // 监听鼠标移动事件【拖拽】
        window.addEventListener('mouseup', function () {
            canMove = false;
            console.log("鼠标已经抬起来啦！");
        });
        window.addEventListener('mousemove', (e) => {
            if (canMove) { // 如果canMove为真时，即表示move正常工作
                let move = {
                    x: e.clientX,
                    y: e.clientY
                }

                rotateXY(down, move);
            }
        })
    })

    function rotateXY(down, move) {
        let x = move.x - down.x, // x,y为偏移量，通过速度变量来控制偏移量即可
            y = move.y - down.y,
            speed = 0.5; // 速度控制器
        let result = {
            x: init.x - speed * y + 'deg',
            y: init.y + speed * x + 'deg'
        }

        cube.style.transform = `rotateX(${result.x}) rotateY(${result.y}) rotateZ(0deg) translate3d(38px, 0px, 200px)`
    }
}