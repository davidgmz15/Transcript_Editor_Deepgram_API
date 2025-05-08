const fs = require('fs');
const { createClient } = require("@deepgram/sdk");
require("dotenv").config();

const transcribe = async () => {
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  // === CONFIGURABLE OUTPUT CONTROLS ===
  const minConfidence = 0.00; // Only include words >= this confidence
  const maxConfidence = 1.00;  // Only include words <= this confidence
  const speakerId = null; // Set to a number to filter by speaker, or null for all
  const showSpeakerLabels = true; // Toggle this to show/hide speaker identification
  const highlightThreshold = 0.30; // Words below this confidence will be highlighted, null for no highlighting
  const speakerNames = { 0: 'Bob', 1: 'Joe' };

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    fs.readFileSync("example.wav"),  // change this to the file you want to transcribe
    {
      model: "nova-3",
      smart_format: true,
      diarize: true, // Always enable diarization for speaker info
    }
  );

  if (error) throw error;

  // Extract words from the response
  const words = result.results.channels[0].alternatives[0].words;

  // Filter words by confidence and speaker (if diarization is enabled)
  const filteredWords = words.filter(word =>
    word.confidence >= minConfidence &&
    word.confidence <= maxConfidence &&
    (speakerId === null || word.speaker === speakerId)
  );

  if (filteredWords.length === 0) {
    console.log('Filtered Transcript: (no words matched the confidence/speaker filter)');
    return;
  }

  let output = '';

  if (showSpeakerLabels && speakerId === null) {
    // Print with speaker labels and switch logic
    let lastSpeaker = null;
    filteredWords.forEach(word => {
      const speakerLabel = `[${speakerNames[word.speaker] || `Speaker ${word.speaker + 1}`}]`;
      if (word.speaker !== lastSpeaker) {
        output += `\n${speakerLabel} `;
        lastSpeaker = word.speaker;
      }
      output += word.confidence < highlightThreshold
        ? `*${word.punctuated_word || word.word}* `
        : (word.punctuated_word || word.word) + ' ';
    });
  } else {
    // Just print the filtered transcript
    output = filteredWords.map(word =>
      word.confidence < highlightThreshold
        ? `*${word.punctuated_word || word.word}*`
        : (word.punctuated_word || word.word)
    ).join(' ');
    if (showSpeakerLabels && speakerId !== null) {
      output = `[${speakerNames[speakerId] || `Speaker ${speakerId + 1}`}] ` + output;
    }
  }

  console.log(output.trim());
};

transcribe();
