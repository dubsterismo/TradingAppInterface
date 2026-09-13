import React, { useEffect, useState } from "react";
import { View, ScrollView, Text } from "react-native";
import { CartesianChart, Line } from "victory-native";
import { styles } from "../../constants/_styles";

type Stock = {
    Open: number,
    High: number,
    Low: number,
    Close: number,
    Volume: number,
    Time: string;
};

type StockData = Record<string, Stock[]>;

export default function StockChart() {
    const [stocksData, setStocksData] = useState<StockData>({});

    const fetchStocks = async () => {
        try {
        const response = await fetch("http://127.0.0.1:5000/stock_charts");
        const json = await response.json();
        setStocksData(json);
        } 
        catch (error) {
        console.error("Error fetching stocks:", error);
        }
    };

    useEffect(() => {
        fetchStocks();
        const interval = setInterval(fetchStocks, 5000); 
        return () => clearInterval(interval);
    }, []);
    
    // TEST DATA
    const DATA = Array.from({ length: 31 }, (_, i) => ({
        day: i,
        lowTmp: 20 + 10 * Math.random(),
        highTmp: 40 + 30 * Math.random(),
    }));

    return (
        <ScrollView style={{ flex: 1}} contentContainerStyle={styles.container}>
        {Object.keys(stocksData).map((ticker) => {
            const data = stocksData[ticker];

            const points = data.map((s, idx) => ({
                x: idx,      // or new Date(s.Time) if you want timestamps
                y: s.Close,
            }));

            return (
                <View key={ticker} style={{ marginBottom: 40 }}>
                    <Text style={styles.title}>{ticker} Live Chart</Text>

                    {/* {points.length > 0 ? (
                        <CartesianChart
                            data={points}
                            xKey="x"
                            yKeys={["y"]}
                        >
                            <Line yKey="y" color="blue" strokeWidth={2} />
                        </CartesianChart>
                    ) : (
                        <Text style={styles.footerText}>Loading chart...</Text>
                    )} */}
                </View>
            );
        })}
        </ScrollView>

    )
}
