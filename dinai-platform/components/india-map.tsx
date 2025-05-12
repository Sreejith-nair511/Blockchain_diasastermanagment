"use client"

import { useEffect, useRef, useState } from "react"
import { Waves, Flame, Wind, CloudLightning, Building2, AlertTriangle } from "lucide-react"
import type { DisasterType } from "./disaster-icons"

// Define disaster data with coordinates for India
const disasterData = [
  {
    id: 1,
    type: "flood" as DisasterType,
    location: "Kerala",
    coordinates: [10.8505, 76.2711],
    severity: "high",
  },
  {
    id: 2,
    type: "fire" as DisasterType,
    location: "Maharashtra",
    coordinates: [19.7515, 75.7139],
    severity: "medium",
  },
  {
    id: 3,
    type: "cyclone" as DisasterType,
    location: "Odisha",
    coordinates: [20.9517, 85.0985],
    severity: "high",
  },
  {
    id: 4,
    type: "earthquake" as DisasterType,
    location: "Gujarat",
    coordinates: [22.2587, 71.1924],
    severity: "medium",
  },
  {
    id: 5,
    type: "thunderstorm" as DisasterType,
    location: "West Bengal",
    coordinates: [22.9868, 87.855],
    severity: "low",
  },
]

// Map disaster types to Lucide icons
const iconMap = {
  flood: Waves,
  fire: Flame,
  cyclone: Wind,
  thunderstorm: CloudLightning,
  earthquake: Building2,
  other: AlertTriangle,
}

export default function IndiaMap() {
  const mapRef = useRef(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    // Dynamic import Leaflet only on client-side
    const initializeMap = async () => {
      const L = (await import("leaflet")).default

      // Make sure the container exists and has dimensions
      if (!mapRef.current) return

      // Create map instance
      const map = L.map(mapRef.current, {
        center: [20.5937, 78.9629], // Center of India
        zoom: 5,
        attributionControl: true,
        zoomControl: true,
        doubleClickZoom: true,
        scrollWheelZoom: true,
        dragging: true,
        minZoom: 4,
        maxZoom: 10,
      })

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map)

      // Create custom icon function
      const createCustomIcon = (type, severity) => {
        // Determine color based on severity
        let color = "yellow"
        if (severity === "high") color = "red"
        if (severity === "medium") color = "orange"

        // Create a custom icon using L.divIcon
        return L.divIcon({
          html: `<div class="flex items-center justify-center bg-white rounded-full p-1 shadow-lg border-2 border-white" style="color: ${color}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="animate-pulse-slow">
                    ${
                      type === "flood"
                        ? '<path d="M22 16.5h-2.08c-.27 0-.54.07-.78.21l-2.14 1.28c-.24.14-.5.21-.78.21-.28 0-.54-.07-.78-.21l-2.14-1.28a1.93 1.93 0 0 0-.78-.21c-.27 0-.54.07-.78.21L9.6 18.07c-.24.14-.5.21-.78.21-.28 0-.54-.07-.78-.21l-2.14-1.28a1.93 1.93 0 0 0-.78-.21H3" /><path d="M22 12.5h-2.08c-.27 0-.54.07-.78.21l-2.14 1.28c-.24.14-.5.21-.78.21-.28 0-.54-.07-.78-.21l-2.14-1.28a1.93 1.93 0 0 0-.78-.21c-.27 0-.54.07-.78.21L9.6 14.07c-.24.14-.5.21-.78.21-.28 0-.54-.07-.78-.21l-2.14-1.28a1.93 1.93 0 0 0-.78-.21H3" /><path d="M22 8.5h-2.08c-.27 0-.54.07-.78.21l-2.14 1.28c-.24.14-.5.21-.78.21-.28 0-.54-.07-.78-.21L13.3 8.71a1.93 1.93 0 0 0-.78-.21c-.27 0-.54.07-.78.21L9.6 10.07c-.24.14-.5.21-.78.21-.28 0-.54-.07-.78-.21L5.9 8.79a1.93 1.93 0 0 0-.78-.21H3" />'
                        : type === "fire"
                          ? '<path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5" /><path d="M9 18c0-1 .5-3 2.5-3" />'
                          : type === "cyclone"
                            ? '<path d="M17.2 12c.4 1 .6 2.2.4 3.4a6 6 0 0 1-7.5 4.3 6 6 0 0 1-4.3-7.5 6 6 0 0 1 7.5-4.3" /><path d="M15 8h.1c.4 1 .6 2.2.4 3.4" /><path d="M13 7.8c.4 1 .6 2.2.4 3.4" /><path d="M11 7.6c.4 1 .6 2.2.4 3.4" /><path d="M9 7.4c.4 1 .6 2.2.4 3.4" /><path d="M7 7.2c.4 1 .6 2.2.4 3.4" />'
                            : type === "earthquake"
                              ? '<path d="M8 2v2" /><path d="M8 16v6" /><path d="M16 2v2" /><path d="M16 16v6" /><path d="M3 12h2" /><path d="M19 12h2" /><path d="M4.93 4.93l1.41 1.41" /><path d="M17.66 17.66l1.41 1.41" /><path d="M4.93 19.07l1.41-1.41" /><path d="M17.66 6.34l1.41-1.41" /><path d="M12 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2 1.1 0 2-.9 2-2a2 2 0 0 0-2-2Z" />'
                              : type === "thunderstorm"
                                ? '<path d="M17 18a5 5 0 0 0-10 0" /><path d="M14 18h-4" /><path d="M11 14l-3 4h4l-3 4" />'
                                : '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" />'
                    }
                  </svg>
                </div>`,
          className: "custom-disaster-icon",
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        })
      }

      // Add disaster markers
      disasterData.forEach((disaster) => {
        const icon = createCustomIcon(disaster.type, disaster.severity)

        L.marker(disaster.coordinates, { icon })
          .addTo(map)
          .bindPopup(`
            <div class="text-center">
              <div class="font-bold">${disaster.location}</div>
              <div class="text-sm capitalize">${disaster.type} (${disaster.severity} severity)</div>
              <button class="mt-2 px-3 py-1 bg-[#0F5132] text-white text-xs rounded-full">View Details</button>
            </div>
          `)
      })

      // Add India border highlight - simplified approach
      try {
        fetch("/india-states.geojson")
          .then((response) => response.json())
          .then((data) => {
            L.geoJSON(data, {
              style: {
                color: "#0F5132",
                weight: 2,
                opacity: 0.6,
                fillColor: "#0F5132",
                fillOpacity: 0.1,
              },
            }).addTo(map)
          })
          .catch((err) => console.error("Error loading GeoJSON:", err))
      } catch (error) {
        console.error("Error loading GeoJSON:", error)
      }

      // Invalidate map size after rendering to prevent position issues
      setTimeout(() => {
        map.invalidateSize()
      }, 100)

      // Clean up on unmount
      return () => {
        map.remove()
      }
    }

    initializeMap()
  }, [isClient])

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[300px] rounded-lg z-10"
      style={{ height: "100%", minHeight: "300px" }}
    />
  )
}
