// ==UserScript==
// @name        eBay-Review-PreFill
// @namespace   ebay
// @description Pre-fill eBay review form with all-positive values
// @include     http://feedback.ebay.com/ws/eBayISAPI.dll?LeaveFeedback2*
// @version     1
// @grant       none
// ==/UserScript==

((window, undefined) => {
	window = (typeof unsafeWindow !== 'undefined') ? unsafeWindow : window;
	var w = window;
	if(w.self !== w.top) return; // don't run in frames
	if(!/^http:\/\/feedback.ebay.com\/ws\/eBayISAPI.dll\?LeaveFeedback2/.test(w.location.href)) return; // duplicate "include" checking which often doesn't work

	// click "positive" checkbox for all items on the page
	w.document.querySelectorAll('input[type=radio][value=positive]').forEach(pos => pos.click());

	// set "all-five-stars"
	var starspans = w.document.querySelectorAll('span[style="cursor: pointer"]');
	starspans.forEach(span => {
		// click last child which is the "most-positive" one
		span.lastElementChild.click();
	});

	// and finally focus the first comment entry field
	// (FIXME doesn't work for some reason)
	var entry = w.document.getElementById('comment00')
	console.log(entry);
	entry.focus();
})(window);
