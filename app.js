const { ApolloServer,makeExecutableSchema  } = require('apollo-server');
const typeDefs = require('./server/schema');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
//Database
const sequelize = require('./server/config/database');
const ThermometerModel = require('./server/newmodels/Thermometer');
const SwitchModel = require('./server/newmodels/Switch');
const FridgeModel = require('./server/newmodels/Fridge');
const UserModel = require('./server/newmodels/User');
const DeviceModel = require('./server/newmodels/Device');

SwitchModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
ThermometerModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
FridgeModel.belongsTo(DeviceModel, { foreignKey: 'deviceid' })
UserModel.hasMany(DeviceModel); 
DeviceModel.belongsTo(UserModel)

const SECRET = 'dsjklgfdgsfdjklgnfdjgkdngjd1q234j234n34j1';

sequelize.sync( {force: true} );
sequelize.authenticate()
    .then(() => console.log('db connected'))
    .catch(err => console.log(err)) 

const resolvers = {
    Query: {  
        thermometers: () => ThermometerModel.findAll({include:[  DeviceModel ]}),
        switches: () => SwitchModel.findAll({include:[  DeviceModel ]}),
        fridges: () => FridgeModel.findAll({include:[  DeviceModel ]}),
        devices: () => DeviceModel.findAll({}),
        distinctRoom: () => DeviceModel.findAll({attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('room')) ,'room'], ]}),
        devicesbyroom: (parent, {room}) =>DeviceModel.findAll({ where: {room: room} }),
        thermometersbyroom: (parent, {room}) => ThermometerModel.findAll({include:[  {model:DeviceModel ,where: {room: room}} ]}),
        switchesbyroom: (parent, {room}) =>SwitchModel.findAll({include:[  {model:DeviceModel ,where: {room: room}} ]}),
        fridgesbyroom: (parent, {room}) => FridgeModel.findAll({include:[  {model:DeviceModel,where: {room: room}} ]}),
    },
    Mutation: {
      createDevice: async (parent, {deviceid}) => {
        const data = {
            status:true, 
            name: 'nowe urządzenie', 
            room: 'brak przypisania'
        }
        console.log(deviceid)
        let {status,name,room,}= data;
          DeviceModel.create({
            name, 
            status, 
            room,
            deviceid
          }) 
        },
      editDevice: async (parent, {deviceid,name}) => {
          DeviceModel.update(
            { name: name },
            { where: { deviceid: deviceid } }
          )
      },
      editDeviceRoom: async (parent, {deviceid,room}) => {
          DeviceModel.update(
            { room: room },
            { where: { deviceid: deviceid } }
            )
      },
      register: async (parent,args) => {
          try{
            const user = args;
            console.log({user});
            user.password = await bcrypt.hash(user.password,12);
            await UserModel.create(user);
            return true;
          }catch (err) {
            return false;
          }
      },
      login: async (parent,{email,password}) => {
        const user = await UserModel.findOne({where: { email}});
        if(!user) {
          throw new Error('Not user with that email')
        }
        const valid = await bcrypt.compare(password, user.password)
        if(!valid)
        {
          throw new Error('incorrect password');
        }
        const token = jwt.sign({
          user: _.pick(user, ['id','username']),
        },
        SECRET,
        {
          expiresIn: '1y',
        })
        return token;
        }
      }
};
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    inheritResolversFromInterfaces: true
});

const server = new ApolloServer({ schema });
//socket.io
const io = require('socket.io')(2000)

const addUser = async (req) => {
  const token = req.headers.autorization;
  try{
    const {user} = jwt.verify(token, SECRET);
    req.user = user;
  } catch(err) {
    console.log(err);
  }
  res.next();
}

const devicesId = {}
async function isDeviceIdUnique (deviceid) {
  return await DeviceModel.count({ where: { deviceid: deviceid  } })
    .then(count => {
      if (count != 0) {
        return false;
      }
      return true;
    });
}

io.on('connection', socket => {
    socket.on('check-id', ( {deviceid} ) => {
        devicesId[socket.id] = deviceid
        console.log(`${deviceid}`);       
        isDeviceIdUnique(deviceid).then(isUnique =>{
                if (isUnique){
                    socket.emit('new-id', deviceid)
                    console.log(`${deviceid}`);
                }
                else
                {
                    socket.emit('old-id', deviceid)
                }
            })
    })
    socket.on('test', () => {            
         console.log(`działa`);
    })
    socket.on('old-device', ( deviceid = [] ) => {       
            console.log(`urządzenie o podanym id już istnieje`);
            DeviceModel.update(
                { status: true },
                { where: { deviceid: deviceid  } }
              )
    })
    socket.on('add-device', ({ deviceid,type }) => {
      console.log(`${deviceid}`);
            const device = {name:'Nowe Urządzenie', status:true, room:'nie przypisano'}
            let{name,status,room}= device
              if(type == 'thermometer')
              {
                DeviceModel.create({        
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  ThermometerModel.create(
                    {deviceid}
                  )})
              }
              if(type == 'switch')
              {
                DeviceModel.create({               
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  SwitchModel.create(
                    {deviceid}
                  )})                
              }
              if(type == 'fridge')
              {
                DeviceModel.create({                
                  name, 
                  status,
                  room,
                  deviceid
                }).then(() =>{
                  FridgeModel.create(
                    {deviceid}
                  )})
              }           
    })
    //thermometer
    socket.on('send-thermometer-value', ({deviceid, value}) => {
        ThermometerModel.update(
            { value: value },
            { where: { deviceid: deviceid  } }
          )
    })
//Switch
    socket.on('send-switch-value', ({deviceid , value}) => {
        SwitchModel.update(
            { isOn: value },
            { where: { deviceid: deviceid  } }
          )
    })
    socket.on('change-switch-value', ({id1, isOn}) => {
        console.log(`${id1}`);
        socket.broadcast.emit('value',{id1,isOn})
    })
//*Switch
//Fridge
    socket.on('send-fridge-value', ({deviceid , value}) => {
        FridgeModel.update(
            { value: value },
            { where: { deviceid: deviceid  } }
          )
    })
    socket.on('change-fridge-value', ({id1, value}) => {
        console.log(`${id1}`);
        socket.broadcast.emit('fridge-value',{id1,value})
    })
//*Fridge
    socket.on('disconnect', () => {
        DeviceModel.update(
            { status: false },
            { where: { deviceid: devicesId[socket.id]  } }
          )
        delete devicesId[socket.id]
    })
})

server.listen().then(({ url }) => {
    console.log(`server listen at ${url}`);
})


