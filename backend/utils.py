from datetime import datetime,timedelta
import yfinance as yf
import pandas as pd
import ta
import json
import requests

START = datetime.now()-timedelta(days=300)
END = datetime.now()
CURRENT_TICKERS = json.load(open('static_backend/current_tickers.json'))

# get NASDAQ tickers
def get_nasdaq():
    tickers = json.load(open('static_backend/nasdaq_tickers.json'))
    return tickers

# get NYSE tickers
def get_nyse():
    tickers = json.load(open('static_backend/nyse_tickers.json'))
    return tickers

# calculate Average True Range
def atr(df):
    return round((df['High']-df['Low']).mean(),2)

# find average volume
def averageVolume(df):
    return round(df['Volume'].mean())

# find float value
def stockFloat(tick):
    ticker = yf.Ticker(tick)
    return ticker.info.get("floatShares")

# Simple Moving Average calculator
def sma(df,period):
    res = df['Close'].rolling(period).mean()
    res = res.iloc[99:]
    return res

# get OHLCV
def ohlcv(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d",interval="5m")
    hist = hist[["Open","High","Low","Close","Volume"]]
    hist.reset_index(inplace=True)
    hist.rename(columns={"Datetime":"Time"},inplace=True)

    return hist.to_dict(orient="records")

# get close(price)
def closingPrices(ticker):
    stock = yf.Ticker(ticker)
    hist = stock.history(period="1d", interval="1m")[["Close"]]
    hist.reset_index(inplace=True)
    latest = hist.iloc[-1]["Close"]  # get the last (most recent) close

    return {"symbol": ticker, "price": float(latest)}



# 1) Long Trend High Momentum
def longTrendHighMomentum(tick):
    # get data
    spy = yf.download("SPY", start=START, end=END)
    target = yf.download(tick, start=START, end=END)

    # process data
    df = pd.DataFrame(columns=['SMA_25','SMA_50','SMA_100','SPY_CLOSE','SPY_CLOSE > SMA_100','SMA_25 > SMA_50'])
    df['SMA_25'] = sma(target,25)
    df['SMA_50'] = sma(target,50)
    df['SMA_100'] = sma(target,100)
    df['SPY_CLOSE'] = spy['Close']

    # generate signals
    for idx, rec in df.iterrows():
        if rec['SPY_CLOSE'] > rec['SMA_100']:
            df.loc[idx,'SPY_CLOSE > SMA_100'] = 1
        else:
            df.loc[idx,'SPY_CLOSE > SMA_100'] = 0
        
        if rec['SMA_25'] > rec['SMA_50']:
            df.loc[idx,'SMA_25 > SMA_50'] = 1
        else:
            df.loc[idx,'SMA_25 > SMA_50'] = 0


# 2) Short RSI Thrust 
def shortRsiThrust(tick):
    # get data
    target = yf.download(tick, start=START, end=END)

    # process data
    df = pd.DataFrame(columns=['RSI_3day','RSI_3day > 90','Close_2day > Close_1day'])
    df['RSI_3day'] = ta.momentum.RSIIndicator(target['Close'],window=3).rsi()
    
    # generate signals
    for idx, rec in df.iterrows():
        if rec['RSI_3day'] > 90:
            df.loc[idx,'RSI_3day > 90'] = 1
        else:
            df.loc[idx,'RSI_3day > 90'] = 0

    # for idx, rec in target.iterrows():
    #     if rec['Close'] 
        
    # df = pd.DataFrame(columns=)




# test
# pd.set_option("display.width", 1000)
# res = ohlcv("AAPL")
# print(res)