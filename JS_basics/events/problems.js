// 1) implement function that:
//   > accepts 'n' callbacks
//   > calls each callback at some random point in time w/in 2 * n # of seconds
//   > log the elapsed time every second 1, 2, ... , 2 * n

function randomizer(...cbs) {
  if (cbs.length === 0) {
    return;
  }
  
  const maxTime = 2 * cbs.length;
  let timeElapsed = 0;
  
  const logger = setInterval(() => {
    timeElapsed += 1;
    console.log(timeElapsed);
    
    if (timeElapsed >= maxTime) {
      clearInterval(logger);
    }
  }, 1000);

  cbs.forEach(callback => {
    setTimeout(callback, randomDelay(maxTime));
  });
}

function randomDelay(maxDelay) {
  return Math.ceil(Math.random() * maxDelay) * 1000;
}

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);

// 2) refactor the given event listeners to maintain their behavior while
// removing the event.stopPropagation line
// given event listeners:
document.querySelector('html').addEventListener('click', () => {
  document.querySelector('#container').style = 'display: none';
});

document.querySelector('#container').addEventListener('click', event => {
  event.stopPropagation();
});

// notes:
// > if a nested element that's located w/in the element w/ the id 'container' or
//   the element that has the 'container' id is clicked then once the event reaches
//   the element w/ the id 'container' it's stopped from further propagating
//     <=> so, if the container element or one of its children is clicked
//     then the event listener on the html element will never be fired, because the
//     listener on the element with 'container' id is processed on the bubbling phase
//     and prevents propagation from continuing onto the event listener on <html> that
//     would assign/reassign the style attribute of the element with the 'container' id
//     and would essentially hide the container
// > if user clicks on any element outside of the container id, then the container element
//    will be hidden b/c the listener on the container element that stops propagation won't
//    be evaluated

// refactored:
// check if element user clicked on is the element with 'container' id or is one of the
//   children of the element w/ the 'container' id and if it's not then update the style
//   attribute on the element w/ the 'container' id to hide the element
document.querySelector('html').addEventListener('click', event => {
  let container = document.querySelector('#container');
  
  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});

// 3) implement a function that:
//   > bolds an element and accepts a 2nd optional argument that lets the user
//     do something w/ the element specified as the 1st argument
// ex of how function should work:
let sectionElement = document.querySelector('section');
makeBold(sectionElement, function(elem) {
  elem.classList.add('highlight');
});

sectionElement.classList.contains('highlight'); // true
sectionElement.style.fontWeight;  // "bold"

// definition:
function makeBold(el, callback) {
  el.style.fontWeight = 'bold';
  if (callback && typeof callback === 'function') {
    callback(el); 
  }
}

// 4) why does clicking the image still bring the user to another web page
// when there's an event.stopPropagation?
document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);

// given html:
//<a href="https://www.thisisnotanactualwebsite.com">
//  Home
//  <img src="thisisamadeupsrcattributeforanonexistentphoto"/>
//</a>

// notes:
// > event.stopPropagation() prevents the code from propagating further
// > when user clicks on the image that's part of the anchor element in the html, 
//    since the 3rd optional argument is set to false, the event listener will be
//    evaluated during the bubbling phase and when it's evalauted it will stop the
//    event from further propagating on the bubbling phase and visiting any parent
//    elements that are outside/parents of the anchor element; thus, event listeners
//    on any parents won't be evaluated
// > the default behavior occurs after propagation and it's not prevented/stopped
//    by event.stopPropagation
// > so, the web page will still open/follow through to the new page, because that's
//   the default behavior when the link / anchor element is clicked
// > if wanted to prevent the web page opening another web page, then should replace
//     event.Propagation with event.preventDefault() in the given event listener 

// 5) implement contextmenu event handlers that:
// > display single alert that specifies whether right clicked on the main
//     area or the sub area
// > so, if right click on the sub area, then an alert for main should not appear

// given html:
// <main>
//   Main Area
//   <section id="sub">
//    Sub Area
//   </section>
// </main>

// event handlers:
let main = document.querySelector('main');
let sub = document.querySelector('section');

main.addEventListener('contextmenu', event => {
  event.preventDefault();
  alert('Main');
});

sub.addEventListener('contextmenu', event => {
  event.preventDefault();
  event.stopPropagation();
  alert('Sub');
});
