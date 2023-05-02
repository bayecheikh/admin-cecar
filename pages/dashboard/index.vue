<template>
  <div class="custom-container mt-5"> 
    <v-tabs v-model="tab">
          <v-tab class="text-normal"> Statistique des parrainages</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab"> 
      <v-tab-item class="custom-container mt-0">  
        <cumul-composante></cumul-composante>                     
      </v-tab-item>          
    </v-tabs-items>
     
  </div>
</template>

<script>
import LeftMenu from '@/components/LeftMenu';

import CumulComposante from '@/components/dashboard/CumulComposante';

import { mapMutations, mapGetters } from 'vuex'

  export default {
    layout: "dashboard",
    components: {

      LeftMenu,
      CumulComposante,
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