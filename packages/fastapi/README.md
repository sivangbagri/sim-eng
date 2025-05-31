# FastAPI Backend for Sim-Eng

This is the FastAPI backend service for the Sim-Eng dApp, providing API endpoints for blockchain interaction and data management.

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
- Windows:
```bash
.\venv\Scripts\activate
```
- Unix/MacOS:
```bash
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create .env file:
```bash
cp .env.example .env
```
Then edit the .env file with your specific configuration.

5. Run the server:
```bash
uvicorn main:app --reload
```

## API Documentation

Once the server is running, you can access:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Available Endpoints

### Health Check
- GET /health - Check if the API is running

### Blockchain
- GET /blockchain/balance/{address} - Get balance of an address
- GET /blockchain/transaction/{tx_hash} - Get transaction details

## Development

### Project Structure
```
fastapi/
├── main.py           # Main application file
├── database.py       # Database configuration
├── requirements.txt  # Python dependencies
├── routers/         # API route handlers
│   └── blockchain.py
├── models/          # Database models
├── schemas/         # Pydantic models
└── tests/           # Test files
```

### Adding New Features
1. Create new routes in the `routers` directory
2. Add models in the `models` directory
3. Define schemas in the `schemas` directory
4. Register new routers in `main.py`

## Testing

Run tests with:
```bash
pytest
```

## Integration with Frontend

The API is configured to work with the Next.js frontend running on http://localhost:3000. Update the CORS settings in `main.py` if your frontend runs on a different port. 