const getAudio = async (filename) => {
    const API_URL = 'http://localhost:8080/assets/audio/';
    
    try {

      const audioUrl = API_URL + filename;
      console.log("audio url - " + audioUrl);

      
      return audioUrl;
    } catch (error) {
      console.error('Error fetching audio URL:', error);
      return null;
    }
  };

    //helper function to conditionally render question text
    const getAudioDescription = (questionData, isReference) => {
      let description;
      switch (questionData.soundSource) {
          case 'sine wave':
              description = isReference ? `a ${questionData.referencePitch} sine wave` : `a sine wave at a specific frequency`;
              break;
          case 'piano':
              description = isReference ? `a recording of a piano note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a piano note with a specific fundamental frequency`;
              break;
          case 'harp':
              description = isReference ? `a recording of a harp note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a harp note with a specific fundamental frequency`;
              break;
          case 'marimba':
              description = isReference ? `a recording of a marimba note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a marimba note with a specific fundamental frequency`;
              break;
          case 'guitar':
              description = isReference ? `a recording of a guitar note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a guitar note with a specific fundamental frequency`;
              break;
          case 'pink noise':
              description = isReference ? `a one-octave band of pink noise with a centre frequency of ${questionData.referencePitch}` : `a one-octave band of pink noise with a specific centre frequency`;
              break;
          case 'pink noise 3rd octave':
              description = isReference ? `a 1/3 octave band of pink noise with a centre frequency of ${questionData.referencePitch}` : `a 1/3 octave band of pink noise with a specific centre frequency`;
              break;
          default:
              description = 'an audio recording';
              break;
      }
      return description;
  };
  
export { getAudio, getAudioDescription };
  