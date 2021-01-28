class guideQueue {
    constructor(options = {}) {
        this.queueList = [];
        this.guiderDom = null;
        this.coverDom = null;
        this.nextBtn = null;
        this.backBtn = null;
        this.step = 0;
        this.playTicker = null;

        const { autoPlay, autoPlay: { interval, loop } } = options;
        this.autoPlay = autoPlay || false;
        this.autoPlayInterval = interval || 0;
        this.autoPlayLoopTimes = loop || -1;
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

    next() {
        if (this.step >= this.queueList.length - 1) {
            console.log('In terminal')
            this.destory();
            return;
        }
        this.step++;
        this.coverDom.innerHTML = '';
        this.play();
    }

    back() {
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
        if (this.nextBtn) {
            this.nextBtn.onclick = this.next.bind(this);
        }

        this.backBtn = guideDom.querySelector(backEl || '.back');
        if (this.backBtn) {
            this.backBtn.onclick = this.back.bind(this);
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
        const sty = {
            'z-index': '9999',
            'position': 'fixed',
            'top': '0',
            'right': '0',
            'bottom': '0',
            'left': '0',
            'background': 'rgba(0,0,0,.1)',
            'color': 'white'
        }
        for (const key in sty) {
            if (Object.hasOwnProperty.call(sty, key)) {
                const element = sty[key];
                cover.style[key] = element;
            }
        }
        return cover;
    }

    destory() {
        if (this.autoPlay) {
            console.log('destory looptimes', this.autoPlayLoopTimes)
            this.autoPlayLoopTimes--;
            if (this.autoPlayLoopTimes) {
                this.step = 0;
                this.play()
                return
            }
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
}