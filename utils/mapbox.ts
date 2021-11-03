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

const buildSchoolFilterExpr = (shouldPlot: boolean, schoolType: string) => {
  let schoolTypeFilterExpr: (string | string[] | [string, [string, string]])[] = []

  if (shouldPlot) {
    return ['in', ['get', 'schoolType'], ['literal', [schoolType, 'Pri/Sec']]]
  }

  return schoolTypeFilterExpr = ['in', ['get', 'schoolType'], '']
}

export const buildSchoolLocationFilterExpression = (schoolsFilter: SchoolsFilter) => {
  let eduSectorFilter: (string | string[])[] | null = ['==', ['get', 'educationSector'], 'Government']

  if (schoolsFilter.educationSector === 'NonGovernment') {
    eduSectorFilter[0] = '!='
  } else if (schoolsFilter.educationSector === 'all') {
    eduSectorFilter = null
  }

  const primaryFilter = filterOutNulls([
    'all',
    eduSectorFilter,
    buildSchoolFilterExpr(schoolsFilter.primary.plot, 'Primary'),
    [
      '>=',
      ['get', 'primaryOverallScore'],
      `${schoolsFilter.primary.rating}`,
    ],
    [
      '>=',
      ['get', 'primaryEnglishScore'],
      `${schoolsFilter.primary.englishRating}`,
    ],
    [
      '>=',
      ['get', 'primaryMathsScore'],
      `${schoolsFilter.primary.mathsRating}`,
    ],
  ])

  const secondaryFilter = filterOutNulls([
    'all',
    eduSectorFilter,
    buildSchoolFilterExpr(schoolsFilter.secondary.plot, 'Secondary'),
    [
      '>=',
      ['get', 'secondaryOverallScore'],
      `${schoolsFilter.secondary.rating}`,
    ],
    [
      '>=',
      ['get', 'secondaryEnglishScore'],
      `${schoolsFilter.secondary.englishRating}`,
    ],
    [
      '>=',
      ['get', 'secondaryMathsScore'],
      `${schoolsFilter.secondary.mathsRating}`,
    ],
  ])

  return ['any', primaryFilter, secondaryFilter]
}
