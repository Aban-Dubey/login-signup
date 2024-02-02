// Frontend
Frontend of the app is designed using React.js. The app contains components for Username, Password, Register, Profile, Recovery, Reset and PageNotFound.
'zustand' is used to maintain the central store to store user details.
helper.js is used to make the client side code communicate with the server.
validate.js makes sure that valid input is entered by the user while submitting details in the forms.
Image information is stored as a base64 string.
The app also demonstrate the use of the creation and usage of custom hooks to call the desired routes at various stages of the application, as and when needed.


//Backend
Node.js and Express.js is used to code the backend servers.
JWT token is created when the user logs in and maintained for the further usage in the application.
Nodemailer is used to send mails to server the purpose of 'Successful Registration' and 'Password Recovery'.
Standard HTTP routes(GET, POST, PUT) are used to call the controller functions as per the user requests.
Proper user authentication is made sure before allowing to access sensitive routes like resetPassword, updateProfile, etc.

//Database
Data is stored in the Amazon clusters using MongoDB Atlas.
Password is stored as hash for enhanced security.
It is made that the password field is never returned while sending user details on API requests.
The generation and verification of OTP is made mandatory before updating the user password to add an extra level of authentication.
