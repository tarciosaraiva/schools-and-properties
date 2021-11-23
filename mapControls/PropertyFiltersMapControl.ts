// @ts-ignore
import PropertyBedsFilterViewMapControl from '~/components/property/PropertyBedsFilterViewMapControl.vue'
// @ts-ignore
import PropertyBathroomsFilterViewMapControl from '~/components/property/PropertyBathroomsFilterViewMapControl.vue'
// @ts-ignore
import PropertyCarSpacesFilterViewMapControl from '~/components/property/PropertyCarSpacesFilterViewMapControl.vue'
// @ts-ignore
import PropertyPriceFilterViewMapControl from '~/components/property/PropertyPriceFilterViewMapControl.vue'
// @ts-ignore
import PropertyTypeFilterViewMapControl from '~/components/property/PropertyTypeFilterViewMapControl.vue'

export default class PropertyFiltersMapControl {
  _container: HTMLDivElement | null = null
  _map: any
  _vm: any
  _type: string

  constructor (store: any, type: string) {
    this._type = type

    if (type === 'beds') {
      this._vm = new PropertyBedsFilterViewMapControl({ store })
    } else if (type === 'baths') {
      this._vm = new PropertyBathroomsFilterViewMapControl({ store })
    } else if (type === 'cars') {
      this._vm = new PropertyCarSpacesFilterViewMapControl({ store })
    } else if (type === 'price') {
      this._vm = new PropertyPriceFilterViewMapControl({ store })
    } else if (type === 'types') {
      this._vm = new PropertyTypeFilterViewMapControl({ store })
    }
  }

  onAdd (map: any) {
    this._map = map
    this._container = document.createElement('div')
    this._container.id = `${this._type}-filter-view`
    this._container.className = `property-ctrl ${this._type} maplibregl-ctrl maplibregl-ctrl-group mapboxgl-ctrl mapboxgl-ctrl-group`
    this._container.appendChild(this._vm.$mount().$el)
    return this._container;
  }

  onRemove () {
    this._container!.parentNode!.removeChild(this._container!);
    this._map = undefined;
  }
}
