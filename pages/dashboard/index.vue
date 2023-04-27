<!-- <template>
  <div class="custom-container mt-5"> 
    <v-tabs v-model="tab">
          <v-tab class="text-normal"> Pavie en chiffre</v-tab>
          <v-tab class="text-normal"> Execution financière par activité</v-tab>
          <v-tab class="text-normal"> Taux d'execution par activité</v-tab>
          <v-tab class="text-normal"> Taux de réalisation</v-tab>
          <v-tab class="text-normal"> Cumul par composante</v-tab>
          <v-tab class="text-normal"> Cumul par secteur</v-tab>
          <v-tab class="text-normal"> Structuration financière</v-tab>
          <v-tab class="text-normal"> Financement composantes</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item class="custom-container mt-0">
        <pavi-chiffre></pavi-chiffre>
      </v-tab-item>
      <v-tab-item class="custom-container mt-0">
        <financement-activite></financement-activite>
      </v-tab-item> 
      <v-tab-item class="custom-container mt-0">
        <taux-execution-activite></taux-execution-activite>
      </v-tab-item>
      <v-tab-item class="custom-container mt-0">
        <taux-realisation-secteur></taux-realisation-secteur>
      </v-tab-item>  
      <v-tab-item class="custom-container mt-0">  
        <cumul-composante></cumul-composante>                     
      </v-tab-item>
      <v-tab-item class="custom-container mt-0">  
        <cumul-secteur></cumul-secteur>                     
      </v-tab-item>
      <v-tab-item class="custom-container mt-5">
        <structuration-financiere></structuration-financiere> 
      </v-tab-item> 
      <v-tab-item class="custom-container mt-5"> 
        <financement-composante></financement-composante>
      </v-tab-item>        
    </v-tabs-items>
     
  </div>
</template> -->
<template>
  <div> 
      <div class="custom-container mt-5">
        <v-row class="d-flex justify-content-between">
          <v-col md="4" sm="12" lg="4" class="">
            <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="">NOMBRE TOTAL DE PARRAINAGES</h4>
              <h1 class="">30 000<!-- {{ dashboardData && Number(dashboardData.financePrevus).toLocaleString() || 0}} --></h1>
            </div>
          </v-col>
          <v-col md="4" sm="12" lg="4" class="">
            <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="">HOMMES</h4>
              <h1 class="">15 000</h1>
            </div>
          </v-col>
          <v-col md="4" sm="12" lg="4" class="">
            <div class="bg-marron mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center">
              <h4 class="">FEMME</h4>
              <h1 class="">15 000</h1>
            </div>
          </v-col>
        </v-row>  
      </div> 
    </div>
  </template>

<script>
import LeftMenu from '@/components/LeftMenu';
import StatBox from '@/components/dashboard/admin/StatBox';
import CumulComposante from '@/components/dashboard/CumulComposante';
import CumulSecteur from '@/components/dashboard/CumulSecteur';
import FinancementActivite from '@/components/dashboard/FinancementActivite';
import TauxExecutionActivite from '@/components/dashboard/TauxExecutionActivite';
import TauxRealisationSecteur from '@/components/dashboard/TauxRealisationSecteur';
import StructurationFinanciere from '@/components/dashboard/StructurationFinanciere';
import PaviChiffre from '@/components/dashboard/PaviChiffre';
import FinancementComposante from '@/components/dashboard/FinancementComposante';
import { mapMutations, mapGetters } from 'vuex'

  export default {
    layout: "dashboard",
    components: {
      StatBox,
      LeftMenu,
      CumulComposante,
      CumulSecteur,
      FinancementActivite,
      TauxExecutionActivite,
      TauxRealisationSecteur,
      PaviChiffre,
      StructurationFinanciere,
      FinancementComposante
    },
    mounted: function() {
    },
    computed: mapGetters({
    }),
    data () {
      return {
        tab: null,
      }
    },
    methods:{
  
    }
  }
</script>