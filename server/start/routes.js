'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.group(() => {

  // Auth ---------------------------------------------------------

  Route.post('auth/register', 'UserController.register').validator('RegisterUser')
  Route.post('auth/login', 'UserController.login').validator('LoginUser')

}).prefix('api')


Route.group(() => {

  // Profile ---------------------------------------------------------

  Route.get('/profile', 'UserController.users')
  Route.patch('/profile/:userId', 'UserController.edit').validator('EditUser')
  Route.get('/profile/get/:user', 'UserController.user').bind('User')

  
  // Friendship ---------------------------------------------------------

  Route.post('/friends/add/:recipientId', 'FriendShipController.add')
  Route.post('/friends/accept/:senderId', 'FriendShipController.accept')
  Route.delete('/friends/reject/:userId', 'FriendShipController.reject')
  Route.get('/friends/check/:userId', 'FriendShipController.check')

  // Groups ---------------------------------------------------------
  
  Route.get('groups', 'GroupController.groups')
  Route.patch('groups/:group', 'GroupController.update').validator('NewGroup').bind('Group')
  Route.delete('groups/:group', 'GroupController.destroy').bind('Group')     
  Route.post('groups/create', 'GroupController.create').validator('NewGroup')
  Route.get('groups/friends/:group?', 'GroupController.groupInformation').bind('Group')

  // Chats ---------------------------------------------------------

  Route.get('chats', 'ChatController.chats')

  // Messages ---------------------------------------------------------

  Route.get('messages/:room_name/:chat_id', 'MessageController.messages');
  Route.post('messages/send', 'MessageController.send')


  // Access chat ---------------------------------------------------------

  Route.get('group_chat/:group', 'GroupController.groupForChat').middleware(['groupMember']).bind('Group')
  Route.get('friend_chat/:user', 'FriendShipController.userForChat').middleware(['isFriend']).bind('User')

  // Pusher Auth ---------------------------------------------------------

  Route.post('pusher', 'PusherAuthController.auth')
  Route.get('pusher/:channel_name', 'PusherAuthController.onlineUsers')


}).prefix('api').middleware(['auth'])