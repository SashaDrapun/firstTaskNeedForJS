const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');

car.classList.add('car');

start.addEventListener('click', startGame);

document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};

const settings = {
    start: false,
    score: 0,
    speed: 15,
    traffic: 2
};

function getQuantityElements(heigthElement){
    return (document.documentElement.clientHeight / heigthElement) + 1;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function startGame() {
    start.classList.add('hide');
    start.style.display = 'none';

    for (let i = 0; i < getQuantityElements(100); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = i * 100 + 'px';
        line.y = i * 100;
        gameArea.appendChild(line);
    }

    for(let i = 0; i < getQuantityElements(100*settings.traffic)-1; i++){
        console.log(getQuantityElements(100*settings.traffic));
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -100 * settings.traffic * (i+1);
        enemy.style.top = enemy.y+'px';
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.background = 'transparent url(\'./image/' + 
        getRandomIntInclusive(0,2) +
         '.png\') center / cover no-repeat';
        gameArea.appendChild(enemy);
    }

    settings.start = true;
    gameArea.appendChild(car);
    settings.x = car.offsetLeft;
    settings.y = car.offsetTop;
    if (settings.start) {
        requestAnimationFrame(playGame);
    }
}

function playGame() {
    moveRoad();
    moveEnemy();
    if (settings.start) {
        if (keys.ArrowLeft && settings.x > 0) {
            settings.x -= settings.speed;
        }
        if (keys.ArrowRight && settings.x < (gameArea.offsetWidth - car.offsetWidth)) {
            settings.x += settings.speed;
        }
        if (keys.ArrowUp && settings.y > 0) {
            settings.y -= settings.speed;
        }

        if (keys.ArrowDown && settings.y < (gameArea.offsetHeight - car.offsetHeight)) {
            settings.y += settings.speed;
        }
        car.style.left = settings.x + 'px';
        car.style.top = settings.y + 'px';
        requestAnimationFrame(playGame);
    }

}

function moveRoad() {
    let lines = document.querySelectorAll('.line');

    lines.forEach(function (line) {
            line.y += settings.speed;
           if(line.y >= document.documentElement.clientHeight){
               line.y = -100;
           } 
            line.style.top = line.y + 'px';
        });
}

function moveEnemy(){
    let enemies = document.querySelectorAll('.enemy');

    enemies.forEach(function (item){
    item.y += settings.speed / 2;
    item.style.top = item.y + 'px';

    if(item.y>= document.documentElement.clientHeight){
        item.y = -100 * settings.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        item.style.background = 'transparent url(\'./image/' + 
        getRandomIntInclusive(0,2) +
        '.png\') center / cover no-repeat';
    }
    
    });

    
}


function startRun(event) {
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun() {
    keys[event.key] = false;
    event.preventDefault();
}