# vst-1
Video Service Test - 1

This is a personal project I'm doing to learn more about the cloud, devops, and software architecture.

---

The project consists of:

- Front End (Next.js)
- Back End (Node/Express.js)
- Database (probably MongoDB, but maybe PostgreSQL or some other SQL database)
- Video Transcoding Service
  - Task generator to determine what videos need to be transcoded
  - Producer that manages AWS instances and sends tasks to a queue
  - Microservice for spawning AWS instances to do transcoding jobs via ffmpeg
- CDN (Probably S3 buckets)

## Transcoding Service

Here is a basic diagram of what the current service will be:

![Video Service Basic](https://user-images.githubusercontent.com/7909209/131399274-8c5f5eaf-e266-436b-93a2-95f2bf8bd3b9.png)