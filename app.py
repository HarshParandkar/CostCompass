from flask import Flask, request, jsonify
from flask_cors import CORS
from scraping.scraper import scrape_product_prices_by_specs, scrape_product_prices_by_make_model
import mysql.connector
import bcrypt



app = Flask(__name__)
CORS(app)

# Database configuration
db_config = {
    'user': 'root',  # Replace with your MySQL username
    'password': 'Venu@72567',  # Replace with your MySQL password
    'host': 'localhost',
    'database': 'costcompass',
}

@app.route('/')
def welcome():
    return "Welcome to the Cost Compass API"

# Registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        if cursor.fetchone():
            return jsonify({'message': 'User already exists!'}), 400

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", 
                       (username, hashed_password))
        conn.commit()

        return jsonify({'message': 'User registered successfully!'}), 201

    finally:
        cursor.close()
        conn.close()

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
        result = cursor.fetchone()

        if not result or not bcrypt.checkpw(password.encode('utf-8'), result[0].encode('utf-8')):
            return jsonify({'message': 'Invalid username or password!'}), 401

        return jsonify({'message': 'Login successful!'}), 200

    finally:
        cursor.close()
        conn.close()

# Make and model query route
@app.route('/make-model-query', methods=['POST'])
def make_model_query():
    data = request.json
    try:
        product_name = data.get('product_name')
        make = data.get('make')
        model = data.get('model')

        print(f"Received query: {product_name} {make} {model}")

        results = scrape_product_prices_by_make_model(product_name, make, model)
        
        if 'error' in results:
            print(f"Scraping error: {results['error']}")
            return jsonify({'message': results['error']}), 500
        
        if not results:
            return jsonify({'message': 'No products found'}), 404

        return jsonify(results), 200
    except Exception as e:
        print(f"Error processing query: {e}")
        return jsonify({'message': 'An error occurred while processing the query.'}), 500

# Specification query route
@app.route('/specification-query', methods=['POST'])
def specification_query():
    try:
        data = request.get_json()
        product_name = data.get('product_name')
        specifications = data.get('specifications')
        products = scrape_product_prices_by_specs(product_name, specifications)
        return jsonify(products), 200
    except Exception as e:
        print(f"Error occurred: {e}")
        return jsonify({"message": "An error occurred while processing the query."}), 500

if __name__ == '__main__':
    app.run(debug=True)
