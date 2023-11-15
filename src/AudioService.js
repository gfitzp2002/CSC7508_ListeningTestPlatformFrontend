const getAudio = async (file) => {
    const srcUrl = 'http://localhost:8080/assets/audio/';
    
    try {

      const audioUrl = srcUrl + file;
      console.log("audio url - " + audioUrl);

      
      return audioUrl;
    } catch (error) {
      console.error('Error fetching audio URL:', error);
      return null;
    }
  };
  
  export { getAudio };
  