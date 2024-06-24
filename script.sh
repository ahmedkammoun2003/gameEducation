#!/bin/bash

# Function to start the client (Vite)
start_client() {
    echo "Starting client..."
    cd client || { echo "Client folder not found"; exit 1; }
    npm install
    npm run dev &
    CLIENT_PID=$!
    cd ..
}

# Function to start the API (Express.js)
start_api() {
    npm install
    echo "Starting API..."
    cd api || { echo "API folder not found"; exit 1; }
    npm start &
    API_PID=$!
    cd ..
}

# Function to start the model (Python)
start_model() {
    echo "Starting model..."
    cd model || { echo "Model folder not found"; exit 1; }
    python -m venv venv
    source venv/scripts/activate
    pip install -r requirements.txt
    python app.py &
    MODEL_PID=$!
    cd ..
}

# Function to stop all processes
stop_all() {
    echo "Stopping all services..."
    kill $CLIENT_PID
    kill $API_PID
    kill $MODEL_PID
    echo "All services stopped."
}

# Start all services
start_client
start_api
start_model

# Trap CTRL+C to stop all services
trap stop_all INT

# Wait for all services to exit
wait $CLIENT_PID $API_PID $MODEL_PID
