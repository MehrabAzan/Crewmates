export const COLORS = [
  'Red',
  'Green',
  'Blue',
  'Purple',
  'Yellow',
  'Orange',
  'Pink',
  'Rainbow',
]

export const COLOR_HEX = {
  Red: '#c51111',
  Green: '#117f2d',
  Blue: '#132ed1',
  Purple: '#6b2fbb',
  Yellow: '#f5f557',
  Orange: '#ef7d0d',
  Pink: '#ed54ba',
  Rainbow: 'linear-gradient(135deg, #c51111, #ef7d0d, #f5f557, #117f2d, #132ed1, #6b2fbb, #ed54ba)',
}

export const SLOW_SPEED_THRESHOLD = 50

export const CATEGORY_OPTIONS = ['Crewmate', 'Impostor', 'Engineer']

export const CATEGORY_ATTRIBUTES = {
  Crewmate: {
    colors: ['Red', 'Green', 'Blue', 'Yellow', 'Orange', 'Pink', 'Rainbow'],
    speeds: [25, 50, 75, 100],
  },
  Impostor: {
    colors: ['Red', 'Purple', 'Orange', 'Pink'],
    speeds: [75, 100, 150, 200],
  },
  Engineer: {
    colors: ['Yellow', 'Orange', 'Blue', 'Green'],
    speeds: [50, 75, 100, 125],
  },
}

export const DEFAULT_CATEGORY = 'Crewmate'
