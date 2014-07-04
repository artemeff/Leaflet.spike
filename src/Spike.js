/*
 * L.Icon is an image-based icon class that you can use with L.Marker for custom markers.
 */

L.Spike = L.Class.extend({
  options: {
    maxHeight: 50,
    colorFrom: [0, 255, 0],
    colorTo: [255, 0, 0],
    // mouseenter: function(el, value){},
    // mouseleave: function(el, value){},
    // mouseclick: function(el, value){}
  },

  initialize: function(options) {
    L.setOptions(this, options);
  },

  setMaxValue: function(maxValue) {
    this._maxValue = maxValue;
  },

  createSpike: function(value) {
    var spike = document.createElement('div'),
        width = 4, height = this._getHeight(value);

    spike.className = 'leaflet-spike';
    spike.style.width  = width + 'px';
    spike.style.height = height + 'px';
    spike.style.background = this._chooseColor(value);
    spike.style.position = 'absolute';
    spike.style.marginTop = -height + 'px';

    this._initInteraction(spike);
    this._value = value;

    return spike;
  },

  _getHeight: function(value) {
    return value / this._maxValue * this.options.maxHeight;
  },

  _getStepColor: function (value) {
    var colorA = this.options.colorFrom,
        colorB = this.options.colorTo;

    return colorA.map(function (color, i) {
      return (color + value * (colorB[i] - color)) & 255;
    });
  },

  _chooseColor: function(current) {
    var value = current / this._maxValue,
        color = this._getStepColor(value >= 1 ? 1 : value);

    return "rgb(" + color.join() + ")";
  },

  _initInteraction: function(spike) {
    L.DomUtil.addClass(spike, 'leaflet-clickable');
    L.DomEvent.addListener(spike, 'mouseenter', this._mouseEnter, this);
    L.DomEvent.addListener(spike, 'mouseleave', this._mouseLeave, this);
    L.DomEvent.addListener(spike, 'mouseover', this._mouseOver, this);
    L.DomEvent.addListener(spike, 'mouseout', this._mouseOut, this);
    L.DomEvent.addListener(spike, 'click', this._mouseClick, this);
  },

  _mouseClick: function(e) {
    this.options.mouseclick &&
      this.options.mouseclick(e.toElement, this._value);
  },

  _mouseEnter: function(e) {
    this.options.mouseenter &&
      this.options.mouseenter(e.toElement, this._value);
  },

  _mouseLeave: function(e) {
    this.options.mouseleave &&
      this.options.mouseleave(e.fromElement, this._value);
  },

  _mouseOver: function(e) {
    e.toElement.style.zIndex = 250;
  },

  _mouseOut: function(e) {
    e.fromElement.style.zIndex = 0;
  }
});

L.spike = function(options) {
  return new L.Spike(options);
};
