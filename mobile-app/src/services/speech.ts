/**
 * Free, local-only placeholders for speech features.
 * Replace with a free library integration when wiring to device APIs.
 */

export async function startSpeechToText(): Promise<string> {
  // Placeholder for free STT integration (e.g., react-native-voice, Vosk, Whisper.cpp mobile)
  return Promise.resolve('add 2 margherita pizza');
}

export async function speakText(text: string): Promise<void> {
  // Placeholder for free TTS integration (e.g., expo-speech / react-native-tts in offline/local mode)
  console.log('[TTS]', text);
}
