<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container" flat>  
      <list-typeannee></list-typeannee>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import ListTypeannee from '@/components/type_annees/ListTypeannee'
  export default {
    layout: "dashboard",
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    components: {
      LeftMenu,
      PageHeader,
      ListTypeannee
    },
    mounted: function() {
      this.$store.dispatch('type_annees/getList')
    },
    data () {
      return {
        selectedItem: 0,
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'type_annees', icon: 'mdi-lock',link:'/type_annees',position:2  }
        ],
        headerItems: [
          {
            text: 'Liste des types annees',
            disabled: true,
            to: '/type_annees',
            exact: true
          }
        ]
      }
    }

  }
</script>

<style scoped>

</style>
