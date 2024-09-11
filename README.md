# news saver extension

## Table of Contents
- [Objective](#objective)
- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Objective

Develop a Chrome browser extension that enhances the user experience on [nos.nl](http://nos.nl/) by allowing users to save news articles locally.

---

---

## Requirements

1. **Extension Functionality:**
   - Add a "Save article" button to each news article on the [nos.nl](http://nos.nl/) main page.
   - When clicked, save the news article details to a local JSON file.
   - Organize saved articles by date, creating a new entry for each day the user saves articles.

2. **JSON Structure:**
   - The JSON file should be structured with dates as the main keys.
   - Under each date, store an array of saved news articles.

3. **Version Control:**
   - Use Git for version control.
   - Create a public GitHub repository for the project.

## Project Structure

```
aq-button-extension/
├── manifest.json
├── background.js
├── content_script.js
├── popup.html
├── popup.js
└── README.md
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/aq-button-extension.git
   ```

2. Open the folder in Google Chrome:
   ```
   cd aq-button-extension
   chrome --load-extension .
   ```

## Usage

1. Navigate to [nos.nl](http://nos.nl/).
2. The extension will automatically inject a "Save article" button below each article.
3. Click the button to save the article.
4. To view saved articles, click the "View Saves" button in the extension popup.
