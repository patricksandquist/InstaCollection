# Instacollections
[Live site][liveLink]
[liveLink]: http://insta-collection.herokuapp.com

Instacollections is a webapp for making Instagram collections by tag and date range. It is built using Ruby on Rails, React.js, and a Postgresql server.

## Features
- Takes user input and collects content using the Instagram API.
- Includes content tagged in both the caption and comments.
- Paginates through the given date range to reduce API calls.
- Videos may be played and every original post is linked.
- Each collection is autopopulated, but users may load more media.

## Todo
- Improve the frontend styling.
- Allow users to search through existing collections
- Make collection dates adjustable
- Start making API calls within date range (need a way of converting date to Instagram tag_id number).
