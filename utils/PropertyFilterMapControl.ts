// @ts-ignore
import PropertyViewFilterMapControl from '~/components/PropertyViewFilterMapControl.vue'

export default class PropertyFilterMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any

  constructor (store: any, openPropertyFilter: Function) {
    this._vm = new PropertyViewFilterMapControl({ store, propsData: { openPropertyFilter } })
  }

  onAdd (map: any) {
    this._map = map
    this._container = document.createElement('div')
    this._container.id = 'property-filter-view'
    this._container.className = 'mapboxgl-ctrl property-filter-view-ctrl'
    this._container.appendChild(this._vm.$mount().$el)
    return this._container;
  }

  onRemove () {
    this._container!.parentNode!.removeChild(this._container!);
    this._map = undefined;
  }
}
