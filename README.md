# userGuider
New user guide plugin use in web page. Totally DIY your guide content.
[Online Demo](https://moveharder.github.io/userGuider/)

# Features
Easy | Configurable | Customize

# Methods & Params
```
    interface autoPlayInterface {
        interval: Number; // auto play interval time (ms)
        loop?: Number; //loop times 0-N 0 means no loop
        allowDisturb?: Boolean, //is allow user disturb auto paly status. if set true, after user click next/back, the autoplay will be closed.
    }

    interface guiderOptions {
        autoPlay?: autoPlayInterface; // what kind playing status would you like 
        coverStyle?: Object; // customize background cover styles
        onFinished?: Function; // on finished callback function
    }

    interface guideContent {
        targetEl: String; // targe element of add a guider (`.el` or`#el` are both ok.)
        position: String; // in which position above the target element
        guideDom: [DOM String]; // prepare the guider element
        backEl?: String; // if not support this, use guider.back() to handle back move 
        nextEl?: String; // if not support this, use guider.next() to handle next move 
    }

    let guider = new guiderQuene(guiderOptions); // instantiate

    guider.mutilSub(guideContent); // batch subscription guide content
    guider.sub(guideContent); // single subscription guide content
    guider.back(); // play previous
    guider.next(); // play next
    guider.play(); // start playing guide contents
    guider.destory(); // destroy guider instance and exit guide page

```

# Usage
```
// your prepared guiders HTMLs may like this.

<div class="guider g1">
    <p>step1 hi,我移动到这里了！</p>
    <button class="next">下一步</button>
</div>

<div class="guider g2">
    <p>step2 hi,我移动到这里了！</p>
    <button class="back">上一步</button>
    <button class="next">下一步</button>
</div>

<div class="guider g3">
    <p>step3 hi,我移动到这里了！</p>
    <button class="back">上一步</button>
    <button class="next">完成</button>
</div>

// your JS may like this.

let guider = new guideQueue({
    autoPlay: {
        interval: 1000, 
        allowDisturb: false, 
        loop: 2, 
    },
    coverStyle: {
        'font-size': '20px'
    },
    onFinished: ()=>{
        console.log('finished')
    }
});

// add guiders on batch way
const tasks = [{
    targetEl: '.dashboard', //targe element of add a guider
    position: 'left', //in which position above the target element
    guideDom: document.querySelector('.g1'), //prepare the guider element
    backEl: '.back', // if not support this, use guider.back() to handle back move 
    nextEl: '.next', // if not support this, use guider.next() to handle next move 
    interval: 1000, // if support this, it can replace this.autoPlay.interval
}, {
    targetEl: '.safe_center',
    position: 'left',
    guideDom: document.querySelector('.g2'),
    backEl: '.back',
    nextEl: '.next',
}];

guider.mutilSub(tasks); // batch subscription guide content

// add guider on single way
guider.sub({
    targetEl: '#gotop', //targe and exist element to add a guider (.xxx or #xxx)
    position: 'right', //in which position above the target element
    guideDom: document.querySelector('.g3'), //prepare the guider element
    nextEl: '.nextbtn', // if not support this, use guider.next() to handle next move 
})

guider.play();

// you can call guider.destory() to exit guidpage earlier
```

# Todo
### multiple position ✅
### use customize backgroundcover ✅
### back page function ✅
### support auto play ✅
### on finished callback ✅
### support customize styles
## supoort scoped style area
