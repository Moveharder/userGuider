# userGuider
New user guide plugin use in web page.

# Usage
```
// your guiders HTML may like this.

<div class="guider g1">
    <p>step1 hi,我移动到这里了！</p>
    <button class="nextbtn">下一步</button>
</div>

<div class="guider g2">
    <p>step2 hi,我移动到这里了！</p>
    <button class="nextbtn" onclick="guider.next()">下一步</button>
</div>

<div class="guider g3">
    <p>step3 hi,我移动到这里了！</p>
    <button class="nextbtn">完成</button>
</div>

// your JS may like this.

let guider = new guideQueue();

// add guiders
guider.sub({
    targetEl: '.dashboard', //targe and exist element to add a guider (.xxx or #xxx)
    position: 'left', //in which position above the target element
    guideDom: document.querySelector('.g1'), //prepare the guider element
    nextEl: '.nextbtn', // if not support this, use guider.next() to handle next move 
})
guider.sub({
    targetEl: '.safe_center',
    position: 'left',
    guideDom: document.querySelector('.g2'),
    // nextEl: '.nextbtn'
})
guider.sub({
    targetEl: '#gotop',
    position: 'right',
    guideDom: document.querySelector('.g3'),
    nextEl: '.nextbtn'
})

guider.play();
```

# Todo
### multiple position
### use custom cover
### ...
