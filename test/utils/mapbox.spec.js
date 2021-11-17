import {
  buildSchoolFilterExpr,
  buildSchoolLocationFilterExpression,
  buildSchoolIconImageExpression,
  buildSchoolIconSizeExpression
} from '@/utils/mapbox'

describe('utils/mapbox', () => {
  describe('buildSchoolFilterExpr', () => {
    test('should return expression with school type when plot is true', () => {
      const actual = buildSchoolFilterExpr(true, 'Primary')
      expect(actual).toEqual(['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]])
    })

    test('should return empty expression when plot is false', () => {
      const actual = buildSchoolFilterExpr(false, 'Primary')
      expect(actual).toEqual(['in', ['get', 'schoolType'], ''])
    })
  })

  describe('buildSchoolLocationFilterExpression', () => {
    const schoolsFilter = {
      educationSector: 'all',
      primary: {
        plot: true, rating: 90, englishRating: 4, mathsRating: 4
      },
      secondary: {
        plot: false, rating: 91, englishRating: 3, mathsRating: 3
      }
    }

    test('primary school expression contains no education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression(schoolsFilter)
      expect(actual).toEqual(
        [
          'all',
          ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]],
          ['>=', ['to-number', ['get', 'primaryOverallScore']], 90]
        ]
      )
    })

    test('secondary school expression contains no education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, secondary: { plot: true, rating: 91 }}, false)
      expect(actual).toEqual(
        [
          'all',
          ['in', ['get', 'schoolType'], ['literal', ['Secondary', 'Pri/Sec']]],
          ['>=', ['to-number', ['get', 'secondaryOverallScore']], 91]
        ]
      )
    })

    test('no plot secondary expression contains "Government" education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'Government'}, false)
      expect(actual).toEqual(
        [
          'all',
          ['==', ['get', 'educationSector'], 'Government'],
          ['in', ['get', 'schoolType'], ''],
          ['>=', ['to-number', ['get', 'secondaryOverallScore']], 91]
        ]
      )
    })

    test('primary schools expression contains a negation of "Government" education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'NonGovernment'})
      expect(actual).toEqual(
        [
          'all',
          ['!=', ['get', 'educationSector'], 'Government'],
          ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]],
          ['>=', ['to-number', ['get', 'primaryOverallScore']], 90]
        ],
      )
    })

    test('primary schools expression contains no rating filter when all schools are to be shown', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'NonGovernment', primary: { rating: 0 }})
      expect(actual).toEqual(
        [
          'all',
          ['!=', ['get', 'educationSector'], 'Government'],
          ['in', ['get', 'schoolType'], '']
        ],
      )
    })
  })

  describe('buildSchoolIconImageExpression', () => {
    test('build case expression for primary school', () => {
      const actual = buildSchoolIconImageExpression()
      expect(actual).toEqual([
        'case',
        [
          'any',
          [
            'all',
            ['==', ['get', 'schoolType'], 'Primary'],
            ['==', ['get', 'primaryOverallScore'], '#N/A']
          ],
          [
            'all',
            ['==', ['get', 'schoolType'], 'Pri/Sec'],
            ['==', ['get', 'primaryOverallScore'], '#N/A'],
          ],
        ],
        'primary-school-unrated',
        'primary-school-rated'
      ])
    })

    test('build case expression for secondary school', () => {
      const actual = buildSchoolIconImageExpression(false)
      expect(actual).toEqual([
        'case',
        [
          'any',
          [
            'all',
            ['==', ['get', 'schoolType'], 'Secondary'],
            ['==', ['get', 'secondaryOverallScore'], '#N/A']
          ],
          [
            'all',
            ['==', ['get', 'schoolType'], 'Pri/Sec'],
            ['==', ['get', 'secondaryOverallScore'], '#N/A'],
          ],
        ],
        'secondary-school-unrated',
        'secondary-school-rated'
      ])
    })
  })

  describe('buildSchoolIconSizeExpression', () => {
    const schoolsFilter = {
      educationSector: 'all',
      primary: {
        plot: true, rating: 90, englishRating: 4, mathsRating: 4
      },
      secondary: {
        plot: false, rating: 91, englishRating: 3, mathsRating: 3
      }
    }

    test('should return 0 when layer is not to be plotted', () => {
      const actual = buildSchoolIconSizeExpression(schoolsFilter, false)
      expect(actual).toBe(0)
    })

    test('should build expression when layer is to be plotted', () => {
      const actual = buildSchoolIconSizeExpression(schoolsFilter, true)
      expect(actual).toEqual(
        [
          'step',
          [
            'case',
            [
              'all',
              ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]],
              ['!=', ['get', 'primaryOverallScore'], '#N/A']
            ],
            ['to-number', ['get', 'primaryOverallScore']],
            0
          ],
          0.65,
          90,
          1
        ]
      )
    })
  })
})
