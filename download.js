// Vercel Function to proxy Google Drive download and rename the file
const fetch = require('node-fetch');  // Importing fetch to fetch the file

module.exports = async (req, res) => {
    // Define your Google Drive file ID here
    const fileId = "1Gf_3zoyi0XQ4NttJeUk5gY3YepzHgPr2";  // Replace with your file ID
    const apiKey = "YOUR_GOOGLE_API_KEY";  // Replace with your Google API key

    // Construct Google Drive API URL for file download
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;

    try {
        // Fetch the file from Google Drive
        const response = await fetch(url);
        
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
