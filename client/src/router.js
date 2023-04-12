import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('./views/Landing.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/home',
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '/',
          component: () => import('./views/Welcome.vue'),
        },
        {
          path: '/profile/:profileId?',
          name: 'profile',
          component: () => import('./views/profile/Profile.vue'),
          children: [
            {
              path: 'edit',
              name: 'editProfile',
              component: () => import('./views/profile/EditProfile.vue'),
            },
          ],
        },
        {
          path: '/groups',
          name: 'groups',
          component: () => import('./views/groups/Groups.vue'),
          children: [
            {
              path: 'manage',
              name: 'manage',
              component: () => import('./views/groups/ManageGroups.vue'),
            },
            {
              path: 'add',
              name: 'addGroup',
              component: () => import('./views/groups/AddGroup.vue'),
            },
            {
              path: 'edit/:groupId/:groupName',
              name: 'editGroup',
              component: () => import('./views/groups/EditGroup.vue'),
            },
          ],
        },
        {
          path: '/friend/:friend_name',
          name: 'friend_chat',
          component: () => import('./views/rooms/ChatBox.vue'),
        },
        {
          path: '/group/:group_name',
          name: 'group_chat',
          component: () => import('./views/rooms/ChatBox.vue'),
        },
      ],
    },
  ],
});
