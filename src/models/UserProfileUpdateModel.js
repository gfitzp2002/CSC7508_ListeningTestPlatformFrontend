class UserProfileUpdateModel {
    constructor(userForename, userSurname, userEmail, twitter, instagram, facebook) {
        this.userForename = userForename;
        this.userSurname = userSurname;
        this.userEmail = userEmail;
        this.twitter = twitter;
        this.instagram = instagram;
        this.facebook = facebook;
    }
}

export default UserProfileUpdateModel;
