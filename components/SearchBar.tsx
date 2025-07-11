import { getCache, setCacheAPI } from "@/utils/storage";
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";

const NOMINATIM_URL =
  "https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=";

export default function SearchBar({
  onSelect,
}: {
  onSelect: (item: any) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setResults([]);
      return;
    }
    const cachedData = getCache(query);
    if (cachedData.length > 0) {
      setResults(cachedData);
      return;
    }
    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(NOMINATIM_URL + encodeURIComponent(query))
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCacheAPI(query,data);
          setResults(data);
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <View>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for a place..."
      />
      {loading && <Text style={styles.loading}>Loading...</Text>}
      <FlatList
        style={styles.slider}
        data={results}
        keyExtractor={(item) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              onSelect(item);
              setQuery("");
              setResults([]);
            }}
          >
            <Text style={styles.result}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 12,
    fontSize: 18,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
  },
  loading: { color: "#666", marginLeft: 12 },
  result: {
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    fontSize: 16,
  },
  slider: { zIndex: 3333 },
});
