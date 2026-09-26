"use client";

import { useEffect, useRef } from "react";
import type { Dealer } from "@/app/our-dealers/DealersDirectory";

// Approximate coordinates for dealers based on their city/area
const DEALER_COORDS: Record<string, [number, number]> = {
  // Karachi dealers
  "Smart Electric Wheels":    [24.912, 67.111],
  "Hilal Motors":             [24.870, 67.038],
  "Laox Electronics":         [24.924, 67.073],
  "Mubashira Motors":         [24.825, 67.149],
  "Auto Power":               [24.857, 67.017],
  "Green Wheels":             [24.912, 67.109],
  "TK Dealership":            [24.823, 67.078],
  "Solarize":                 [24.848, 67.184],
  "Al Noor Traders":          [24.937, 67.043],
  "Bangash Green Energy":     [24.930, 67.136],
  "Visdom EV":                [24.903, 67.147],
  "GreenWood Power 3S Service Center": [24.899, 67.134],
  "AGW Auto Solutions":       [24.921, 67.145],
  "BlueChip Technologies":    [24.906, 67.142],
  "Flagship Store Karachi":   [24.870, 67.043],
  // Hyderabad dealers
  "ELFA Flagship Store":      [25.370, 68.368],
  "Future Bike EV":           [25.393, 68.371],
  "Hyderabad EV's":           [25.365, 68.357],
  // Lahore dealers
  "ROZ Shopping Center":      [31.573, 74.296],
  // Rahim Yar Khan dealers
  "New Madina Auto Centre":   [28.420, 70.296],
  // Rawalpindi dealers
  "The EV Store":             [33.606, 73.048],
};

interface MapProps {
  dealers: Dealer[];
  activeDealer: Dealer | null;
}

declare global {
  interface Window {
    L: typeof import("leaflet");
  }
}

export default function MapComponent({ dealers, activeDealer }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<ReturnType<typeof window.L.map> | null>(null);
  const markersRef = useRef<Map<string, ReturnType<typeof window.L.marker>>>(new Map());
  const isInitializedRef = useRef(false);

  // Initialize map
  useEffect(() => {
    if (!mapRef.current || isInitializedRef.current) return;

    // Dynamically import leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    import("leaflet").then((L) => {
      if (!mapRef.current || isInitializedRef.current) return;
      isInitializedRef.current = true;

      const map = L.map(mapRef.current, {
        center: [28.0, 69.5], // Center on Pakistan
        zoom: 6,
        zoomControl: false,
      });

      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Free OpenStreetMap tiles — no API key required
      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }
      ).addTo(map);

      mapInstanceRef.current = map;

      // Add markers
      const addMarkers = (dealerList: Dealer[]) => {
        // Remove old markers
        markersRef.current.forEach((m) => m.remove());
        markersRef.current.clear();

        dealerList.forEach((dealer) => {
          const coords = DEALER_COORDS[dealer.name];
          if (!coords) return;

          const icon = L.divIcon({
            className: "",
            html: `
              <div style="
                width: 36px;
                height: 36px;
                background: #00C853;
                border: 2px solid #000;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 12px rgba(0,200,83,0.5);
              ">
                <span style="transform: rotate(45deg); font-size: 14px;">⚡</span>
              </div>
            `,
            iconSize: [36, 36],
            iconAnchor: [18, 36],
            popupAnchor: [0, -36],
          });

          const popup = L.popup({
            className: "elfa-popup",
            closeButton: true,
            maxWidth: 280,
          }).setContent(`
            <div style="background:#111; color:#fff; border: 1px solid rgba(255,255,255,0.1); border-radius:8px; padding:14px; font-family: system-ui, sans-serif;">
              <div style="color:#00C853; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px;">ELFA Authorized Dealer</div>
              <h3 style="font-size:16px; font-weight:700; margin:0 0 8px 0;">${dealer.name}</h3>
              <p style="font-size:13px; color:rgba(255,255,255,0.7); margin:0 0 10px 0; line-height:1.5;">${dealer.address}</p>
              <p style="font-size:14px; font-weight:600; color:#00C853; margin:0 0 12px 0;">${dealer.phones[0]}</p>
              <a href="https://maps.google.com/?q=${encodeURIComponent(dealer.mapQuery || dealer.address)}" target="_blank" style="display:inline-block; background:#00C853; color:#000; font-size:12px; font-weight:700; padding:6px 14px; border-radius:4px; text-decoration:none; text-transform:uppercase; letter-spacing:1px;">Get Directions</a>
            </div>
          `);

          const marker = L.marker(coords, { icon }).addTo(map).bindPopup(popup);
          markersRef.current.set(dealer.name, marker);
        });
      };

      addMarkers(dealers);

      // Inject popup styles
      const style = document.createElement("style");
      style.textContent = `
        .elfa-popup .leaflet-popup-content-wrapper { background: transparent !important; border: none !important; box-shadow: 0 4px 24px rgba(0,0,0,0.8); }
        .elfa-popup .leaflet-popup-tip { background: #111 !important; }
        .elfa-popup .leaflet-popup-content { margin: 0 !important; }
        .leaflet-container { background: #050505; }
      `;
      document.head.appendChild(style);
    });

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when dealer list changes
  useEffect(() => {
    if (!mapInstanceRef.current || !isInitializedRef.current) return;

    import("leaflet").then((L) => {
      const map = mapInstanceRef.current!;
      markersRef.current.forEach((m) => m.remove());
      markersRef.current.clear();

      dealers.forEach((dealer) => {
        const coords = DEALER_COORDS[dealer.name];
        if (!coords) return;

        const icon = L.divIcon({
          className: "",
          html: `
            <div style="
              width: 36px;
              height: 36px;
              background: #00C853;
              border: 2px solid #000;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 12px rgba(0,200,83,0.5);
            ">
              <span style="transform: rotate(45deg); font-size: 14px;">⚡</span>
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 36],
          popupAnchor: [0, -36],
        });

        const popup = L.popup({
          className: "elfa-popup",
          closeButton: true,
          maxWidth: 280,
        }).setContent(`
          <div style="background:#111; color:#fff; border: 1px solid rgba(255,255,255,0.1); border-radius:8px; padding:14px; font-family: system-ui, sans-serif;">
            <div style="color:#00C853; font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; margin-bottom:6px;">ELFA Authorized Dealer</div>
            <h3 style="font-size:16px; font-weight:700; margin:0 0 8px 0;">${dealer.name}</h3>
            <p style="font-size:13px; color:rgba(255,255,255,0.7); margin:0 0 10px 0; line-height:1.5;">${dealer.address}</p>
            <p style="font-size:14px; font-weight:600; color:#00C853; margin:0 0 12px 0;">${dealer.phones[0]}</p>
            <a href="https://maps.google.com/?q=${encodeURIComponent(dealer.mapQuery || dealer.address)}" target="_blank" style="display:inline-block; background:#00C853; color:#000; font-size:12px; font-weight:700; padding:6px 14px; border-radius:4px; text-decoration:none; text-transform:uppercase; letter-spacing:1px;">Get Directions</a>
          </div>
        `);

        const marker = L.marker(coords, { icon }).addTo(map).bindPopup(popup);
        markersRef.current.set(dealer.name, marker);
      });
    });
  }, [dealers]);

  // Fly to active dealer
  useEffect(() => {
    if (!mapInstanceRef.current || !activeDealer || !isInitializedRef.current) return;

    const coords = DEALER_COORDS[activeDealer.name];
    if (!coords) return;

    mapInstanceRef.current.flyTo(coords, 14, { duration: 0.8 });

    const marker = markersRef.current.get(activeDealer.name);
    if (marker) {
      setTimeout(() => marker.openPopup(), 800);
    }
  }, [activeDealer]);

  return <div ref={mapRef} className="h-full w-full" />;
}
