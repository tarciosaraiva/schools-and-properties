// @ts-ignore
import PropertyFiltersVueControl from '~/components/property/PropertyFiltersVueControl.vue'

export default class PropertyFiltersMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any

  constructor (store: any) {
    this._vm = new PropertyFiltersVueControl({ store })
  }

  onAdd (map: any) {
    this._map = map
    this._container = document.createElement('div')
    this._container.id = `property-filters-view`
    this._container.className = `property-ctrl maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group`
    this._container.appendChild(this._vm.$mount().$el)
    return this._container;
  }

  onRemove () {
    this._container!.parentNode!.removeChild(this._container!);
    this._map = undefined;
  }
}
