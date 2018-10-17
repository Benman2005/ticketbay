# Ticketbay

This repo contains a homework assignment for week 8 of the codaisseur academy. It contains a frontend and backend for a website that has events, tickets to the events, and comments for the tickets. Furthermore, it has a calculated fraud risk, based on price, amount of comments, and the seller's details like posting time and amount of tickets he/she is selling.
People can sign up and log in to create tickets and comments. Only certain admin users can add and edit events.

It uses Typescript, Koa, routing-controllers and TypeORM in the backend and React/Redux in the frontend. 

# Instructions

To run this application you'll need a postgres cient to connect to via something like docker. after that:

* clone folder
* go to /server folder
  * yarn install
  * yarn watch to compile
  * yarn start
* go to /client folder
  * yarn install
  * yarn start