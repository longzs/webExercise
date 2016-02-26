$(function() {
	var $overlayer = $(".overlayer"),
		$currFilter;
	$(".filter").on("touchend", function(event) {
		var $this = $(this);
		if ($currFilter && !$currFilter.is($this)) {
			$currFilter.removeClass("unfold");
			$currFilter = $this;
		}
		$this.toggleClass("unfold");
		var	bUnfold = $this.is(".unfold");
		$overlayer.toggle(bUnfold);
		$currFilter = bUnfold ? $this : null;
	});
});