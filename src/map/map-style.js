// For more information on data-driven styles, see https://www.mapbox.com/help/gl-dds-ref/
export const dataLayer = {
  id: 'data',
  type: 'fill',
  paint: {
    'fill-color': {
      property: 'value',
      stops: [
        [0, '#F2F12D'],
        [1, '#EED322'],
        [2, '#E6B71E'],
        [3, '#DA9C20'],
        [4, '#CA8323'],
        [5, '#B86B25'],
        [6, '#A25626'],
        [7, '#8B4225'],
        [8, '#723122']
      ]

    },
    'fill-opacity': 0.8,
  }
};
