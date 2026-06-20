import { AppSettings } from '../types';

export interface VietnameseVoiceInfo {
  voice: SpeechSynthesisVoice;
  accent: 'north' | 'south' | 'unknown';
  accentLabel: string;
}

/**
 * Categorize a Vietnamese voice object into its respective accent (Northern/Southern).
 */
export function categorizeVoice(v: SpeechSynthesisVoice): 'north' | 'south' | 'unknown' {
  const name = v.name.toLowerCase();
  
  // Microsoft regional names
  if (name.includes('hoaimy')) return 'south';
  if (name.includes('an') || name.includes('namminh')) return 'north';
  
  // Google TTS codes
  // - vif, vic, vie are generally Southern Vietnamese (VIF, VIC)
  // - gvn, gvg are Northern Vietnamese (GVN, GVG)
  if (name.includes('vif') || name.includes('vic') || name.includes('vie')) return 'south';
  if (name.includes('gvn') || name.includes('gvg')) return 'north';
  
  // Apple iOS / macOS voices
  if (name.includes('linh') && !name.includes('south')) {
    // Standard apple voice Linh is Northern
    return 'north';
  }
  
  // Apple Siri Voice 1 and Voice 2
  // Siri Voice 1 is Northern, Siri Voice 2 is Southern
  if (name.includes('siri')) {
    if (name.includes('voice 2') || name.includes('2')) return 'south';
    if (name.includes('voice 1') || name.includes('1')) return 'north';
  }
  
  // Google tiếng Việt default on many systems is Southern-sounding (or is recognized as Southern-leaning)
  if (name.includes('google') || name.includes('vietnam') || name.includes('vietnamese') || name.includes('tiếng việt')) {
    if (name.includes('south')) return 'south';
    if (name.includes('north')) return 'north';
    // By default, make it South if no specific key is found since standard Google TTS web voice is Southern-leaning
    return 'south';
  }

  return 'unknown';
}

/**
 * Retrieve the best matching Vietnamese voice according to the current settings.
 */
export function getBestVietnameseVoice(
  voices: SpeechSynthesisVoice[],
  settings: AppSettings
): SpeechSynthesisVoice | null {
  const viVoices = voices.filter(v => v.lang.toLowerCase().replace('_', '-').startsWith('vi'));
  if (viVoices.length === 0) return null;

  // 1. Check if user manually selected a specific voice and it still exists
  if (settings.selectedVoiceName) {
    const manualVoice = viVoices.find(v => v.name === settings.selectedVoiceName);
    if (manualVoice) return manualVoice;
  }

  // 2. Select matching voice based on automatic accent filter
  if (settings.accent === 'north') {
    // Look for Northern candidates
    const northVoice = viVoices.find(v => categorizeVoice(v) === 'north');
    if (northVoice) return northVoice;
  } else if (settings.accent === 'south') {
    // Look for Southern candidates
    const southVoice = viVoices.find(v => categorizeVoice(v) === 'south');
    if (southVoice) return southVoice;
  }

  // 3. Fallback: If no explicit accent match or set to 'auto', search for any Southern/Northern prioritized or standard default
  // Let's return the first available Vietnamese voice
  return viVoices[0];
}
