class guideQueue {
    constructor(options = {}) {
        this.queueList = [];
        this.step = 0;
        this.guiderDom = null;
        this.coverDom = null;
        this.nextBtn = null;
        this.backBtn = null;
        this.playTicker = null;

        this.options = this.assignObj({}, options);
        let { autoPlay, autoPlay: { interval, loop, allowDisturb } } = options;
        this.autoPlay = autoPlay.interval || false;
        this.autoPlayInterval = interval || 0;
        this.autoPlayLoopTimes = loop || -1;
        this.autoPlayDisturb = allowDisturb || false;
    }

    init() {
        this.coverDom = this.createCover();
        document.body.appendChild(this.coverDom);
    }

    sub(task) {
        this.queueList.push(task);
    }

    mutilSub(tasks) {
        this.queueList = this.queueList.concat(tasks);
    }

    next(isUserClick = false) {
        this.disturbAutoPlay(isUserClick);
        if (this.step >= this.queueList.length - 1) {
            console.log('In terminal')
            this.destory();
            return;
        }
        this.step++;
        this.coverDom.innerHTML = '';
        this.play();
    }

    back(isUserClick = false) {
        this.disturbAutoPlay(isUserClick);
        if (this.step <= 0) {
            console.log('no way to back')
            return;
        }

        this.step--;
        this.coverDom.innerHTML = '';
        this.play();
    }

    play() {
        if (!this.coverDom) {
            this.init();
        }
        this.renderGuider();
    }

    renderGuider() {
        console.log('step:', this.step)
        let {
            targetEl,
            guideDom,
            position,
            nextEl,
            backEl,
            interval
        } = this.queueList[this.step];

        const el = document.querySelector(targetEl);
        if (!el) {
            console.log("target element isn't exist.")
            return;
        }

        // auto regist nextHandler when support `nextEl`
        this.nextBtn = guideDom.querySelector(nextEl || '.next');
        if (this.nextBtn && (!this.autoPlay || this.autoPlay && this.autoPlayDisturb)) {
            this.nextBtn.onclick = this.next.bind(this, true);
        }

        this.backBtn = guideDom.querySelector(backEl || '.back');
        if (this.backBtn && (!this.autoPlay || this.autoPlay && this.autoPlayDisturb)) {
            this.backBtn.onclick = this.back.bind(this, true);
        }

        const elRect = el.getBoundingClientRect();
        guideDom.style[position] = elRect[position] + 'px';
        guideDom.style.top = elRect.top + 'px';

        switch (position) {
            case 'right':
                guideDom.style.right = (document.body.clientWidth - elRect.left - elRect.width) + 'px';
                break;
            case 'left':
            case 'top':
            default:
                guideDom.style[position] = elRect[position] + 'px';
        }

        guideDom.style.display = 'block';
        this.coverDom.appendChild(guideDom);

        if (this.autoPlay) {
            let delay = interval || this.autoPlayInterval;
            this.playTicker = setTimeout(() => {
                this.next()
            }, delay);
        }
    }

    createCover() {
        let cover = document.createElement('div');
        let sty = {
            'z-index': '9999',
            'position': 'fixed',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'left': '0',
            'background': 'rgba(0,0,0,.7)',
            'color': 'white'
        }

        sty = this.assignObj(sty, this.options.coverStyle);
        console.log('final cover styles:', sty)
        for (const key in sty) {
            if (Object.hasOwnProperty.call(sty, key)) {
                const element = sty[key];
                cover.style[key] = element;
            }
        }
        return cover;
    }

    disturbAutoPlay(isUserClick = false) {
        if (this.autoPlay && this.autoPlayDisturb && isUserClick) {
            this.playTicker = null;
            this.autoPlay = false;
            this.autoPlayLoopTimes = 0;
        }
    }

    destory(cb) {
        if (this.autoPlay) {
            this.coverDom.innerHTML = '';
            console.log('destory looptimes', this.autoPlayLoopTimes)
            this.autoPlayLoopTimes--;
            if (this.autoPlayLoopTimes) {
                this.step = 0;
                this.play()
                return
            }
        }

        const { onFinished } = this.options;
        if (onFinished && typeof onFinished == 'function') {
            onFinished()
        }

        this.coverDom.parentNode.removeChild(this.coverDom);
        this.coverDom = null;
        this.queueList = [];
        this.nextBtn = null;
        this.backBtn = null;
        this.step = 0;
        this.autoPlay = false;
        this.autoPlayInterval = 0;
        this.playTicker = null;
    }

    assignObj(targetObj, injectObj) {
        let newObj = {}
        if (targetObj && Object.prototype.toString.call(targetObj) == '[object Object]') {
            newObj = Object.assign(newObj, targetObj)
        }
        if (injectObj && Object.prototype.toString.call(injectObj) == '[object Object]') {
            newObj = Object.assign(newObj, injectObj)
        }
        return newObj;
    }
}