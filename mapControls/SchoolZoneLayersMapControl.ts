// @ts-ignore
import SchoolZoneLayersViewMapControl from '~/components/school/SchoolZoneLayersViewMapControl.vue'

export default class SchoolZoneLayersMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any

  constructor (store: any, toggleLayer: Function) {
    this._vm = new SchoolZoneLayersViewMapControl({ store, propsData: { toggleLayer } })
  }

  onAdd (map: any) {
    this._map = map
    this._container = document.createElement('div')
    this._container.id = 'school-zones-view'
    this._container.className = 'school-ctrl maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group'
    this._container.appendChild(this._vm.$mount().$el)
    return this._container;
  }

  onRemove () {
    this._container!.parentNode!.removeChild(this._container!);
    this._map = undefined;
  }
}
