# bookmarkt
Bookmarkt MERN web application

A Goodreads inspired web application to store your book collections, review and see what others think about it.


## API Routes
Note: All API routes begin with `{SITEURL}/api`.
### `/books`
#### `/`
##### `GET /books`
Retrieves all books stored within the database

#### `/[id]`
##### `GET /books/[id]`
Retrieves the book with GoogleBookID equal to `id`
##### `POST /books/[id]`
Adds a new book to the database, with GoogleBookID equal to `id`, if it does not already exist.

### `/register`
#### `/`
##### `POST /register`
Route user for creating a new account with a credentials combination of email & password

### `/review`
#### `/`
##### `GET /review`
Retrieves all reviews stored within the database

##### `POST /review`
Adds a new review to the database, adding the review `id` to the list of reviews for the book and the user which made the review.

#### `/[id]`
##### `GET /review/[id]`
Retrieves a review with reviewID `id` from the database.

### `/users`
#### `/`
#### `/books`
##### `GET /users/books`
Retrieves the books of the currently logged in user,  if there is no logged in user it breaks.
##### `POST /users/books`
Adds a new book, from body of the request, to the current user's list.
If the book exists in the db already, and is found, it simply adds the book `id` to the user's book list.
Otherwise, it will create the book and then add it to the user's list.

#### `/[userId]/books`
##### `GET /users/[userId]/books`
Retrieves all books of a user with id `userId`.
