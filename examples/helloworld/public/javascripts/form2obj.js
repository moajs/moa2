function form2obj(form) {
  var body = Object.create(null);
  var proto = Element.prototype;
  var vendor = proto.matches
    || proto.matchesSelector
    || proto.webkitMatchesSelector
    || proto.mozMatchesSelector
    || proto.msMatchesSelector
    || proto.oMatchesSelector;
 
  /**
   * Match `el` to `selector`.
   *
   * @param {Element} el
   * @param {String} selector
   * @return {Boolean}
   * @api public
   */
  
  function matches(el, selector) {
    if (vendor) return vendor.call(el, selector);
    var nodes = el.parentNode.querySelectorAll(selector);
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i] == el) return true;
    }
    return false;
  }

  Array.prototype.slice.call(form.querySelectorAll('input, textarea, select'))
  .forEach(function (el) {
    // if an element has no name, it wouldn't be sent to the server
    if (!el.name) return
    // if an element is read only, then it doesn't make sense to send client
    if (el.readOnly) return
    // if the element is disabled then it wouldn't be sent to the server
    if (matches(el, ':disabled')) return

    if (el.type.indexOf(['file', 'reset', 'submit', 'button']) !== -1) return

    body[el.name] = el.value
  })

  return body
}