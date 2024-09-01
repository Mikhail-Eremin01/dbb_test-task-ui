# Project Documentation

## Notes

I only had the error "This app has reached its user limit. Contact the app developer and ask them to use the Dropbox API App Console to increase their app's user limit." once, when I tried to log in as another user and I couldn't log in, but then everything was fine, I really hope you won't have it

## About the Project

This React web application is a simple file explorer with basic file and folder management functionalities. The application interface is fully adaptive and designed. Whether you're on a desktop, tablet, or mobile device, the UI adjusts to provide an optimal user experience. The application includes the following tabs and features:

### Tabs

1. **All Files**
   - This tab displays all files and folders with supported extensions: `.pdf`, `.jpeg`, `.jpg`, `.gif`, `.png`.
   - New files can be added using the drag-and-drop feature. Currently, only one file can be added at a time (`multiple=false`).
   - Files with extensions `.jpeg`, `.png`, `.gif`, `.jpg` can be viewed within the application, while `.pdf` files can only be downloaded.

2. **Deleted Files**
   - This tab shows files that have been deleted.
   - Files can be restored, but only if they are in the root directory. Folder restoration is not yet supported. Here you can see only deleted files from top level. 
   - If you would delete some files from nested folders - you won't be able to see them in the deleted files tab. They can be seen in the Dropbox app itself.

3. **Photos**
   - This tab is intended for storing and processing image files only. Currently, this tab is not implemented.

4. **Videos**
   - This tab is intended for storing and processing video files only. Currently, this tab is not implemented.

5. **Docs**
   - This tab is intended for storing and processing document files only. Currently, this tab is not implemented.

### Authorization

- The application uses Dropbox for authentication. Upon first access, the user will be prompted to authenticate via Dropbox, which will provide a token.
- The token is stored on the client and checked with each request using middleware.
- If the token expires, the user is redirected to the authentication page and must log in again.

## Installation and Setup

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mikhail-Eremin01/dbb_test-task-ui.git
   
2. Navigate to the project directory:

   ```bash
   cd dbb_test-task-ui
    
3. Install all necessary dependencies:

   ```bash
   npm install
    
### Running the Application

1. Setting Up the Server

   Before running the client application, you need to set up and start the server on port 4000. Follow these steps:

   * Navigate to the server application directory.
   * Install all necessary dependencies using the following command:
     ```bash
     npm install
     ```
   * Start the server:
     ```bash
     npm start
     ```

2. Running the Client Application

   After starting the server, follow these steps to run the client application:

   * Start the client application:
     ```bash
     npm start
     ```
   * Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

   This will start the client application, which will automatically reload when changes are made.
        