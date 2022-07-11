// 整个案例可以分为三个功能模块
// 1.鼠标经过小图片盒子， 黄色的遮挡层 和 大图片盒子显示，离开隐藏2个盒子功能
// 2.黄色的遮挡层跟随鼠标功能。 
// 3.移动黄色遮挡层，大图片跟随移动功能。

// 鼠标经过小图片盒子， 黄色的遮挡层 和 大图片盒子显示，离开隐藏2个盒子功能
// 1.就是显示与隐藏

// 黄色的遮挡层跟随鼠标功能。
// 1.把鼠标坐标给遮挡层不合适。 因为遮挡层坐标以父盒子为准。
// 2.首先是获得鼠标在盒子的坐标。
// 3.之后把数值给遮挡层做为left 和top值。
// 4.此时用到鼠标移动事件， 但是还是在小图片盒子内移动。
// 5.发现， 遮挡层位置不对， 需要再减去盒子自身高度和宽度的一半。
// 6.遮挡层不能超出小图片盒子范围。
// 7.如果小于零， 就把坐标设置为0
// 8.如果大于遮挡层最大的移动距离， 就把坐标设置为最大的移动距离
// 9.遮挡层的最大移动距离： 小图片盒子宽度 减去 遮挡层盒子宽度

// 移动黄色小盒子，大图片跟着一起走
// 遮挡层移动距离/遮挡层最大移动距离=大图片移动距离/大图片最大移动距离

window.addEventListener('load', function() {
    var preview_img = document.querySelector('.preview_img');
    var mask = this.document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1.当我们的鼠标结果preview_img就显示和隐藏mask遮挡层和big大盒子
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';

    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove', function(e) {
        // 1.先算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // 2.让鼠标在遮罩中间  -遮罩宽高的一半
        // 3.mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 4.如果xy坐标小于等于0，就让它停在0的位置
        var maskMax = this.offsetWidth - mask.offsetWidth;
        if (maskX <= 0) {
            maskX = 0;
        }
        if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        }
        if (maskY >= maskMax) {
            maskY = maskMax;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';
        // 大图
        var bigImg = document.querySelector('.bigImg');
        // 大图最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离 x y
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';

    })
})