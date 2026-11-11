// Mapa interativo (MapLibre). Carregado sob demanda, só quando a abertura ou a seção de contato precisam.
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { estiloMapa, ZOOM_INICIAL } from './estilo-mapa.js';

/** Cria o mapa dentro do elemento com esse id. A coordenada vem dos atributos data-lng e data-lat. */
export function criar(id, { interativo = false, predios3d = false, leve = false } = {}) {
  const el = document.getElementById(id);
  const centro = [Number(el.dataset.lng), Number(el.dataset.lat)];
  const mapa = new maplibregl.Map({
    container: el, style: estiloMapa({ predios3d }), center: centro, zoom: ZOOM_INICIAL,
    interactive: interativo, attributionControl: false, fadeDuration: 0, cooperativeGestures: interativo,
    ...(leve ? { pixelRatio: Math.min(devicePixelRatio, 1.5) } : {}),
  });
  mapa.addControl(new maplibregl.AttributionControl({ compact: true, customAttribution: '© OpenStreetMap · OpenFreeMap' }), 'bottom-right');
  if (interativo) mapa.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
  return { mapa, centro, maplibregl };
}
