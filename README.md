# userGuider
New user guide plugin use in web page.

# Methods
```
    interface guideContent {
        targetEl: String; //targe element of add a guider (`.el` or`#el` are both ok.)
        position: String; //in which position above the target element
        guideDom: DOM String; //prepare the guider element
        backEl?: String; // if not support this, use guider.back() to handle back move 
        nextEl?: String; // if not support this, use guider.next() to handle next move 
    }

    guider.mutilSub([...]); //batch subscription guide content
    guider.sub([...]); //single subscription guide content
    guider.back(); //play previous
    guider.next(); //play next
    guider.play(); //start playing guide contents
    guider.destory(); //destroy guider instance and exit guide page

```

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

// you can call guider.destory() to exit guidpage earlier
```

# Todo
### multiple position ✅
### use customize back cover
### back page function ✅
### support customize styles
### support auto play
