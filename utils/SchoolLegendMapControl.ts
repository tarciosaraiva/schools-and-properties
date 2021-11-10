// @ts-ignore
import SchoolLegendMapControl from '~/components/school/SchoolLegendMapControl.vue'

export default class SchoolFilterMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any

  constructor () {
    this._vm = new SchoolLegendMapControl()
  }

  onAdd (map: any) {
    this._map = map
    this._container = document.createElement('div')
    this._container.id = 'schools-legend-view'
    this._container.className = 'mapboxgl-ctrl schools-legend-view-ctrl'
    this._container.appendChild(this._vm.$mount().$el)
    return this._container;
  }

  onRemove () {
    this._container!.parentNode!.removeChild(this._container!);
    this._map = undefined;
  }
}
