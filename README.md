# Hypixel Notion Sync

## Overview

Hypixel Notion Sync is a lightweight tool that retrieves Skyblock player stats from the Hypixel API and writes the data into a Notion database. This allows users to organize their in-game profile, tasks, and performance data in one customizable space.

## Important Notes!!!

This project is **NOT** affiliated or endorsed by Hypixel!

This project only recomends the usage of the Hypixel API **once a day**!

## What It Does

- **Fetches Data**: Retrieves Skyblock stats, once per day, for a specified player from the Hypixel API.
- **Syncs with Notion**: Updates a Notion database with the fetched stats, allowing you to track progress and organize tasks.
- **Profile Organization**: Allows to track an user in-game performance and task planning, all within their Notion workspace.

## Setup Instructions

1. Install [Node.js](https://nodejs.org/en/download);
2. Install [Git](https://git-scm.com/downloads); 
#### Installation:

1. Open your terminal and create a folder for the repository.
2. In the terminal, be sure to be inside that folder.
3. Write the following code:

```bash
    git clone https://github.com/jpferreira0/hypixel-notion-sync.git
    cd hypixel-notion-sync
    npm install
```
#### Configuration:

1. Request your Hypixel API key at [Hypixel Developer Dashboard](https://developer.hypixel.net/);
2. Duplicate the following Notion template: [WiP](https://www.notion.com/);
3. Create a Notion API key that links the code to your Notion Database, to do so, follow the initial steps in this video by [Thomas Frank](https://www.youtube.com/watch?v=ec5m6t77eYM&t);
4. Create an .env file similar to the .env-example file (**DO NOT SHARE THE .ENV FILE WITH ANYONE**), the .env file is also ignored by GitHub to not be shared in case you want to upload any changes to a public repository of yours).
5. Write the API keys into that .env file, following the example written in the .env-example file;

#### Running the App:

1. In your terminal (inside the repository), do the following command:

```bash
    npm start
```

The application will then fetch your Hypixel Skyblock stats and update your Notion database accordingly.

### Errors and Help with Setup

In case some error occured, check the following list of errors below that will guide you to fix any of the errors (more information will be available in the future in form of videos):


<details>
    <summary>Error X: (error)
    
    Step-by-step guide to solve:
</details>

<details>
    <summary>Error Y: (error)
    
    Step-by-step guide to solve:
</details>

## Future Enhancements & Contributions

**Future Updates**: The app is designed with flexibility in mind. Expect regular updates, especially when new features roll out from the Hypixel API or Notion.

**Contributions**: Contributions are welcome! If you have suggestions, bug reports, or enhancements, please contact [Not yet available] or open an issue on GitHub.


## License

This project is licensed under the MIT License. See the LICENSE file for details.