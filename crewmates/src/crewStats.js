import { CATEGORY_OPTIONS, COLORS } from './constants'

export function computeCrewStats(crewmates) {
  const total = crewmates.length
  if (total === 0) {
    return {
      total: 0,
      colorPercents: {},
      categoryCounts: {},
      categoryPercents: {},
      averageSpeed: 0,
      impostorPercent: 0,
    }
  }

  const colorCounts = {}
  COLORS.forEach((color) => {
    colorCounts[color] = 0
  })

  const categoryCounts = {}
  CATEGORY_OPTIONS.forEach((category) => {
    categoryCounts[category] = 0
  })

  let speedSum = 0

  crewmates.forEach((crewmate) => {
    const color = crewmate.color
    if (colorCounts[color] !== undefined) {
      colorCounts[color] += 1
    }

    const category = crewmate.category || 'Crewmate'
    if (categoryCounts[category] !== undefined) {
      categoryCounts[category] += 1
    } else {
      categoryCounts[category] = 1
    }

    speedSum += Number(crewmate.speed) || 0
  })

  const colorPercents = {}
  Object.entries(colorCounts).forEach(([color, count]) => {
    if (count > 0) {
      colorPercents[color] = Math.round((count / total) * 100)
    }
  })

  const categoryPercents = {}
  Object.entries(categoryCounts).forEach(([category, count]) => {
    categoryPercents[category] = Math.round((count / total) * 100)
  })

  return {
    total,
    colorPercents,
    categoryCounts,
    categoryPercents,
    averageSpeed: Math.round((speedSum / total) * 10) / 10,
    impostorPercent: categoryPercents.Impostor || 0,
  }
}

export function computeMissionReadiness(crewmates) {
  const total = crewmates.length
  if (total === 0) {
    return { score: 0, level: 'low', label: 'No crew assembled' }
  }

  const speeds = crewmates.map((c) => Number(c.speed) || 0)
  const averageSpeed = speeds.reduce((sum, s) => sum + s, 0) / total
  const speedScore = Math.min((averageSpeed / 150) * 40, 40)

  const uniqueColors = new Set(crewmates.map((c) => c.color)).size
  const colorScore = (uniqueColors / Math.min(total, COLORS.length)) * 30

  const categoriesPresent = new Set(
    crewmates.map((c) => c.category || 'Crewmate')
  ).size
  const balanceScore = categoriesPresent === 3 ? 30 : categoriesPresent === 2 ? 20 : 10

  const score = Math.round(Math.min(speedScore + colorScore + balanceScore, 100))

  let level = 'low'
  let label = 'Sus — crew needs work'
  if (score >= 70) {
    level = 'high'
    label = 'Mission ready — clear for launch'
  } else if (score >= 40) {
    level = 'medium'
    label = 'Holding steady — keep recruiting'
  }

  return { score, level, label }
}
