class guideQueue {
    constructor() {
        this.queueList = [];
        this.guiderDom = null;
        this.coverDom = null;
    }

    init() {
        this.coverDom = this.createCover();
        document.body.appendChild(this.coverDom);
    }

    sub(task) {
        this.queueList.push(task);
    }

    next() {
        if (this.queueList.length <= 1) {
            console.log('went terminal')
            this.destory();
            return;
        }
        this.queueList.splice(0, 1);
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
        let {
            targetEl,
            guideDom,
            position,
            nextEl
        } = this.queueList[0];
        const el = document.querySelector(targetEl);
        if (!el) {
            console.log('目标元素不存在')
            return;
        }

        // auto regist nextHandler when support `nextEl`
        const nextBtn = guideDom.querySelector(nextEl || '.next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.next()
            }, true)
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
            'background': 'rgba(0,0,0,.7)',
            'color': 'white'
        }
        for (const key in sty) {
            if (Object.hasOwnProperty.call(sty, key)) {
                const element = sty[key];
                cover.style[key] = element
            }
        }
        return cover;
    }

    destory() {
        this.coverDom.parentNode.removeChild(this.coverDom);
        this.coverDom = null;
        this.queueList = [];
    }
}