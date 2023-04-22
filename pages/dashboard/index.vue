<template>
  <div class="custom-container mt-5"> 
    <!-- <v-tabs v-model="tab">
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
    </v-tabs-items> -->
     
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