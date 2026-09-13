from flask import Flask, jsonify
from flask_cors import CORS
from utils import get_nasdaq,get_nyse,atr,averageVolume,stockFloat,sma,ohlcv,closingPrices,longTrendHighMomentum,shortRsiThrust,CURRENT_TICKERS
import yfinance as yf
import pandas as pd
import ta

app = Flask(__name__)
CORS(app)  # allow cross-origin requests

# tickers
@app.route("/home_page")
def home_page():
    result = []
    for ticker in CURRENT_TICKERS:
        result.append(closingPrices(ticker))

    return result


# stock chart
@app.route("/stock_charts")
def stock_chart():
    result = {}
    for ticker in CURRENT_TICKERS:
        result[ticker] = ohlcv(ticker)
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
