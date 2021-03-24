# Allma coding exam
This is a coding exam administered for consideration of employment as a back-end engineer @ Allma (https://allma.io). This exam does not include algorithmic challenges or data structure challenges, but focuses on real-world use cases at Allma. A project in this repo will act as a remote server to emit alert events to a remote API endpoint that is expected to receive them. Your job is to build this endpoint as well as a small API on top of the data it ingests that satisfy a set of use cases outlined below. 

## Rules
1. You should complete the use cases one at a time and complete as many as possible.
2. You may use any resources to complete the test including Google, Stack Overflow, etc.
3. You may _NOT_ enlist the help of other developers to complete the project; your work should be your own.
4. You may use any back-end language or server framework, e.g. Python/Flask, Node/Express, Ruby/Rails, C#/ASP.Net, etc. 
5. You may use any set of external libraries or packages from public repositories.

## Criteria for passing
1. Your solution should meet/implement the valid use cases as outlined and display them on the page.
2. Your solution should enlist readable and understandable code. Feel free to annotate your code as you would normally.
3. Your solution should include instructions on how to run it.

## General concept
1. All events from the API should be ingested and an internal in-memory data storage created to house them.
2. When ALERT_CREATED events are ingested a new record should be created in the data store for the alert received.
3. When ALERT_CHANGED events are ingested, an existing record should be updated in the data store for the alert received by matching the `alertId`. If no prior alert exists, it should be assumed to have been missed and instead be inserted.
4. A new API should be build on top of this data, allowing the data to be queried in either GraphQL or REST, outputting JSON.
5. When building your endpoint to receive data, the data contract for the events and associated data can be found in `./src/types.ts`.

## Running the emitter
1. You may configure the URL of the endpoint to send events to by setting the environment variable `EVENT_POST_ENDPOINT_URL` or configuring the `.env` file.
2. To start the event emitter, run `npm run serve` and check your API to ensure it starts receiving events within about 10s.
3. The emitter will print log messaged to stdout/stderr with any issues communicating with your solution.

## Use cases to implement
1. The new API should be able to query all alerts.
2. The new API should be able to optionally filter the alerts by name, service.name, responser.name, and status during queries.
3. The new API should include additional endpoints or the ability to view the following aggregate stats on all of the alerts ingested:
    - Total count of alerts broken down by current status
    - Min time to acknowledged
    - Mean time to acknowledged
    - Max time to acknowledged
    - Min time to resolved
    - Mean time to resolved
    - Max time to resolved

## Optional
1. The solution runs from within a Docker container with the emitter project and a compose file to start them both.
2. The solution contains any tests.

## Submitting your solution
1. Please create a private repository on Gitlab/Github/Bitbucket/etc. and share your solution with your interviewer
