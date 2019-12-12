// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'value',
      stops: [
        // [0, '#3288bd'],
        // [1, '#66c2a5'],
        // [2, '#abdda4'],
        // [3, '#e6f598'],
        // [4, '#ffffbf'],
        // [5, '#fee08b'],
        [0, '#FFFF00'],
        [100, '#FFFF00'],
        [500, '#00ff00'],
        [1000, '#d53e4f']
      ]
    },
    'fill-opacity': 0.8
  }
};
