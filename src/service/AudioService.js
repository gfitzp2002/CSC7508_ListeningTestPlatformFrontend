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
  
export { getAudio };
  