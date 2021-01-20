# userGuider
New user guide plugin use in web page.

# Usage
```
let guider = new guideQueue();

// add guiders
guider.sub({
    targetEl: '.dashboard', //targe element of add a guider
    position: 'left', //in which position above the target element
    guideDom: document.querySelector('.g1'), //prepare the guider element
})
guider.sub({
    targetEl: '.safe_center',
    position: 'left',
    guideDom: document.querySelector('.g2'),
})
guider.sub({
    targetEl: '#gotop',
    position: 'right',
    guideDom: document.querySelector('.g3'),
})

guider.play();
```

# Todo
### multiple position
### use custom cover
### ...
