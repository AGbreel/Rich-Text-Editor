// ! COMMENTS
// ? COMMENTS
// TODO COMMENTS
// * COMMENTS
// COMMENTS
let x = 10 // Pressing ctrl + alt + L 
console.log("🚀 ~ x:", x)
// ! ==============================
// ! ==============================

let optionButtons = document.querySelectorAll('.option-button');
let advancedOptionButtons = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('textInput');
let linkButton = document.getElementById('createLink');

let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

let fontList = [
    'Arial',
    'Verdana',
    'Times New Roman',
    'Garamond',
    'Georgia',
    'Courier New',
    'Cursive',
];

// ! Initial Settings
const initializer = () => {
    // ?  function calls for highlighting buttons
    // ? no highlighting for link, unlink, list, undo, redo
    // since they are one time operations. 
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // ! Font Names
    craeteOptionToFontNames();
    // ! Font Size
    craeteOptionToFontSize();
}


// ! Highlighter
const highlighter = (className, needsRemoval) => {
    className.forEach(button => {
        button.addEventListener('click', () => {
           if(needsRemoval) {
               let alreadyActive = false;

               if(button.classList.contains('active')) {
                   alreadyActive = true;
               }

               highlighterRemover(className);
               if(!alreadyActive) {
                button.classList.add('active');
               }
           } else {
            button.classList.toggle('active');
           }
        });
    });
}


// ! Highlighter Remover
const highlighterRemover = (className) => {
    className.forEach(button => {
        button.classList.remove('active');
    });
}

// todo create option for font names
const craeteOptionToFontNames = () => {
    fontList.map(font => {
        let option = document.createElement('option');
        option.value = font;
        option.innerHTML = font;
        fontName.appendChild(option);
    });
}

// todo create option for font size
const craeteOptionToFontSize = () => {
    for(let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    // ! default size
    fontSizeRef.value = 3;
}

// ! Main Logic
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
}

optionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        modifyText(button.id, false, null);
    })    
});

advancedOptionButtons.forEach(button => {
    button.addEventListener('change', (e) => {
        console.log(button.id, '  ' ,button.value);
        modifyText(button.id, false, button.value);
    })    
});

linkButton.addEventListener('click', (e) => {
    let userLink = prompt("Enter a URL");
    if(/http/i.test(userLink)) {
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = `http://${userLink}`;
        modifyText(linkButton.id, false, userLink);
    }
});

window.onload = initializer();