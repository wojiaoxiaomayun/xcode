export default class ScrollTool {
    handleScroll = null;
    dom = document;
    useCapture = false;
    prevV = 0;
    prevH = 0;

    constructor(dom = document, useCapture = false) {
        if (dom) {
            this.dom = dom;
        }
        this.useCapture = useCapture;
    }

    // 支持横向滚动：将 scrollTop 改为 scrollLeft 或 scrollTop，根据需要选择
    toTop() {
        this.dom.scrollLeft = 0; // 滚动到最左边
    }

    // 统一处理横向、纵向滚动
    init(callBack = () => { }) {
        this.handleScroll = (event) => {
            // 获取滚动位置，区分横向和纵向
            let scrollPositionH = this.dom.scrollLeft;
            let scrollPositionV = this.dom.scrollTop;
            let scrollPosition = 0;
            let scrollType = 'horizontal';
            let isBottom = false;
            if(scrollPositionH != this.prevH){
                scrollType = 'horizontal'
                isBottom = (this.dom.scrollLeft + this.dom.clientWidth) >= this.dom.scrollWidth; // 横向滚动判断
                scrollPosition = scrollPositionH;
                this.prevH = scrollPositionH;
            }
            if(scrollPositionV != this.prevV){
                scrollType = 'vertical'
                isBottom = (this.dom.scrollTop + this.dom.clientHeight) >= this.dom.scrollHeight;
                scrollPosition = scrollPositionV;
                this.prevV = scrollPositionV;
            }

            callBack && callBack.apply(this.dom, [scrollPosition, isBottom, scrollType, event]);
        }
        this.dom.addEventListener('scroll', this.handleScroll, this.useCapture);
    }

    destroy() {
        this.dom.removeEventListener('scroll', this.handleScroll, this.useCapture);
    }
}