for (event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
    window.addEventListener(event_name, function(event) {
        event.stopImmediatePropagation();
    }, true);
}

function createFloatingWindow() {
    //get from local storage
    let isHidden = window.localStorage.getItem('isHidden') === 'true';
    let floatingWindow = document.createElement('div');
    floatingWindow.id = 'floating-window';
    floatingWindow.style.position = 'fixed';
    floatingWindow.style.bottom = '0';
    floatingWindow.style.right = '0';
    floatingWindow.style.width = '300px';
    floatingWindow.style.height = '150px';
    floatingWindow.style.backgroundColor = 'rgb(197,197,197)';
    floatingWindow.style.zIndex = '9999';
    floatingWindow.style.overflow = 'hidden';
    floatingWindow.style.display = 'flex';
    floatingWindow.style.flexDirection = 'column';
    floatingWindow.style.alignItems = 'center';
    floatingWindow.style.borderRadius = '10px 10px 10px 10px';
    floatingWindow.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    floatingWindow.style.justifyContent = 'center';
    if(isHidden){
        floatingWindow.style.display = 'none';
    }

    let minimizeButton = document.createElement('button');
    minimizeButton.id = 'minimize-button';
    minimizeButton.style.position = 'absolute';
    minimizeButton.style.top = '0';
    minimizeButton.style.marginTop = '5px';
    minimizeButton.style.marginRight = '5px';
    minimizeButton.style.right = '0';
    minimizeButton.style.width = '30px';
    minimizeButton.style.height = '30px';
    minimizeButton.style.backgroundColor = 'rgb(233,76,136, 0)';
    minimizeButton.style.color = 'white';
    minimizeButton.style.zIndex = '9999';
    minimizeButton.style.overflow = 'hidden';
    minimizeButton.style.display = 'flex';
    minimizeButton.style.flexDirection = 'column';
    minimizeButton.style.alignItems = 'center';
    minimizeButton.style.borderRadius = '100%';
    minimizeButton.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
    minimizeButton.style.justifyContent = 'center';
    minimizeButton.style.border = 'none';
    minimizeButton.style.outline = 'none';
    minimizeButton.style.cursor = 'pointer';
    minimizeButton.innerText = '-';
    minimizeButton.style.color = 'black';
    minimizeButton.style.fontFamily = 'Arial, Helvetica, sans-serif';
    minimizeButton.style.fontSize = '20px';

    minimizeButton.addEventListener('click', () => {
        floatingWindow.style.display = 'none';
        window.localStorage.setItem('isHidden', true);
        showButton.style.display = 'flex';
    }
    );

    let showButton = document.createElement('button');
    showButton.id = 'show-button';
    showButton.style.position = 'absolute';
    showButton.style.top = '0';
    showButton.style.cursor = 'pointer';
    showButton.style.marginTop = '5px';
    showButton.style.marginRight = '5px';
    showButton.style.color = 'rgb(255,255,255)';
    showButton.style.backgroundColor = 'rgb(233,76,136, 0)';
    showButton.style.borderRadius = '8px';
    showButton.style.borderStyle = 'none';
    showButton.style.zIndex = '9999';
    showButton.style.overflow = 'hidden';
    showButton.style.display = 'flex';
    showButton.innerText = 'Show';
    if(!isHidden){
        showButton.style.display = 'none';
    }
    showButton.addEventListener('click', () => {
        floatingWindow.style.display = 'flex';
        window.localStorage.setItem('isHidden', false);
        showButton.style.display = 'none';
    }
    );

    document.body.appendChild(showButton);
    floatingWindow.appendChild(minimizeButton);

    let titleText = document.createElement('p');
    titleText.id = 'Test helper';
    titleText.style.color = 'white';
    titleText.style.textAlign = 'center';
    titleText.style.fontSize = '20px';
    titleText.style.fontWeight = 'bold';
    titleText.style.margin = '0';
    titleText.innerText = 'Test helper';
    titleText.style.color = 'black';
    titleText.style.fontFamily = 'Arial, Helvetica, sans-serif';
    titleText.style.position = 'absolute';
    titleText.style.top = '0';
    titleText.style.paddingTop = '10px';
    titleText.style.userSelect = 'none';

    floatingWindow.appendChild(titleText);

    let secondsAfterStop = document.createElement('p');
    secondsAfterStop.id = 'secondsAfterStop';
    secondsAfterStop.style.color = 'white';
    secondsAfterStop.style.fontSize = '15px';
    secondsAfterStop.style.fontWeight = 'bold';
    secondsAfterStop.style.margin = '0';
    secondsAfterStop.style.color = 'black';
    secondsAfterStop.style.fontFamily = 'Arial, Helvetica, sans-serif';
    secondsAfterStop.style.top = '0';
    secondsAfterStop.style.userSelect = 'none';

    floatingWindow.appendChild(secondsAfterStop);

    let qestNum = document.createElement('p');
    qestNum.id = 'qestNum';
    qestNum.style.color = 'white';
    qestNum.style.fontSize = '15px';
    qestNum.style.fontWeight = 'bold';
    qestNum.style.margin = '0';
    qestNum.style.color = 'black';
    qestNum.style.fontFamily = 'Arial, Helvetica, sans-serif';
    qestNum.style.top = '0';
    qestNum.style.userSelect = 'none';
    qestNum.innerText = "Qestion number: " + getNumQestion()

    floatingWindow.appendChild(qestNum);

    try {
        window.go = function () {
            addNum()
            qestNum.innerText = "Question number: " + getNumQestion();
            document.getElementById('answ').submit();
        }
    } catch (e) {
        console.error(e);
    }



    let buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.marginTop = '10px'; // Adjust the margin as needed

    let button1 = createButton('Reset', () => {
        resetNumQestion()
    });

    let button2 = createButton('Stop timer', () => {
        stopTime()
    });

    let button3 = createButton('Add num', () => {
            addNum();
            qestNum.innerText = "Question number: " + getNumQestion();
        }
    );

    buttonsContainer.appendChild(button1);
    buttonsContainer.appendChild(button2);
    buttonsContainer.appendChild(button3);


    floatingWindow.appendChild(buttonsContainer);
    makeDraggable(floatingWindow);

    document.body.appendChild(floatingWindow);
}

function createButton(text, onClick) {
    let button = document.createElement('button');
    button.style.backgroundColor = '#EA4C89';
    button.style.borderRadius = '8px';
    button.style.borderStyle = 'none';
    button.style.boxSizing = 'border-box';
    button.style.color = '#FFFFFF';
    button.style.cursor = 'pointer';
    button.style.fontFamily = '"Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif';
    button.style.fontSize = '14px';
    button.style.fontWeight = '500';
    button.style.height = '40px';
    button.style.lineHeight = '20px';
    button.style.listStyle = 'none';
    button.style.margin = '0';
    button.style.outline = 'none';
    button.style.padding = '10px 16px';
    button.style.position = 'relative';
    button.style.textAlign = 'center';
    button.style.textDecoration = 'none';
    button.style.transition = 'color 100ms';
    button.style.verticalAlign = 'baseline';
    button.style.userSelect = 'none';
    button.style.webkitUserSelect = 'none';
    button.style.touchAction = 'manipulation';
    button.style.margin = "5px";

    button.innerText = text;

    button.addEventListener('click', onClick);
    return button;
}

function saveOffset(offsetX, offsetY) {
    window.localStorage.setItem('offsetX', offsetX);
    window.localStorage.setItem('offsetY', offsetY);
}
function initOffset(element) {
    let offsetX = parseFloat(window.localStorage.getItem('offsetX')) || 0;
    let offsetY = parseFloat(window.localStorage.getItem('offsetY')) || 0;

    let x = (offsetX / 100 * window.innerWidth);
    let y = (offsetY / 100 * window.innerHeight);

    // Ensure the element stays within the screen boundaries
    x = Math.min(Math.max(x, 0), window.innerWidth - element.offsetWidth);
    y = Math.min(Math.max(y, 0), window.innerHeight - element.offsetHeight);

    element.style.left = x + 'px';
    element.style.top = y + 'px';
}


function makeDraggable(element) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    initOffset(element);

    window.addEventListener('resize', () => {
        initOffset(element);
    }
    );

    element.addEventListener('mousedown', (event) => {
        isDragging = true;
        offsetX = (event.clientX - element.getBoundingClientRect().left) / window.innerWidth * 100;
        offsetY = (event.clientY - element.getBoundingClientRect().top) / window.innerHeight * 100;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            let x = (event.clientX - offsetX / 100 * window.innerWidth);
            let y = (event.clientY - offsetY / 100 * window.innerHeight);

            // Ensure the element stays within the screen boundaries
            x = Math.min(Math.max(x, 0), window.innerWidth - element.offsetWidth);
            y = Math.min(Math.max(y, 0), window.innerHeight - element.offsetHeight);

            element.style.left = x + 'px';
            element.style.top = y + 'px';
            saveOffset(x/window.innerWidth*100, y/window.innerHeight*100)
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

}



function stopTime() {
    window.SecondPast = null
    startTime()
}

function startTime() {
    let secondsAfterStoped = 0
    setInterval(function () {
        secondsAfterStoped++
        document.getElementById("secondsAfterStop").innerText = "Seconds after stop: " + secondsAfterStoped + "s"
    }, 1000)
}

function getTestCode() {
    let testCode = document.getElementsByName("test_code")[0]
    if(testCode == null){
        return "test_code"
    }
    return testCode.value
}
function getNumQestion() {
    let numQestion = window.localStorage.getItem(getTestCode())
    if (numQestion == null) {
        numQestion = 1
    }
    return parseInt(numQestion)
}

function addNum() {
    window.localStorage.setItem(getTestCode(), getNumQestion() + 1)
}

function resetNumQestion() {
    window.localStorage.removeItem(getTestCode())
    document.getElementById('qestNum').innerText = "Question number: " + getNumQestion()
}


createFloatingWindow();
