import {
  buildSchoolFilterExpr,
  buildSchoolLocationFilterExpression,
  buildSchoolIconOpacityExpression,
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
        ]
      )
    })

    test('secondary school expression contains no education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, secondary: { plot: true }}, false)
      expect(actual).toEqual(
        [
          'all',
          ['in', ['get', 'schoolType'], ['literal', ['Secondary', 'Pri/Sec']]]
        ]
      )
    })

    test('no plot secondary expression contains "Government" education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'Government'}, false)
      expect(actual).toEqual(
        [
          'all',
          ['==', ['get', 'educationSector'], 'Government'],
          ['in', ['get', 'schoolType'], '']
        ]
      )
    })

    test('primary schools expression contains a negation of "Government" education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'NonGovernment'})
      expect(actual).toEqual(
        [
          'all',
          ['!=', ['get', 'educationSector'], 'Government'],
          ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]]
        ],
      )
    })
  })

  describe('buildSchoolIconOpacityExpression', () => {
    test('build case expression for primary school', () => {
      const actual = buildSchoolIconOpacityExpression()
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
        0.65,
        1
      ])
    })

    test('build case expression for secondary school', () => {
      const actual = buildSchoolIconOpacityExpression(false)
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
        0.65,
        1
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
