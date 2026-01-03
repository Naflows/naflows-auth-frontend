const AccountUserBodyProfilePicture = ({
  profilePictureUrl,
  firstName,
  lastName,
}: {
  profilePictureUrl: string | undefined;
  firstName?: string;
  lastName?: string;
}) => {
  return (
    <>
      {profilePictureUrl ? (
        <img
          src={profilePictureUrl}
          alt={`${firstName || ""} ${lastName || ""}`.trim() || "Profile picture"}
          className="profile-picture"
        />
      ) : (
        <div className="profile-picture placeholder">
          {firstName ? firstName.charAt(0).toUpperCase()+ (lastName ? lastName.charAt(0).toUpperCase() : "") : "U"}
        </div>
      )}
    </>
  );
};


export default AccountUserBodyProfilePicture;