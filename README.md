# Deepgram Transcription Tool

A Node.js script that transcribes audio files using Deepgram's API. It supports filtering by confidence, speaker identification, and custom speaker names.

## Features

- Transcribe audio files (WAV, MP3, etc.) using Deepgram's Nova-3 model
- Filter words by confidence level
- Identify and label speakers (with custom names)
- Highlight low-confidence words
- Toggle speaker labels on/off

## Prerequisites

- Node.js (v14 or later)
- A Deepgram API key (sign up at [deepgram.com](https://deepgram.com))

## Setup

1. **Install dependencies:**
   ```bash
   npm install @deepgram/sdk dotenv
   ```

2. **Create a `.env` file** in the project root with your Deepgram API key:
   ```
   DEEPGRAM_API_KEY=your_deepgram_api_key_here
   ```

3. **Place your audio file** (e.g., `example.wav`) in the project directory.

## Usage

1. **Configure the script** (in `transcribe.js`):
   ```js
   // === CONFIGURABLE OUTPUT CONTROLS ===
   const minConfidence = 0.00;    // Only include words >= this confidence
   const maxConfidence = 1.00;    // Only include words <= this confidence
   const speakerId = null;        // Set to a number to filter by speaker, or null for all
   const showSpeakerLabels = true; // Toggle this to show/hide speaker identification
   const highlightThreshold = 0.30; // Words below this confidence will be highlighted
   const speakerNames = { 0: 'Mau', 1: 'David' }; // Custom speaker names
   ```

2. **Run the script:**
   ```bash
   node transcribe.js
   ```

3. **View the output:**
   - The script prints the filtered transcript with optional speaker labels and confidence highlighting.
   - Words with confidence below `highlightThreshold` are wrapped in asterisks.

## Example Output

## Troubleshooting

- **Error: "A deepgram API key is required"**  
  Ensure your `.env` file contains the correct API key.

- **Error: "endpoint.replace is not a function"**  
  Make sure you pass the correct arguments to `transcribeFile` (buffer, mimetype object, options).

- **No output or "no words matched"**  
  Check your confidence thresholds and speaker filters.

## License

MIT
