from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
import logging
from huggingface_hub import login
from dotenv import load_dotenv
import os

load_dotenv()

logging.basicConfig(level=logging.INFO)

try:
    login(os.getenv('Huggingface'))
    logging.info("Successfully logged in to Hugging Face")
except Exception as e:
    logging.error(f"Failed to login to Hugging Face: {e}")
    exit(1)

app = Flask(__name__)

# Load the model and tokenizer
model_id = "google/flan-t5-base"

try:
    tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
    model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")
    logging.info(f"Successfully loaded model and tokenizer for {model_id}")
except Exception as e:
    logging.error(f"Error loading model/tokenizer: {e}")
    exit(1)

def generate_text(input_text):
    try:
        inputs = tokenizer(input_text, return_tensors="pt")
        outputs = model.generate(**inputs)
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        return generated_text
    except Exception as e:
        logging.error(f"Error generating text: {e}")
        raise

@app.route('/question', methods=['POST'])
def llama3():
    data = request.json
    input_text = data.get('input', '')
    if not input_text:
        return jsonify({'error': 'No input text provided'}), 400

    try:
        output_text = generate_text(input_text)
        return jsonify({'output': output_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000)
