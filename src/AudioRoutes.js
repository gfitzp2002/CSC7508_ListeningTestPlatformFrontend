// AudioRoutes.js
const getAudio = async (id) => {
    const endpoint = `http://localhost:8080/api/audio/${id}`;
    const srcUrl = 'http://localhost:8080/assets/audio/';
    try {
      const response = await fetch(endpoint); 
      if (!response.ok) {
        throw new Error('No response received');
      }
      //assign audio object received from api to variable
      const data = await response.json();
      //extract audio filename and file type
      const audioFileName = data.audioFileName;
      const audioFileType = data.fileType;
      //build complete url of audio file
      const audioUrl = srcUrl + audioFileName + audioFileType;
      console.log(audioUrl);
      console.log(data);
      
      return audioUrl;
    } catch (error) {
      console.error('Error fetching audio URL:', error);
      return null;
    }
  };
  
  export { getAudio };
  