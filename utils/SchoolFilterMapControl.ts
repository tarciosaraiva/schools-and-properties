// @ts-ignore
import SchoolViewFilterMapControl from '~/components/school/SchoolViewFilterMapControl.vue'

export default class SchoolFilterMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any

  constructor (store: any, openSchoolFilter: Function) {
    this._vm = new SchoolViewFilterMapControl({ store, propsData: { openSchoolFilter } })
  }

  onAdd (map: any) {
    this._map = map
    this._container = document.createElement('div')
    this._container.id = 'schools-filter-view'
    this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group'
    this._container.appendChild(this._vm.$mount().$el)
    return this._container;
  }

  onRemove () {
    this._container!.parentNode!.removeChild(this._container!);
    this._map = undefined;
  }
}
