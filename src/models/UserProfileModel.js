class UserProfile {
    constructor(personalInfo, socialMedia, quizStats, profileImage) {
        this.personalInfo = personalInfo;
        this.socialMedia = socialMedia;
        this.quizStats = quizStats;
        this.profileImage = profileImage;
    }

    
}

// Nested classes to help group relevant data together 
UserProfile.PersonalInfo = class PersonalInfo {
    constructor(username, userForename, userSurname, userEmail) {
        this.username = username;
        this.userForename = userForename;
        this.userSurname = userSurname;
        this.userEmail = userEmail;
    }
};

UserProfile.SocialMedia = class SocialMedia {
    constructor(twitter, instagram, facebook) {
        this.twitter = twitter;
        this.instagram = instagram;
        this.facebook = facebook;
    }
};

UserProfile.QuizStats = class QuizStats {
    constructor(totalPoints, strongCategory, mostPlayed, daysInARow, daysThisMonth) {
        this.totalPoints = totalPoints;
        this.strongCategory = strongCategory;
        this.mostPlayed = mostPlayed;
        this.daysInARow = daysInARow;
        this.daysThisMonth = daysThisMonth;
    }
};

export default UserProfile;
