# Decentralized ToDo Application

## Description

The motivation for the project was to use blockchain to make a Decentralized ToDo Application(dAPP). The App has a text area where you can enter new task which moves to list of pending task.Tasks in pending list can be clicked and marked as completed and it then moves to completed task.The main advantage of the application is that it is peer to peer to application, that is you dont need to connect to any centralized server for storing and accessing data rather all of the data are stored in a decentralized manner in the blockchain(Ethereum blockchain was used here).

## Screenshots


## Setup
 ### Prerequisites:
  * Ganache(local blockchain network)
  * Metamask (Chrome extension to connect to blockchain network)
  * Truffle (for development and testing purpose)
  
If you want to setup this project for development purposes, proceed as follows:

* Change blockchain host and port in truffle-config.js
* Run truffle migrate --reset
* Run npm run dev
