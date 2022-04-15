# TFL Traffic Camera App

 ![demonstration](/docs/demonstration.gif)

This is a react app that uses TFL Traffic Camera data and display them on a map using leaflet.js.

The data was originally taken in the form of a large Json file, which has been parsed and organised and added to a Mongo database. Webhooks were created as API endpoints to query the database. This was all done using a workflow automation application called n8n. I host the instance myself in a docker container and it serves as the backend for all the data queries that the react app has.

## Using Workflow automation to quickly set up a shallow API with webhooks as endpoints

n8n uses modular components which can be linked to create flows. The first image displays the process of getting data from the Tfl website and populating a MongoDB instance with it. Once the database has been made, you can add cronjobs to re-run the workflow to update existing entries or add new ones.

![workflow add to database](/docs/workflow_add_to_database.png)

Once the data has been populated, A webhook was created which listens to a GET request. Inside the GET request is the latitude and longitude bounds of the frontend UI. This is specified to use the `$GeoWithin` query, which only returns valid data within the bounds specified in the GET request. The webhook responds to the request once the call to the database has been made. React then uses that data to create markers on react-leaflet, which is a wraparound for the leaflet.js library.

![workflow api endpoint](/docs/workflow_webhook_api_endpoint.png)

This is an example of the returned data from a GET request made in Postman.

![workflow response data](/docs/api_response_data.png)

## ENVIRONMENT VARIABLES

```
-
-
-
```

### Todo
- Add a Docker image and docker-compose file for deployment.
- Implement some testing.
- Add location based input inside the app.