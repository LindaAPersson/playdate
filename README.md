# Playdate

Playdate is an application designed to simplify the process of arranging playdates for parents. As any parent knows, it can often take hours or even days to coordinate schedules and respond to text messages amidst the chaos of daily life. This app aims to alleviate the challenges associated with scheduling playdates, making it easier for parents to connect and organize opportunities for their children to socialize and play together.

![Am I Responsive](documentation/responsiv.png)

Link to live site:
[Link to playdate](https://playdate-184e33ed70de.herokuapp.com/)
Link to API:
[Link to drf-api](https://playdate-drf-api-a577c80fbeb8.herokuapp.com/)

## Project Goals

The goal for DADJOKES was to create an easy-to-navigate site that users can visit when they lie on the couch watching a bad movie or are on the train during a workday morning. It should be a site where users can get away for a little while.

## Agile Methodology

Agile Methodology was used to help prioritize and organize tasks for the hole webpage. I used Project Boards on Github.

* Epics were written containing possible user stories and based on that the website was made.
* User stories were created by looking at epics and added on as the project was advancing.
* Project Board was used to track progression of the task through the Todo, In progress and Done columns

<details>
<summary> Userstories / Project board
</summary>

![issues.png](documentation/readme/userStories/issues.png)
![projectboard.png](documentation/readme/userStories/kanBan.png)
</details>

To see the Epic and user stroies in full: [Project Board](https://github.com/users/LindaAPersson/projects/9).

## User Experience

### User Stories
#### First time user
As a first-time user of Playdate, I have specific expectations regarding the website's usability and functionality. Firstly, I want the website to offer intuitive navigation, allowing me to easily explore different sections and quickly locate information about playdates. Clear and organized menus, along with prominent search and filter functionalities, 

#### Registred user
As a registered user of Playdate, I desire the capability to organize playdates, leave comments and review past playdates. This functionality enables me to actively engage with the content and enhance the community's enjoyment. Additionally, I seek the ability to edit or delete my playdates, comments, and reviews, empowering me to maintain control over my contributions and ensure their accuracy and relevance.

#### None registred user
As a non-registered user, I anticipate the ability to access and browse all playdates, comments, and reviews available on the Playdate platform. This includes having unrestricted access to view upcoming playdates, read comments left by other users, and peruse reviews of past events. Additionally, I expect the functionality to filter and search for playdates.

### Design
I envision Playdate as a cheerful platform that evokes a positive, childlike atmosphere, enriching the user experience with its playful design elements. To achieve this, I propose incorporating an abundance of bright and cheerful colors throughout the website's interface. These colors should reflect the joy and excitement associated with childhood, creating an inviting and engaging environment for users.

Furthermore, the site's layout should be carefully structured to prioritize clarity and readability. Playdates should be presented on a clean, white background to ensure that the information is easily legible and accessible to users.

#### Color
The color scheme for this application was inspired by childhood. I wanted a lot of happy colors to reflect the site's purpose – to bring children together to play, explore, and create memories.

![colors](documentation/readme/colors.png)

#### Wireframes
While planning this site, I sat down with pen and paper and sketched out the outlines of how I wanted the site to be. Since then, the structure and the number of pages have changed. However, the essence of what I drew is still there.

#### Fonts
Google Fonts were implemented on the website. Latin with sans-serif as fallback was used thoughout the site to ensure high legibility of the content.

## Features

### Existing Features
On the entire page, the messages 'signed in as: ...' are visible when the user are signed in, so the user always knows ig theey are signed in or not.


<details>
<summary> Navbar
</summary>

![Navbar desktop](documentation/readme/features/navbarDesktop.png)

![Navbar mobile](documentation/readme/features/navbarMobile.png)
</details>

<details>
<summary> Signed in as
</summary>

![Signed in as](documentation/readme/features/signInAs.png)
</details>

<details>
<summary> Playdate
</summary>

![Playdate](documentation/readme/features/playdate.png)
</details>

<details>
<summary> My Playdate
</summary>

![My playdate](documentation/readme/features/myPlaydates.png)
</details>

<details>
<summary> Create and Edit playdate
</summary>

![Create Playdate](documentation/readme/features/createPlaydate.png)
![Edit playdate](documentation/readme/features/editPlaydate.png)
</details>

<details>
<summary> Comment and review
</summary>

![Icons](documentation/readme/features/commentReview.png)
![Comments](documentation/readme/features/comments.png)
![Review](documentation/readme/features/review.png)
</details>

<details>
<summary> Filters 
</summary>

![Searchbar](documentation/readme/features/searchFilter.png)
![Datefilter](documentation/readme/features/dateFilter.png)
</details>

<details>
<summary> Sign in
</summary>

![Sign in](documentation/readme/features/signIn.png)
</details>

<details>
<summary> Sign up
</summary>

![Sign up](documentation/readme/features/signUp.png)
</details>

<details>
<summary> Log out
</summary>

![Log out](documentation/readme/features/singedOut.png)
</details>


### Future Features

* One of the exciting future features I envision for the platform is the implementation of a dynamic calendar (where the pink image of a calendar is placed now on desktop view). By clicking on a particular date within the calendar, users would be able to instantly view all relevant playdates scheduled for that day. The calendar feature would enhance the overall user experience by offering a comprehensive overview of upcoming activities. Whether planning ahead for the week or seeking last-minute opportunities to connect with other families, the calendar provides a valuable tool for facilitating social engagement and community interaction on the platform.

## Technologies Used

### Languages
* HTML
* CSS
* Javascript
    - React

### Libraries, frameworks and dependencies
* Axios - axios were used for promise-based HTTP. 
* JWT - library to decode out JSON Web token. 
* React 17 - JavaScript library for building user interfaces
* React-Bootstrap 4.6 
* React Infinite Scroll 
* React Router - used for dynamic routing. 

### Tools & Programs
* Am I Responsive was used to create the multi-device mock-up at the top of this README.md file
* Chrome dev tools was used for debugging of the code and checking site for responsiveness
* Cloudinary to store static files
* Favicon.io for making the site favicon
* Font Awesome - Icons from Font Awesome were used throughout the site
* Google Fonts 
* Git was used for version control within VSCode to push the code to GitHub
* GitHub was used as a remote repository to store project code
* Gitpod was used to host a virtual workspace
* Heroku Platform was used to deploy the project into live environment

### Validation:
* Jigsaw W3 Validator was used to validate the css
* ESLint used to validate JSX code
* Lighthouse used to validate performance, accessibility, best practice and SEO of the app
* Wave - used to evaluate application accessibility

See all the results in [tsting](TESTING.md)

## Testing
Please see  [TESTING.md](TESTING.md) for all the detailed testing performed.

## Back-end

Please see [API README.md](https://github.com/LindaAPersson/playdate_drf_api/blob/main/README.md) for a full overview of the back-end connected to playdate. 

Please see [API README.md](https://github.com/LindaAPersson/playdate_drf_api/blob/main/TESTING.md) for a full overview of the back-end testing connected to playdate. 
