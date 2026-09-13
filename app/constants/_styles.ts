import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Main container
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa'
  },

  // Header
  header: { height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f9fa' },
  headerLeft: { height: 40, width: '100%', paddingLeft: 10, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: '#f8f9fa' },
  headerText: { fontSize: 24, fontWeight: 'bold' },

  // Footer / extra text
  footerText: { marginTop: 20, fontSize: 14, color: '#555' },

  // Titles
  title: { fontSize: 28, fontWeight: '700', marginBottom: 40 },

  // Input fields
  input: { 
    width: '100%', 
    padding: 15, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },

  // Buttons
  button: { 
    width: '100%', 
    backgroundColor: '#007bff', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginBottom: 15 
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // Links
  link: { color: '#007bff', fontWeight: '500' },
  dangerLink: { color: '#fa0202', fontWeight: '500' },

  // Listing / text styles
  listingText: { fontSize: 16, color: '#000000ff' },
  error: { fontSize: 16, color: '#fa0202'},

  // Layout sections
  top: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  middle: { flex: 2, justifyContent: 'center', alignItems: 'center' },
  bottom: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  watchlist: { flex: 4, backgroundColor: '#fafafa', padding: 10 },

  // Item chips
  chipContainer: { height: 60},
  chip: {
    backgroundColor: "#e0f7fa",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: { fontWeight: "bold", fontSize: 14 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
});
