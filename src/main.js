window.onload=()=>{
    alert('请使用chrome浏览器打开')
}

let cube = document.querySelector('#cube');
// 定义一个旋转初始量
let init = {
    x: 0,
    y: 0
}
const isMobile = (function () {
    return !!navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
})();

function rotateXY(down, move) {
    let x = move.x - down.x, // x,y为偏移量，通过速度变量来控制偏移量即可
        y = move.y - down.y,
        speed = 0.5; // 速度控制器
    let result = {
        x: init.x - speed * y + 'deg',
        y: init.y + speed * x + 'deg'
    }
    let mobile3d = 'translate3d(19px, 0px, 100px)'
    let pc3d = 'translate3d(38px, 0px, 200px)'
    cube.style.transform = `rotateX(${result.x}) rotateY(${result.y}) rotateZ(0deg) ${isMobile ? mobile3d : pc3d}`

}

function isTransFormed() {
    let transformed = cube.style.transform;
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
}

function Move() {
    window.addEventListener(isMobile ? 'touchstart' : 'mousedown', (e) => {
        //按下的坐标
        let down = {}
        if (isMobile) {
            down.x = e.touches[0].clientX
            down.y = e.touches[0].clientY
        } else {
            down.x = e.clientX
            down.y = e.clientY
        }
        let canMove = true;
        isTransFormed()
        // 监听鼠标移动事件【拖拽】
        window.addEventListener(isMobile ? 'touchend' : 'mouseup', function () {
            canMove = false;
        })
        window.addEventListener(isMobile ? 'touchmove' : 'mousemove', (e) => {
            if (canMove) { // 如果canMove为真时，即表示move正常工作
                let move = {}
                if (isMobile) {
                    move.x = e.touches[0].clientX
                    move.y = e.touches[0].clientY
                } else {
                    move.x = e.clientX
                    move.y = e.clientY
                }
                rotateXY(down, move);
            }
        })
    })
}

Move()