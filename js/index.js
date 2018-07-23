// 初始化一个4x4的二维数组
let arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]
let btn = document.querySelector("#btns")
let box = document.querySelector("#wrapper");
let restar = document.querySelector("#newGame");
let overWrapper = document.querySelector("#over");
//生成一个随机数（0-3）
function createRand() {
    return Math.floor(Math.random() * 4);
}

// 初始化界面
function init() {
    let i1 = createRand();
    let j1 = createRand();
    let i2 = createRand();
    let j2 = createRand();
    arr = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    arr[i1][j1] = Math.random() > 0.5 ? 4 : 2;
    arr[i2][j2] = Math.random() > 0.5 ? 4 : 2;
    overWrapper.style.display = "none";
    createDom();
}
init();

// 根据arr数组创建DOM
function createDom() {
    box.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            let div = document.createElement("div");
            div.classList.add("cell");
            if (arr[i][j] != 0) {
                div.innerHTML = arr[i][j];
                switch (arr[i][j]) {
                    case 2:
                        div.classList.add("_2");
                        break;
                    case 4:
                        div.classList.add("_4");
                        break;
                    case 8:
                        div.classList.add("_8");
                        break;
                    case 16:
                        div.classList.add("_16");
                        break;
                    case 32:
                        div.classList.add("_32");
                        break;
                    case 64:
                        div.classList.add("_64");
                        break;
                    case 128:
                        div.classList.add("_128")
                        break;
                    case 256:
                        div.classList.add("_256");
                        break;
                    case 512:
                        div.classList.add("_512");
                        break;
                    case 1024:
                        div.classList.add("_1024");
                        break;
                    case 2048:
                        div.classList.add("_2048");
                        break;
                    case 4096:
                        div.classList.add("_64");
                        break;
                    case 8192:
                        div.classList.add("_32")
                        break;
                    case 16384:
                        div.classList.add("_16");
                        break;
                    default:
                        div.classList.add("_64");
                }
            }
            box.appendChild(div);
        }
    }
}
// 空白处随机添加一个数字2或者4
function addNumber() {
    let i = createRand();
    let j = createRand();
    if (arr[i][j] == 0) {
        arr[i][j] = Math.random() > 0.5 ? 4 : 2;
        // box.innerHTML = ""
        createDom();
        gameOver();
        console.log(arr);
    } else {
        addNumber();
    }
}

// 判断游戏是否结束
function gameOver() {
    let m = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == 0) {
                m += 1;
                break;
            }
            if (arr[i][j + 1]) {
                if (arr[i][j] == arr[i][j + 1]) {
                    m += 1;
                    break;
                }
            }
            if (arr[i + 1]) {
                if (arr[i][j] == arr[i + 1][j]) {
                    m += 1;
                    break;
                }
            }
        }
    }
    if (m === 0) {
        overWrapper.style.display = "block";
    }
}

function moveLeft() {
    let str = arr.toString();
    for (let i = 0; i < arr.length; i++) {
        let arr1 = arr[i].filter((item) => {
            return (item != 0);
        })
        let arr0 = arr[i].filter((item) => {
            return (item == 0);
        })
        arr[i] = [...arr1, ...arr0]
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j] == arr[i][j + 1]) {
                arr[i][j] += arr[i][j + 1]
                arr[i][j + 1] = 0;
                arr[i].push(arr[i].splice(j + 1, 1)[0])
            }
        }
    }
    if (str != arr.toString()) {
        addNumber();
    }
}

function moveRight() {
    let str = arr.toString();
    for (let i = 0; i < arr.length; i++) {
        let arr1 = arr[i].filter((item) => {
            return (item != 0);
        });
        let arr0 = arr[i].filter((item) => {
            return (item == 0);
        });
        arr[i] = [...arr0, ...arr1];
        for (let j = arr[i].length; j > 0; j--) {
            if (arr[i][j] == arr[i][j - 1]) {
                arr[i][j] += arr[i][j - 1];
                arr[i][j - 1] = 0;
                arr[i].unshift(arr[i].splice(j - 1, 1)[0]);
            }
        }
    }
    if (str != arr.toString()) {
        addNumber();
    }
}

function moveUp() {
    let str = arr.toString();
    for (let j = 0; j < arr[0].length; j++) {
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][j] != 0) {
                tempArr.push(arr[i][j]);
                arr[i][j] = 0;
            }
        }
        for (let k = 0; k < tempArr.length; k++) {
            if (tempArr[k] == tempArr[k + 1]) {
                tempArr[k] += tempArr[k + 1];
                tempArr[k + 1] = 0;
                tempArr.push(tempArr.splice(k + 1, 1)[0]);
            }
            arr[k][j] = tempArr[k];
        }
    }
    if (str != arr.toString()) {
        addNumber();
    }
}

function moveDown() {
    let str = arr.toString();
    for (let j = 0; j < arr[0].length; j++) {
        let tempArr = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][j] != 0) {
                tempArr.push(arr[i][j]);
                arr[i][j] = 0;
            }
        }
        for (let k = tempArr.length - 1, i = arr.length - 1; k >= 0; k--, i--) {
            if (tempArr[k] == tempArr[k - 1]) {
                tempArr[k] += tempArr[k - 1];
                tempArr[k - 1] = 0;
                tempArr.unshift(tempArr.splice(k - 1, 1)[0]);
            }
            arr[i][j] = tempArr[k];
        }
    }
    if (str != arr.toString()) {
        addNumber();
    }
}
btn.addEventListener("click", function (e) {
    e = event || window.event;
    let target = e.target || e.srcElement;
    switch (target.id) {
        case "up":
            moveUp();
            break;
        case "down":
            moveDown();
            break;
        case "left":
            moveLeft();
            break;
        case "right":
            moveRight();
            break;
    }

});
window.addEventListener("keydown", function (e) {
    e = event || window.event;
    switch (e.keyCode) {
        case 37:
            moveLeft();
            break;
        case 38:
            moveUp();
            break;
        case 39:
            moveRight();
            break;
        case 40:
            moveDown();
    }
});
// 移动端滑动事件
window.addEventListener("touch",function(e){
    e.preventDefault();
});
$("#wrapper").swipeLeft(function () {
    moveLeft();
});
$("#wrapper").swipeRight(function () {
    moveRight();
});
$("#wrapper").swipeUp(function () {
    moveUp();
});
$("#wrapper").swipeDown(function () {
    moveDown();
});
restar.onclick = init;