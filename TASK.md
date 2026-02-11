## TitanOS frontend test task

### Objective

Create a horizontal list that can be navigated with left/right keyboards keys.

### Requirements

- Focused item always has to be in the first position.
- Use React state management library of your choice. Even though this application is quite basic, avoid using only the context API.
- Changing focus from one item to another should have a smooth transition.
- Use `images.artwork_portrait` as an item cover image.
- Do not use any libraries for list navigation.
- Implement the tests that you deem necessary (unit/e2e).
- Feel free to use any react boilerplate you prefer for this project.
- The result should be shared as a git repository (private or public).

- Additionally, there is a short **discussion question**
  to answer (see below) about how you would build a system like this in the real
  world.

Lastly, please include a README with instructions on how to setup and run your project
locally.

### Data

Use the following endpoint to retrieve the list contents:
[https://eu.acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie](https://eu.acc01.titanos.tv/v1/genres/1/contents?market=es&device=tv&locale=es&page=1&per_page=50&type=movie)

### Example implementation

[Here](https://github.com/Titan-OS/fontend-test-task/blob/master/example.mp4) is an example illustration of the expected result. This is only a reference, final styles are up to you.

### Discussion Question

Imagine you are designing a streaming platform web application based on the CTV interface you've just completed. The application will manage content catalogs, handle user interactions with remote controls, and display media tiles in horizontal lists across different device types. Please answer **ONE** of the following discussion questions about the approach you'd take:

- **Frontend Architecture & State Management**: Describe how you would architect the frontend to handle complex state (user preferences, content data, navigation focus) across multiple screen types and input methods. How would you structure your components and manage data flow as users navigate with remote controls?

- **Performance & Data Loading**: How would you optimize the frontend for smooth performance when displaying thousands of content tiles with images and metadata? Discuss your approach to lazy loading, caching, and memory management for resource-constrained CTV devices.

- **API Design & Integration**: Describe how you would design the API contracts between your frontend and backend services for content discovery, user preferences, and real-time updates. How would you handle error states and offline scenarios?

- **Deployment & Infrastructure**: What infrastructure choices would you make to build and deploy this frontend application across different CTV platforms and web browsers? Consider how you'd handle device-specific optimizations and ensure consistent performance at scale.

Write your answer in the README inside your project GitHub repo. Please keep your answer concise, but provide as much detail as you feel is necessary; we're not looking for a thesis, just an understanding of how you think about solutions and how you convey your thoughts in written word.
