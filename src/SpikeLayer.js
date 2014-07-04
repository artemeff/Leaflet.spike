/*
 * L.Marker is used to display clickable icons on the map.
 */

L.SpikeLayer = L.Class.extend({
  options: {
    // maxValue: 0,
    spikeOptions: {}
  },

  initialize: function(latlng, options) {
    L.setOptions(this, options);
    this._latlng = latlng;
  },

  onAdd: function(map) {
    this._map = map;
    this._map.on('viewreset', this.update, this);
    return this.update();
  },

  onRemove: function() {
    return this.update();
  },

  addLatLng: function(latlng) {
    this._latlng.push(latlng);
    return this.update();
  },

  setLatLngs: function(latlng) {
    this._latlng = latlng;
    return this.update();
  },

  addTo: function(map) {
    map.addLayer(this);
    return this;
  },

  update: function() {
    var maxValue = 0;

    if (this.options.maxValue) {
      maxValue = this.options.maxValue;
    } else {
      for (var i = this._latlng.length - 1; i >= 0; i--) {
        if (this._latlng[i][2] > maxValue) {
          maxValue = this._latlng[i][2];
        }
      }
    }

    this._resetSpikeLayer();

    for (var i = this._latlng.length - 1; i >= 0; i--) {
      this._initSpike(L.latLng(this._latlng[i]), maxValue);
    };

    return this;
  },

  _resetSpikeLayer: function() {
    if (this._spikesLayer) this._spikesLayer.remove();

    this._spikesLayer = document.createElement('div');
    this._spikesLayer.id = 'spikesLayer';
    this._spikesLayer.className = 'leaflet-zoom-hide';
    this._spikesLayer.style.position = 'relative';
    this._map.getPanes().overlayPane.appendChild(this._spikesLayer);
  },

  _initSpike: function(latlng, maxValue) {
    var pos = this._map.latLngToLayerPoint(latlng),
        spike = L.spike(this.options.spikeOptions);

    spike.setMaxValue(maxValue);

    var spikeElement = spike.createSpike(latlng.alt);

    this._spikesLayer.appendChild(spikeElement);
    L.DomUtil.setPosition(spikeElement, pos);
  }
});

L.spikeLayer = function(latlng, options) {
  return new L.SpikeLayer(latlng, options);
};
