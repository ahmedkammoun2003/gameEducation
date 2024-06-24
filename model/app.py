from flask import Flask, request, jsonify
from transformers import T5Tokenizer, T5ForConditionalGeneration
import logging
from huggingface_hub import login
from dotenv import load_dotenv
import os
import random
from flask_cors import CORS

load_dotenv()

logging.basicConfig(level=logging.INFO)

try:
    login(os.getenv('Huggingface'))
    logging.info("Successfully logged in to Hugging Face")
except Exception as e:
    logging.error(f"Failed to login to Hugging Face: {e}")
    exit(1)

app = Flask(__name__)

CORS(app)

# Load the model and tokenizer
model_id = "google/flan-t5-base"

try:
    tokenizer = T5Tokenizer.from_pretrained(model_id)
    model = T5ForConditionalGeneration.from_pretrained(model_id)
    model.to('cuda')  # Ensure the model is on the GPU for faster inference
    logging.info(f"Successfully loaded model and tokenizer for {model_id}")
except Exception as e:
    logging.error(f"Error loading model/tokenizer: {e}")
    exit(1)

def generate_text(prompt, max_length=20, num_beams=1):
    try:
        logging.info(prompt)
        inputs = tokenizer(prompt, return_tensors="pt").to('cuda')
        outputs = model.generate(inputs.input_ids, max_length=max_length, num_beams=num_beams, early_stopping=True)
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        logging.info(generated_text)
        return generated_text
    except Exception as e:
        logging.error(f"Error generating text: {e}")
        raise

def generate_mcq(input_text):
    try:
        question_prompt = f"Generate a unique multiple choice question about: {input_text}."
        question = generate_text(question_prompt, max_length=20)

        correct_prompt = f"Provide the correct answer for: {question}"
        correct_answer = generate_text(correct_prompt, max_length=20)

        wrong_prompt = f"Provide an incorrect answer for: {question}"
        wrong_answers = set()
        while len(wrong_answers) < 1:
            wrong_answer = generate_text(wrong_prompt, max_length=20)
            wrong_answers.add(wrong_answer)

        mcq = {
            'question': question,
            'options': [correct_answer] + list(wrong_answers)
        }
        random.shuffle(mcq['options'])
        return mcq
    except Exception as e:
        logging.error(f"Error generating MCQ: {e}")
        raise

@app.route('/question', methods=['POST'])
def llama3():

    data = request.json
    input_text = data.get('input', '')
    logging.info(f"Received request to generate MCQ for {input_text}")
    if not input_text:
        return jsonify({'error': 'No input text provided'}), 400

    try:
        output_text = generate_mcq(input_text)
        return jsonify({'output': [output_text]})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=4000,debug=True)
