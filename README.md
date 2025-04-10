# README

## Backend Dependencies

- Ruby 3.x
- Ruby on Rails 7.x
- SQLite3

## Frontend Dependencies

- Node.js
- Yarn

### Main Frontend Packages

- React 19.1.0
- React Router 7.5.0
- Material UI 7.0.2
- TailwindCSS 4.1.3
- Formik 2.4.6
- Yup 1.6.1
- Axios 1.8.4
- date-fns 2.30.0

## Development Dependencies

- esbuild 0.25.2

## Start the dev server

Start the dev server with `docker compose up`

# How much of this was written by an AI??

For the last 10 years, my main stacks have either been Python or Node on the backend and React on the frontend. This was the
first time I worked with Ruby on Rails in a long time (and the first time I used a full MVC framework in almost as long). Given my
choice of tech stack I would have gone with NestJS on the backend and React on the Frontend. Omada uses Rails for the backend
though and I thought best to play nicely with the other kids.

So, admittedly, kind of a lot of this was vibe coded.

That being said, I spent a long time getting myself back into the Ruby/Rails mindset and comparatively little time building
this project. Everything was build in Cursor, mostly using a claude-3.7 thinking model. I used the rails console to create
the GlucoseMeasurement model and crud operations. I used a [guide I found on google](https://rubyroidlabs.com/blog/2023/11/how-to-use-ruby-on-rails-with-react-in-2024/) to set up a starter react component. That worked pretty well for a hello world but failed as soon as I made a second component.

So I turned to AI:

```
Why isn't my app displaying my react component?
```

30 seconds later the agent resolved the issue and got me back on track. I set up a cursorrules file to describe my techstack then told the AI:

```
Make a dashboard for the GlucoseMeasurement model. Include components that handle all of the basic CRUD operations.
```

Needless to say, the results continued to justify the expense of this editor.

Next I set about building each of the project requirements for the Analytics dashboards:

```
Lets add a new controller and react components. THis will go under a new rout called "analytics"

We need to create a component that displays a glucose metrics from a member's data. LEts start with showing a member's average glucose levels.

We need to show metrics for the time periods "last 7 days" and "current calendar month". FOr each of those time frames, we need to show their average glucose level and how it changed since the last time period.

The last 7 days is defined as all glucose reading taken from 12:00:00am local time on the current day and the 6 prior days.

A month of glucose data includes all readings for the user from 12:00:00am local time on the first day of a calendar month to 11:59:59 pm local time on the last day of that calendar month (or today if we select the curent month).
```

Then came

```
Thats awesome! Lets keep going - add a colored text and indicator to the cards that shows the % or mg/dL change since the last time period.
```

and

```
Fantastic - lets add some more tracking info. Add an indicator that shows "Time above range (%)". The time above range is the percentage of glucose readings in the time frame that were above 180 mg/dL.
```

(and again for time below range).

After that there were some errors. I use a [chrome browser plugin that links to a cursor mcp server](https://browsertools.agentdesk.ai/installation) so that cursor can read console errors as they appear. YOLO mode to the rescue!

```
There are rails errors and the app is showing "No data" on the cards. Fix it.
```

And that's the end of the project. Sprinkle in a little docker configuration and a few more iterations of

```
I'm seeing this problem:

[Pasted Multiline Error message] | [brief description of what the app isn't doing but should]
```

and we were ready to ship!

# Things I would change or do differently with more time

## Typescript on the frontend

Personal opinion, but I strongly prefer typescript over wild-west javascript. The overhead it adds is worth it for the improved maintainability.

## Analytics RoR Controller

I intially wanted to make a single backend call to get the numbers needed for the analytics dashboard. But that ended up taking more time and resources. Controller endpoints to support frontend business logic is something of an anti pattern.

## Testing

I mostly skipped this step to keep things simple and stick to the time frame.
