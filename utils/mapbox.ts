import { SchoolsFilter } from '~/store'

export const dataSources = [
  {
    id: 'primary-schools',
    uri: `school-zone-sources/Primary_Integrated_2022.geojson`,
    color: {
      r: 214,
      g: 178,
      b: 17
    }
  },
  {
    id: 'p7-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year7_2022.geojson',
    color: {
      r: 46,
      g: 48,
      b: 137
    }
  },
  {
    id: 'p8-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year8_2022.geojson',
    color: {
      r: 46,
      g: 48,
      b: 137
    }
  },
  {
    id: 'p9-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year9_2022.geojson',
    color: {
      r: 46,
      g: 48,
      b: 137
    }
  },
  {
    id: 'p10-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year10_2022.geojson',
    color: {
      r: 46,
      g: 48,
      b: 137
    }
  },
  {
    id: 'p11-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year11_2022.geojson',
    color: {
      r: 46,
      g: 48,
      b: 137
    }
  },
  {
    id: 'p12-schools',
    uri: 'school-zone-sources/Secondary_Integrated_Year12_2022.geojson',
    color: {
      r: 46,
      g: 48,
      b: 137
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

export const buildSchoolLocationFilterExpression = (schoolsFilter: SchoolsFilter, primary: boolean = true) => {
  let eduSectorFilter: (string | string[])[] | null = ['==', ['get', 'educationSector'], 'Government']

  if (schoolsFilter.educationSector === 'NonGovernment') {
    eduSectorFilter[0] = '!='
  } else if (schoolsFilter.educationSector === 'all') {
    eduSectorFilter = null
  }

  if (primary) {
    return filterOutNulls([
      'all',
      eduSectorFilter,
      buildSchoolFilterExpr(schoolsFilter.primary.plot, 'Primary'),
    ])
  } else {
    return filterOutNulls([
      'all',
      eduSectorFilter,
      buildSchoolFilterExpr(schoolsFilter.secondary.plot, 'Secondary'),
    ])
  }
}

export const buildSchoolIconOpacityExpression = (primary: boolean = true) => {
  const schoolType = primary ? 'Primary' : 'Secondary'

  return [
    'case',
    [
      'any',
      [
        'all',
        ['==', ['get', 'schoolType'], schoolType],
        ['==', ['get', `${schoolType.toLowerCase()}OverallScore`], '#N/A']
      ],
      [
        'all',
        ['==', ['get', 'schoolType'], 'Pri/Sec'],
        ['==', ['get', `${schoolType.toLowerCase()}OverallScore`], '#N/A'],
      ],
    ],
    0.65,
    1
  ]
}

export const buildSchoolIconSizeExpression = (schoolsFilter: SchoolsFilter, primaryFilter: boolean = true) => {
  const { primary, secondary } = schoolsFilter
  const schoolTypeFilter = primaryFilter ? primary : secondary

  if (!schoolTypeFilter.plot) {
    return 0
  }

  const schoolType = primaryFilter ? 'Primary' : 'Secondary'

  const schoolScoreExpr = [
    [
      'all',
      ['in', ['get', 'schoolType'], ['literal', [schoolType, 'Pri/Sec']]],
      ['!=', ['get', `${schoolType.toLowerCase()}OverallScore`], '#N/A']
    ],
    ['to-number', ['get', `${schoolType.toLowerCase()}OverallScore`]]
  ]

  return [
    'step',
    [
      'case',
      schoolScoreExpr[0],
      schoolScoreExpr[1],
      0
    ],
    0.65,
    schoolTypeFilter.rating,
    1
  ]
}
