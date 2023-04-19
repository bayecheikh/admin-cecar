<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value"> {{item.title}}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn
        depressed
        rounded
        color="primary"
        @click="goToAddtype_annee"
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouveau type annee
        </v-btn>
      </div>
    </div>
    
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in tabItems"  :key="item.value" >
          <table-typeannee :tab="item.value"></table-typeannee> 
      </v-tab-item>          
    </v-tabs-items>
  </div>
</template>
<script>
import TableTypeannee from '@/components/type_annees/TableTypeannee'
  export default {
    components: {
      TableTypeannee
    },
    data: () => ({
      tab: null,
      tabItems: [
        {title:'Tout',value:'tout'}, {title:'Actifs',value:'actif'}, {title:'Inactifs',value:'innactif'}
      ],
      selected: []
    }),
    methods:{
      goToAddtype_annee() {      
        this.$router.push('/type_annees/addTypeannee');
      },
    }
  }
</script>
<style scoped>
.border-bottom-small{
  border-bottom: solid 1px #80808052;
}
</style>