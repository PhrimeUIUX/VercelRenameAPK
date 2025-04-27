const fetch = require('node-fetch');  // Importing fetch to fetch the file

module.exports = async (req, res) => {
    // Use your provided Google Drive API URL here
    const fileUrl = "https://www.googleapis.com/drive/v3/files/1Gf_3zoyi0XQ4NttJeUk5gY3YepzHgPr2?alt=media&key=AIzaSyAu6mGx3GD9rdC25yYuqWYGbEEeaMCOPRg"; 

    try {
        // Fetch the file from Google Drive using the provided URL
        const response = await fetch(fileUrl);
        
        // Check if the request was successful
        if (!response.ok) {
            res.status(500).send("Failed to fetch the file.");
            return;
        }

        // Set the correct Content-Type for APK file
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        
        // Set the Content-Disposition header to force download with a custom filename
        res.setHeader('Content-Disposition', 'attachment; filename="PPCTODA.apk"');

        // Pipe the file content directly to the response (this makes the file downloadable)
        response.body.pipe(res);

    } catch (error) {
        console.error("Error fetching file:", error);
        res.status(500).send("Error fetching file.");
    }
};
