// @ts-ignore
import SchoolLegendViewMapControl from '~/components/school/SchoolLegendViewMapControl.vue'

export default class SchoolLegendMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any

  constructor () {
    this._vm = new SchoolLegendViewMapControl()
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
