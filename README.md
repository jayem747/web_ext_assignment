# NOS web extension assignment

## Table of Contents
- [Objective](#objective)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)

## Objective

Develop a Chrome browser extension that enhances the user experience on [nos.nl](http://nos.nl/) by allowing users to save news articles locally.

---

---

## Requirements

1. **Extension Functionality:**
   - Add a "Save article" button to each news article on the [nos.nl](http://nos.nl/) website.
   - When clicked, save the news article details to a local JSON file.
   - Organize saved articles by date, creating a new entry for each day the user saves articles.

2. **JSON Structure:**
   - The JSON file should be structured with dates as the main keys.
   - Under each date, store an array of saved news articles.

3. **Version Control:**
   - Use Git for version control.
   - Create a public GitHub repository for the project.


## Installation

1. Clone the repository

2. Open the folder in Google Chrome


## Usage

1. Navigate to [nos.nl](http://nos.nl/).
2. The extension will automatically inject a "Save article" button below each article.
3. Click the button to save the article.
4. To view saved articles, click the "View Saves" button in the extension popup.
