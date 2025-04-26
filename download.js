export default async function handler(req, res) {
    // Google Drive API direct download link (replace with your own file ID and API key)
    const fileUrl = "https://www.googleapis.com/drive/v3/files/1Gf_3zoyi0XQ4NttJeUk5gY3YepzHgPr2?alt=media&key=YOUR_GOOGLE_API_KEY";

    try {
        // Fetch file from Google Drive
        const response = await fetch(fileUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch file from Google Drive.");
        }

        const fileBuffer = await response.buffer(); // Convert the file to buffer

        // Set headers to force download with the new filename
        res.setHeader("Content-Type", "application/vnd.android.package-archive"); // APK MIME type
        res.setHeader("Content-Disposition", "attachment; filename=PPCTODA.apk"); // Renamed filename
        res.status(200).send(fileBuffer); // Send the file content as response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
