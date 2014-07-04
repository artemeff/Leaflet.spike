### Leaflet.spike

---

Simple and tiny [Leaflet](http://leafletjs.com) spikes plugin.

---

### Demos

- [Simple demo](http://artemeff.github.io/Leaflet.spike/demo)
- [Adding points dynamically (soon)](http://artemeff.github.io/Leaflet.spike/demo)

---

### Basic Usage

```js
var spikes = L.spikeLayer(latlngs, options).addTo(map);
```

`latlngs` should have third parameter – altitude, that represents spike value.

To include the plugin, just use `leaflet-spike.js` from the `dist` folder:

```html
<script src="leaflet-spike.js"></script>
```

---

### Reference

#### L.spikeLayer(latlngs, options)

Constructs a spikes layer given an array of `LatLng` points and an object with the following options:

- **maxValue** - if you know your max value use this option to set it, or it calculates from your values;
- **spikeOptions** - options to create new spikes.

Spike options:

- **maxHeight** - max height for your spikes;
- **colorFrom** - color for minimal values, array of RGB values, ex. `[0, 255, 0]`;
- **colorTo** - like `colorFrom` but for maximum values, `[255, 0, 0]`;
- **mouseenter** - event for spike, `function(el, value){}`;
- **mouseleave** - `function(el, value){}`;
- **mouseclick** - `function(el, value){}`.

Each `LatLng` should have third argument (`altitude`) that represents spike value.

#### Methods

- **addLatLng(latlng)** - adds a new spike to the map;
- **setLatLngs(latlngs)** - set the new map data;
- **update()** - redraw spikes.

---

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
