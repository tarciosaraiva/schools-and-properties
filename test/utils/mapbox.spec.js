import { buildSchoolFilterExpr, buildSchoolLocationFilterExpression } from '@/utils/mapbox'

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

    test('expression contains no education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression(schoolsFilter)
      expect(actual).toEqual(
        [
          'any',
          [
            'all',
            ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]],
            ['>=', ['get', 'primaryOverallScore'], '90'],
            ['>=', ['get', 'primaryEnglishScore'], '4'],
            ['>=', ['get', 'primaryMathsScore'], '4'],
          ],
          [
            'all',
            ['in', ['get', 'schoolType'], ''],
            ['>=', ['get', 'secondaryOverallScore'], '91'],
            ['>=', ['get', 'secondaryEnglishScore'], '3'],
            ['>=', ['get', 'secondaryMathsScore'], '3'],
          ]
        ]
      )
    })

    test('expression contains "Government" education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'Government'})
      expect(actual).toEqual(
        [
          'any',
          [
            'all',
            ['==', ['get', 'educationSector'], 'Government'],
            ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]],
            ['>=', ['get', 'primaryOverallScore'], '90'],
            ['>=', ['get', 'primaryEnglishScore'], '4'],
            ['>=', ['get', 'primaryMathsScore'], '4'],
          ],
          [
            'all',
            ['==', ['get', 'educationSector'], 'Government'],
            ['in', ['get', 'schoolType'], ''],
            ['>=', ['get', 'secondaryOverallScore'], '91'],
            ['>=', ['get', 'secondaryEnglishScore'], '3'],
            ['>=', ['get', 'secondaryMathsScore'], '3'],
          ]
        ]
      )
    })

    test('expression contains a negation of "Government" education sector filter', () => {
      const actual = buildSchoolLocationFilterExpression({...schoolsFilter, educationSector: 'NonGovernment'})
      expect(actual).toEqual(
        [
          'any',
          [
            'all',
            ['!=', ['get', 'educationSector'], 'Government'],
            ['in', ['get', 'schoolType'], ['literal', ['Primary', 'Pri/Sec']]],
            ['>=', ['get', 'primaryOverallScore'], '90'],
            ['>=', ['get', 'primaryEnglishScore'], '4'],
            ['>=', ['get', 'primaryMathsScore'], '4'],
          ],
          [
            'all',
            ['!=', ['get', 'educationSector'], 'Government'],
            ['in', ['get', 'schoolType'], ''],
            ['>=', ['get', 'secondaryOverallScore'], '91'],
            ['>=', ['get', 'secondaryEnglishScore'], '3'],
            ['>=', ['get', 'secondaryMathsScore'], '3'],
          ]
        ]
      )
    })
  })
})
