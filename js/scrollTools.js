/*
Scroll detection tools by https://github.com/rgon
*/

function detectScroll(elem, callBack=undefined, threshold=1, callbackAtStart=true) { // threshold: percentage of the element that has to be scrolled past
    if (elem) {
        const observer = new IntersectionObserver(
            ([e]) => {
                console.log(e.target.getBoundingClientRect().y, e.target.innerHTML)
                // If we don't check here, elements intersecting with the bottom of the screen will also trigger the observer
                if (e.target.getBoundingClientRect().y <= -2) {
                    if (callBack) callBack(Object.assign(e, {'scrolled': true}))
                } else if (e.target.getBoundingClientRect().y >= 2) {
                    if (callBack) callBack(Object.assign(e, {'scrolled': false}))
                }
            },
            {threshold: [threshold]}
            );
        
        // Check now if the element is scrolled by (on load): prevents href="#"/coming dack to the tab bug
        if (elem.getBoundingClientRect().y <= 0 && callbackAtStart) {
            if (callBack) callBack({target: elem})
        }
    
        observer.observe(elem)
    }
}