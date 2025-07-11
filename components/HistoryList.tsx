import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getHistory } from "../utils/storage";
import {useState, useEffect} from 'react'
export default function HistoryList({ onSelect }: { onSelect: (item: any) => void }) {
  const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
    setHistory(getHistory());
    const interval = setInterval(() => setHistory(getHistory()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!history.length) return null;

  return (
    <View>
      <Text style={styles.header}>History</Text>
      <FlatList
        data={history}
        keyExtractor={item => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text style={styles.item}>{item.display_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontWeight: "bold", fontSize: 18, marginTop: 16, marginBottom: 6, marginLeft: 4 },
  item: { padding: 8, borderBottomColor: "#eee", borderBottomWidth: 1, fontSize: 16 }
});
