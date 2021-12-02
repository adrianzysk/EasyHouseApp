const { gql } = require('apollo-server');

const typeDefs = gql`
     type Device {
         id: ID!
        deviceid: Int!
        name: String!
        room: String!
        status: Boolean!
     }
      type User {
      id: ID!
      username: String!
      email: Boolean!
      deviceid: Int!
      }
      type switch   {
         id: ID!
         isOn: Boolean!
         deviceid: Int!
         device: Device
         }
      type thermometer  {
         id: ID!
         value: Int!
         deviceid: Int!
         device: Device
      }
      type fridge  {
         id: ID!
         value: Int!
         deviceid: Int!
         device: Device
      }
     type Query {
        devices: [Device!]!,
        devicesbyroom(room: String! ): [Device!]!,
        thermometers: [thermometer!]!,
        switches: [switch!]!,
        fridges: [fridge!]!,
        thermometersbyroom(room: String! ): [thermometer!]!,
        switchesbyroom(room: String! ): [switch!]!,
        fridgesbyroom(room: String! ): [fridge!]!,
        distinctRoom: [Device!]!,
     }
     type Mutation {
         createDevice(deviceid: Int!): Device,
         editDevice(deviceid: Int!,name: String!): Device,
         editDeviceRoom(deviceid: Int!,room: String!): Device,
         register(username: String!, email: String!, password: String!): Boolean!
         login(email: String!, password: String!): String!
     }
`;

module.exports = typeDefs;
