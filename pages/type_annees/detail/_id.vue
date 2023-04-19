<template>
  <div>
  <div class="custom-container bg-title-grey">
      <page-header :items="headerItems" class=""></page-header>  
  </div> 
  <div class="custom-container">
    <v-card class="container pl-10 pt-10 pb-10 pr-10" flat>  
     <v-row align="center"
            justify="center">
            <v-col cols="12" md="12" lg="12" sm="12">
              <info-typeannee></info-typeannee>
            </v-col>
            <v-col cols="12" md="12" lg="12" sm="12">
              <actions-typeannee></actions-typeannee>
            </v-col>
          </v-row>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import InfoTypeannee from '@/components/type_annees/detail/InfoTypeannee';
import ActionsTypeannee from '@/components/type_annees/detail/ActionsTypeannee';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      InfoTypeannee,
      ActionsTypeannee
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-parametres')){
        return redirect('/')
      }
    },
    data () {
      return {
        leftmenuItems: [
          { text: 'Roles', icon: 'mdi-lock',link:'/roles',position:1  },
          { text: 'type_annees', icon: 'mdi-lock',link:'/type_annees',position:2  }
        ],
        headerItems: [
        {
          text: 'Type annees',
          disabled: false,
          to: '/type_annees',
          exact: true
        },
        {
          text: 'Detail type annee',
          disabled: true,
          to: '/type_annees/94',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
