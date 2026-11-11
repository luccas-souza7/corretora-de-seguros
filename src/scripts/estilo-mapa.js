// Estilo do mapa nas cores da marca. Dados: OpenStreetMap, servidos pelo OpenFreeMap (gratuito, sem chave).
const P = {
  fundo: '#EEF4FD', quadra: '#E7EFFB', parque: '#D6E8F0', agua: '#B5CFF5', via: '#FFFFFF', contorno: '#D0DDF2',
  predio: '#D3E1F7', predioLinha: '#C6D6F0', rotulo: '#5A6C8F', halo: '#EEF4FD',
};

export function estiloMapa({ predios3d = false } = {}) {
  const T = 'transportation';
  const classe = (...c) => ['match', ['get', 'class'], c, true, false];
  const linha = ['match', ['geometry-type'], ['LineString', 'MultiLineString'], true, false];
  const largura = (a, b) => ['interpolate', ['exponential', 1.5], ['zoom'], 11, a, 18, b];
  const arredondada = { 'line-cap': 'round', 'line-join': 'round' };
  const menores = ['all', linha, classe('minor', 'service', 'tertiary')];
  const maiores = ['all', linha, classe('primary', 'secondary', 'trunk', 'motorway')];
  return {
    version: 8,
    glyphs: 'https://tiles.openfreemap.org/fonts/{fontstack}/{range}.pbf',
    sources: { o: { type: 'vector', url: 'https://tiles.openfreemap.org/planet' } },
    layers: [
      { id: 'fundo', type: 'background', paint: { 'background-color': P.fundo } },
      { id: 'uso', type: 'fill', source: 'o', 'source-layer': 'landuse', paint: { 'fill-color': P.quadra, 'fill-opacity': 0.6 } },
      { id: 'parque', type: 'fill', source: 'o', 'source-layer': 'park', paint: { 'fill-color': P.parque } },
      { id: 'agua', type: 'fill', source: 'o', 'source-layer': 'water', paint: { 'fill-color': P.agua } },
      { id: 'rio', type: 'line', source: 'o', 'source-layer': 'waterway', paint: { 'line-color': P.agua, 'line-width': largura(1, 6) } },
      { id: 'via-menor-borda', type: 'line', source: 'o', 'source-layer': T, filter: menores, layout: arredondada, paint: { 'line-color': P.contorno, 'line-width': largura(0.6, 16) } },
      { id: 'via-maior-borda', type: 'line', source: 'o', 'source-layer': T, filter: maiores, layout: arredondada, paint: { 'line-color': P.contorno, 'line-width': largura(1.6, 30) } },
      { id: 'via-menor', type: 'line', source: 'o', 'source-layer': T, filter: menores, layout: arredondada, paint: { 'line-color': P.via, 'line-width': largura(0.3, 12) } },
      { id: 'via-maior', type: 'line', source: 'o', 'source-layer': T, filter: maiores, layout: arredondada, paint: { 'line-color': P.via, 'line-width': largura(1, 24) } },
      predios3d
        ? { id: 'predio', type: 'fill-extrusion', source: 'o', 'source-layer': 'building', minzoom: 13, paint: { 'fill-extrusion-color': P.predio, 'fill-extrusion-height': ['coalesce', ['get', 'render_height'], 6], 'fill-extrusion-opacity': 0.95 } }
        : { id: 'predio', type: 'fill', source: 'o', 'source-layer': 'building', minzoom: 13, paint: { 'fill-color': P.predio, 'fill-outline-color': P.predioLinha } },
      { id: 'nome-via', type: 'symbol', source: 'o', 'source-layer': 'transportation_name', minzoom: 14, layout: { 'symbol-placement': 'line', 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Regular'], 'text-size': ['interpolate', ['linear'], ['zoom'], 14, 9, 18, 14], 'text-letter-spacing': 0.06 }, paint: { 'text-color': P.rotulo, 'text-halo-color': P.halo, 'text-halo-width': 1.4 } },
      { id: 'nome-lugar', type: 'symbol', source: 'o', 'source-layer': 'place', filter: classe('suburb', 'neighbourhood', 'quarter'), layout: { 'text-field': ['get', 'name'], 'text-font': ['Noto Sans Bold'], 'text-size': 12, 'text-transform': 'uppercase', 'text-letter-spacing': 0.22 }, paint: { 'text-color': P.rotulo, 'text-opacity': 0.7, 'text-halo-color': P.halo, 'text-halo-width': 1.6 } },
    ],
  };
}

export const ZOOM_INICIAL = 15.6;
