<template lang="pug">

    .chat_groups

        loading(v-if="loading", :normal="false")

        .data

            router-link(to="/groups")
                i.material-icons arrow_back

            h4 My Groups

                router-link(to="/groups/add")
                    i.add.material-icons add 

            hr

        table

            thead
                tr
                    th Avatar 
                    th Name
                    th Edit
                    th Status

            tbody

                tr(v-if='errorLoad')
                    td(colspan='4')
                        p.red Sorry :( records could not be loaded


                tr(v-else-if="notFound")
                    td(colspan='4') No records found, please
                        router-link.green.link_add(to="/groups/add") Add Groups
                        

                tr.data(v-else v-for='(group, index) in groups.data')

                    td
                        avatar.table_avatar(:size="45", :username="group.name", :src="group.avatar", color="#fff")

                    td {{ group.name }}

                    td
                        router-link(:to="linkEdit(group)")
                            i.material-icons.green mode_edit

                    td
                        button.format(@click="deleteGroup(group._id)")
                            i.material-icons.red delete

        paginate(:source="groups" @navigate="listGroups")


</template>

<script>

import Paginate from '@/components/pagination/paginate.vue';
import { mapActions, mapState, mapGetters } from 'vuex';

export default {

  components: { Paginate },

  created() {
    this.listGroups();
  },

  methods: {

    ...mapActions('groups/list', ['listGroups', 'deleteGroup']),

    changePage(number) {
      this.listGroups(number);
    },

    linkEdit(group) {
        return {
            name: 'editGroup',
            params: {
                groupId: window.btoa(group._id),
                groupName: group.name
            }
        }
    }

  },

  computed: {

    ...mapState('groups/list', ['groups', 'loading', 'errorLoad']),

    ...mapGetters('groups/list', ['notFound']),


  },

};
</script>
