import { SchoolsFilter } from '~/store'

export const dataSources = [
  {
    id: 'primary-schools',
    uri: 'school-zone-sources/Primary_Integrated_2022.geojson',
    color: {
      r: 39,
      g: 174,
      b: 96
    }
  },
  {
    id: 'p7-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year7_2022.geojson',
    color: {
      r: 52,
      g: 152,
      b: 219
    }
  },
  {
    id: 'p8-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year8_2022.geojson',
    color: {
      r: 52,
      g: 152,
      b: 219
    }
  },
  {
    id: 'p9-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year9_2022.geojson',
    color: {
      r: 52,
      g: 152,
      b: 219
    }
  },
  {
    id: 'p10-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year10_2022.geojson',
    color: {
      r: 52,
      g: 152,
      b: 219
    }
  },
  {
    id: 'p11-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year11_2022.geojson',
    color: {
      r: 52,
      g: 152,
      b: 219
    }
  },
  {
    id: 'p12-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year12_2022.geojson',
    color: {
      r: 52,
      g: 152,
      b: 219
    }
  },
  {
    id: 'school-locations',
    uri: `https://api.maptiler.com/data/${process.env.schoolLocations}/features.json?key=${process.env.mapTilerSecret}`,
  },
]

const filterOutNulls = (filterExpr: any[]) => filterExpr.filter(i => i !== null)

export const buildSchoolFilterExpr = (shouldPlot: boolean, schoolType: string) => {
  if (shouldPlot) {
    return ['in', ['get', 'schoolType'], ['literal', [schoolType, 'Pri/Sec']]]
  }

  return ['in', ['get', 'schoolType'], '']
}

export const buildSchoolLocationFilterExpression = (schoolsFilter: SchoolsFilter, primaryFilter: boolean = true) => {
  let eduSectorFilter: (string | string[])[] | null = ['==', ['get', 'educationSector'], 'Government']

  if (schoolsFilter.educationSector === 'NonGovernment') {
    eduSectorFilter[0] = '!='
  } else if (schoolsFilter.educationSector === 'all') {
    eduSectorFilter = null
  }

  const { primary, secondary } = schoolsFilter
  const schoolTypeFilter = primaryFilter ? primary : secondary
  const schoolType = primaryFilter ? 'Primary' : 'Secondary'
  const lowerCaseSchoolType = schoolType.toLowerCase()

  let overallScoreFilter: (string | number | (string | string[])[])[] | null = ['>=', ['to-number', ['get', `${lowerCaseSchoolType}OverallScore`]], schoolTypeFilter.rating]

  if (schoolTypeFilter.rating === 0) {
    overallScoreFilter = null
  }

  return filterOutNulls([
    'all',
    eduSectorFilter,
    buildSchoolFilterExpr(schoolTypeFilter.plot, schoolType),
    overallScoreFilter
  ])
}

export const buildSchoolIconImageExpression = (primary: boolean = true, mobilePrefix: string = '') => {
  const schoolType = primary ? 'Primary' : 'Secondary'
  const lowerCaseSchoolType = schoolType.toLowerCase()
  return [
    'case',
    [
      'any',
      [
        'all',
        ['==', ['get', 'schoolType'], schoolType],
        ['==', ['get', `${lowerCaseSchoolType}OverallScore`], '#N/A']
      ],
      [
        'all',
        ['==', ['get', 'schoolType'], 'Pri/Sec'],
        ['==', ['get', `${lowerCaseSchoolType}OverallScore`], '#N/A'],
      ],
    ],
    `${mobilePrefix}${lowerCaseSchoolType}-school-unrated`,
    `${mobilePrefix}${lowerCaseSchoolType}-school-rated`
  ]
}

export const loadImages = (map: any) => {
  const images = [
    'primary-school-unrated',
    'primary-school-rated',
    'secondary-school-unrated',
    'secondary-school-rated',
    'property-location',
  ]

  images.forEach(imageName => {
    map.loadImage(
      require(`~/assets/images/${imageName}.png`),
      (err: any, img: any) => {
        if (err) throw err
        map.addImage(imageName, img)
      }
    )

    map.loadImage(
      require(`~/assets/images/mobile-${imageName}.png`),
      (err: any, img: any) => {
        if (err) throw err
        map.addImage(`mobile-${imageName}`, img)
      }
    )
  })
}

export const getPopupOffsets = (): any => {
  const markerHeight = 20
  const markerRadius = 20
  const linearOffset = 20
  return {
    'top': [0, markerHeight],
    'top-left': [0, markerHeight],
    'top-right': [0, markerHeight],
    'bottom': [0, -markerHeight],
    'bottom-left': [linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'bottom-right': [-linearOffset, (markerHeight - markerRadius + linearOffset) * -1],
    'left': [markerRadius, (markerHeight - markerRadius) * -1],
    'right': [-markerRadius, (markerHeight - markerRadius) * -1]
  }
}
