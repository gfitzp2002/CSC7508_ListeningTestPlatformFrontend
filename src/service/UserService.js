import axios from './AxiosConfig';
import UserProfileModel from '../models/UserProfileModel';
import UserProfileUpdateModel from '../models/UserProfileUpdateModel';

const PROFILE_URL = '/user-profile'; // Update the API URL without the username placeholder

const getUserProfile = async (username) => {
    console.log("getUserProfile() called");
    try {
        // Make the GET request to fetch the user profile data
        const response = await axios.get(`${PROFILE_URL}/${username}`);
  
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

const updateUserProfile = async (username, updatedProfileData) => {

    try {
        //Make PUT request to update the profile assocaited to the username
        const response = await axios.put(`${PROFILE_URL}/${username}/update`, updatedProfileData);
        // Handle the response if needed
        console.log('Profile updated successfully:', response.data);
        return response.data; // Return the updated profile data or any other response from the server
    } catch (error) {
        // Handle error
        console.error('Error updating user profile:', error);
        throw error; // Rethrow the error to be handled by the caller
    }

};




export { getUserProfile, updateUserProfile };
