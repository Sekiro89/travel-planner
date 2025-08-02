const GEOAPIFY_KEY = "8c64c89911f94fbda370222a95fe66b1";
const UNSPLASH_ACCESS_KEY = "Z2dlpONxymn5yZjOgpA51BiYl9gnL6Wan3ucW8Okun0";

export async function getPlacesAround(lat, lon, radius = 10000, limit = 10) {
  const res = await fetch(
    `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&limit=${limit}&apikey=${GEOAPIFY_KEY}`
  );
  const data = await res.json();

  const details = await Promise.all(
    data.features.map(async (place) => {
      const xid = place.properties.xid;
      const detailRes = await fetch(
        `https://api.opentripmap.com/0.1/en/places/xid/${xid}?apikey=${GEOAPIFY_KEY}`
      );
      const detail = await detailRes.json();

      const fallbackQuery = detail.kinds?.split(",")[0] || "travel";
      const query = `${detail.name || ""} ${fallbackQuery}`;
      const image = await getImageForPlace(query.trim());

      return {
        id: xid,
        title: detail.name,
        description: detail.wikipedia_extracts?.text || detail.kinds,
        lat: detail.point.lat,
        lon: detail.point.lon,
        image: image,
      };
    })
  );

  return details;
}

export async function getImageForPlace(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
  );
  const data = await res.json();

  if (!data?.results?.[0]) {
    console.warn("No Unsplash image found for:", query);
  }

  return data?.results?.[0]?.urls?.regular || "https://via.placeholder.com/280x350";
}
