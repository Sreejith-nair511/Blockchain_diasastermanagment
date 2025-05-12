import { Waves, Flame, Wind, CloudLightning, Snowflake, Building2, AlertTriangle, type LucideIcon } from "lucide-react"

export type DisasterType = "flood" | "fire" | "cyclone" | "thunderstorm" | "coldwave" | "earthquake" | "other"

interface DisasterIconProps {
  type: DisasterType
  className?: string
  animated?: boolean
}

const iconMap: Record<DisasterType, LucideIcon> = {
  flood: Waves,
  fire: Flame,
  cyclone: Wind,
  thunderstorm: CloudLightning,
  coldwave: Snowflake,
  earthquake: Building2,
  other: AlertTriangle,
}

const DisasterIcon = ({ type, className = "", animated = false }: DisasterIconProps) => {
  const Icon = iconMap[type] || iconMap.other

  return <Icon className={`${className} ${animated ? "animate-pulse-slow" : ""}`} />
}

export default DisasterIcon
