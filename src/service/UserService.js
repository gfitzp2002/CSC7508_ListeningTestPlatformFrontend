import axios from './AxiosConfig';
import UserProfileModel from '../models/UserProfileModel';

const API_URL = '/user-profile'; // Update the API URL without the username placeholder

const getUserProfile = async (username) => {
    try {
        // Make the GET request to fetch the user profile data
        const response = await axios.get(`${API_URL}/${username}`); // Append the username to the URL
  
        // Destructure the response data to extract personalInfo, socialMedia, and quizStats
        const { personalInfo, socialMedia, quizStats, profileImage } = response.data;
  
        // Create instances of nested classes and pass them to the UserProfile constructor
        const userProfile = new UserProfileModel(
            new UserProfileModel.PersonalInfo(personalInfo.username, personalInfo.userForename, personalInfo.userSurname, personalInfo.userEmail),
            new UserProfileModel.SocialMedia(socialMedia.twitter, socialMedia.instagram, socialMedia.facebook),
            new UserProfileModel.QuizStats(quizStats.totalPoints, quizStats.strongCategory, quizStats.mostPlayed, quizStats.daysInARow, quizStats.daysThisMonth),
            profileImage
        );
        
        console.log(JSON.stringify(userProfile));
        return userProfile; // Return the UserProfile instance
    } catch (error) {
        console.error('Error fetching user profile data:', error.message);
        return null;
    }
};

export { getUserProfile };
