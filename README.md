MAD9124 Final Project

# GIFTR

The final project will be a two part joint assignment between MAD9124 and MAD9022. You will build a complete full-stack solution. The web service API portion will be graded for MAD9124, and the front-end application functionality, design, and usability will be graded for MAD9022.

**See the [MAD9124-W21 course book](https://mad9124.github.io/W2021/deliverables/final.html) for full requirements.**

## Logistics

- Clone this repo to your latptop.
- Update the `package.json` file.
- Install dependencies with NPM.
- Build the project on your laptop.
- Test each route with Postman, making sure to test both valid and invalid data.
- Make git commits as you complete each requirement.
- When everything is complete, push the final commit back up to GitHub.
- Submit **both** two URLs on Brightspace: the GitHub repo URL and the URL to your deployed AWS API.

## Notes (9124): Requirements
- The person and their gift ideas can be shared with one or more other registered users. Those users can view and update the gift ideas, but cannot delete the user. Only the owner can delete a Person from their list.
- The API will also allow for Person objects to be "shared" with other User(s). This sharing feature may or may not be implemented on the client side
- The PoC will also need to support user registration, authentication and password updates. Since this is at the proof of concept stage, the App will be free, so the registration process does not need to consider credit cards for payments
- implement basic user management functions: 
      - registration
      - authentication with JWT
      - forgot password (at login)
      - get current logged-in user
      - extra: change password (at user settings/ user profile)
- share option


## Notes (9022): Requirements
- No Indexed DB is required
- forgot password - need to build
- hamburger menu: add a home menu (to see list of people)
- add a person: option for image?
- Both the login and register buttons will log the user in and take them to the people list page. You need to update this to use the API that you build plus handle a proper JWT token.
- The cards displayed on the people page represent the data from the static JSON file. You need to update this to get data from the API instead of the static JSON.
- When you make requests for JSON data from your API, you can simply cache the files that are returned from the API in your dynamic cache, instead of putting them in a database. A query string is a good way of making each request unique for saving in the cache
- share option
- see other reqs https://mad9022.github.io/W2021/assignments/projects/#submission-3

