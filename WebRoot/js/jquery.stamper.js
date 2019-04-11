/*
 * Title：在网页上模拟现实中的盖章效果的JQuery插件
 * Author：铁木箱子
 * Email：biqiang.ma@gmail.com
 * Version：0.2
 * 
 */
(function($) {
	$.fn.stamper = function(options) {
		var opts = $.extend({
			scale : 2, // 图片初始大小，在原始图片大小上的倍数
			speed : 300, // 动画持续时间，单位毫秒
			iwidth : 200,
			iheight : 100
		}, options);

		this.each(function(index) {
			var target = $(this);
			var imgId = target.attr("data-stamper-img-id");
			if (!imgId) {
				imgId = "jquery_stamper_img_1";
				target.attr("data-stamper-img-id", imgId);
			}
			var img = new Image();
			img.src = opts.image;
			img.onload = function() {
				var orgiCoor = getImageCoordinate(target, img,opts);
				var initCoor = getStartCoordinate(target, img, opts.scale,opts);
				var imgObj = getImageElement(imgId).attr("src", img.src)
					.css({
						position : "absolute",
						opacity : "0",
						left : initCoor.x + "px",
						top : initCoor.y + "px",
						width : initCoor.w + "px",
						height : initCoor.h + "px"
					})
					.show()
					.animate({
						opacity : "1",
						left : orgiCoor.x + "px",
						top : orgiCoor.y + "px",
						width : orgiCoor.w + "px",
						height : orgiCoor.h + "px"
					}, opts.speed, opts.complete);
			};
		});
	};

	/** 获取img的DOM对象 **/
	function getImageElement(id) {
		var img = $("#" + id);
		if (img.length == 0) {
			return $("<img id=\"" + id + "\" />").appendTo($(document.body)).hide();
		} else {
			return img.hide();
		}
	}

	/** 获取图片的落脚坐标点（以当前元素为基准）和尺寸信息，格式：{x:10,y:20,h:100,w:200} **/
	function getImageCoordinate(target, image, opts) {
		var offset = $(target).offset();
		var cx = offset.left + $(target).width() / 2;
		var cy = offset.top + $(target).height() / 2;
		return {
			x : cx - opts.iwidth / 2,
			y : cy - opts.iheight / 2,
			w : opts.iwidth,
			h : opts.iheight
		};
	}

	/** 给定倍数（multiple）获取图片的开始位置和大小信息，格式：{x:10,y:20,h:100,w:200} **/
	function getStartCoordinate(target, image, multiple,opts) {
		var offset = $(target).offset();
		var cx = offset.left + $(target).width() / 2;
		var cy = offset.top + $(target).height() / 2;
		var width = opts.iwidth * multiple;
		var height = opts.iheight * multiple;
		return {
			x : cx - width / 2,
			y : cy - height / 2,
			w : width,
			h : height
		};
	}
})(jQuery);