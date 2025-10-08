export const API_URL = "http://127.0.0.1:5000"; // TEMPORARY EMULATOR URL

export const fetchData = async (symbol: string) => {
  try {
    const res = await fetch(`${API_URL}/stock/${symbol}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching stock:", err);
  }
};
