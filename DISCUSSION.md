# Discussion: Performance & Data Loading

How to keep the app fast when showing thousands of movies on a TV:

### 1. Fetch only what is needed
Fetch only the data that is needed to display the current view. Don't ask for all the movie datails if you just need a small image and the title.

### 2. Don't fetch data that you currently have
If you have som information that don't change much, before geting the new data, check if you need it. For exemple, in the home page, ask to the backend if something has changed before fetching all the lists and movies again.

### 3. Smart Image Management
- **Lazy Loading**: We only download an image when it's about to appear on screen.
- **Right Size**: We ask the server for a small image if the box is small, so we don't waste memory on high-resolution pictures that aren't needed.
- **Cleaning up?**: I don't know if there's any method to clear the image so the image data is removed from memory.

### 4. Fast Data Access (Caching)
Iw would implement a cache system to store the data we already fetched. This way, if the user goes back to a page they already saw, it appears instantly without needing to wait for the internet again. 

### 5. Cleaning up
- **React Cleanup**: We use the `useEffect` cleanup function to stop timers and remove "listeners" (like remote control listeners) as soon as a component is hidden.
- **State Clearing**: Don't keep unused data in memory.
