module.exports = function( $child, $parent ){
	var parentWidth = $parent.width();
	var parentLeft = parseFloat( $parent.css('left') );

	var childWidth = $child.width();
	var childLeft = parentLeft + ( (parentWidth - childWidth) / 2 );

	$child.css({
		"left": childLeft + "px"
	});
}