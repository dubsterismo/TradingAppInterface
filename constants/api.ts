// Base URL for the Flask backend. `127.0.0.1` only resolves on the same machine
// (a simulator/emulator sharing the host's network), never from a physical device,
// so this is overridable via an Expo public env var for real-device testing:
//
//   EXPO_PUBLIC_API_URL=http://192.168.1.23:5000 npx expo start
//
// (find your machine's LAN IP, e.g. `ipconfig getifaddr en0` on macOS)
export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:5000";
