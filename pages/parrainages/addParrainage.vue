<template>
  <div>
  <div class="custom-container mt-3">
    <v-card class="container pl-5 pt-5 pb-10 pr-5" flat>  
      <form-add-investissement></form-add-investissement>
    </v-card>
  </div> 
</div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';
import PageHeader from '@/components/PageHeader';
import FormAddParrainage from '@/components/parrainages/FormAddParrainage';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormAddParrainage
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-investissements')){
       // return redirect('/')
      }
    },
    mounted: function() {
      this.$store.dispatch('regions/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Parrainages',
          disabled: false,
          to: '/parrainages',
          exact: true
        },
        {
          text: 'Nouveaux parrainages',
          disabled: false,
          to: '/parrainagess/addParrainage',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
