// h1.title
let title = document.createElement('h1');
title.setAttribute('class', 'title');
title.innerHTML = 'Virtual Keyboard';
document.body.appendChild(title);

// hr
let hr = document.createElement('hr');
document.body.appendChild(hr);

// div.wrapper
let wrapper = document.createElement('div');
wrapper.setAttribute('class', 'wrapper');
wrapper.setAttribute('id', 'wrapper')
document.body.appendChild(wrapper);

// div.feature-wrap
let featureWrap = document.createElement('div');
featureWrap.setAttribute('class', 'feature-wrap');
wrapper.appendChild(featureWrap);

// h3
let featuresTitle = document.createElement('h3');
featuresTitle.innerHTML = 'Features';
featureWrap.appendChild(featuresTitle);

// div.features
let features = document.createElement('div');
features.setAttribute('class', 'features');
featureWrap.appendChild(features);

// ul
let ul = document.createElement('ul');
features.appendChild(ul);

// li
let li1 = document.createElement('li');
let li2 = document.createElement('li');
let li3 = document.createElement('li');

li1.innerHTML = `Supported languages: <strong class="coloring">English</strong> & <strong class="coloring">Georgian`;

li2.innerHTML = `Based on the <strong>Windows</strong> keyboard`;

li3.innerHTML = `To change the language press <strong>Ctrl + Shift</strong>`;

ul.appendChild(li1);
ul.appendChild(li2);
ul.appendChild(li3);

// textarea.text-area
// let textArea = document.createElement('textarea');
// textArea.setAttribute('class', 'text-area');

// textArea.innerHTML = '';
// wrapper.appendChild(textArea);
