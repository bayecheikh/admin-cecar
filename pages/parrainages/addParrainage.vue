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
import FormAddInvestissement from '@/components/parrainages/FormAddInvestissement';
  export default {
    layout: "dashboard",
    components: {
      LeftMenu,
      PageHeader,
      FormAddInvestissement
    },
    middleware: function ({redirect,$hasPermission}) {
      if(!$hasPermission('gerer-investissements')){
       // return redirect('/')
      }
    },
    mounted: function() {
      /* this.$store.dispatch('roles/getList')
      this.$store.dispatch('investissements/getList')
      this.$store.dispatch('fournisseurs/getList') */
      this.$store.dispatch('annees/getList')
      this.$store.dispatch('monnaies/getList')
      this.$store.dispatch('dimensions/getList')
      this.$store.dispatch('regions/getList')
      this.$store.dispatch('structures/getSelectList')
      this.$store.dispatch('modefinancements/getList')
      this.$store.dispatch('bailleurs/getList')
      this.$store.dispatch('piliers/getList')
    },
    data () {
      return {
        headerItems: [
        {
          text: 'Financements',
          disabled: false,
          to: '/investissements',
          exact: true
        },
        {
          text: 'Nouveau financement',
          disabled: false,
          to: '/investissements/addinvestissement',
          exact: true
        }
        
        ]

      }
    }

  }
</script>

<style scoped>

</style>
