<template>
  <div>
        <div>
          <v-data-table
            :headers="headers"
            :items="listparrainages"
            item-key="id"
            items-per-page="5"
            class="flat pt-4"
            :loading="listparrainages.length?false:true" 
            loading-text="Loading... Please wait"
            :rows-per-page-items="[20,30,40,50,100]"
            hide-default-footer
            :search="search"
          >
            <template v-slot:top="{ pagination, options, updateOptions }">
              <v-row class="mb-1 border-bottom-small">
                <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
                
                </v-col>
                <v-col md="6" sm="12" lg="6" class="pt-0 pb-2">  
                  <v-data-footer 
                    :pagination="pagination" 
                    :options="options"
                    @update:options="updateOptions"
                    items-per-page-text="$vuetify.dataTable.itemsPerPageText" class="border-top-none margin-none"
                    itemsPerPageText= ''
                  />
                </v-col>
                <div class="text-center">
                <v-dialog v-model="dialog" width="500">
                  <v-card>
                    <v-card-title class="text-h5"> Confirmation </v-card-title>
                    <v-card-text>Voulez-vous supprimer cet element ?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="primary darken-1"
                        text
                        @click="dialog = false"
                        outlined
                      >
                        Annuler
                      </v-btn>
                      <v-btn color="red darken-1" text @click="deleteItem" outlined>
                        Supprimer définitivement
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              </v-row>  
            </template> 
            
          <template v-slot:[`item.actions`]="{ item }">
                  <v-menu bottom left>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </template>

                    <v-list shaped>
                      <v-item-group>
                        <!-- <v-list-item @click="visualiserItem(item)" link class="custom-v-list-action pl-2 pr-1">
                          <v-list-item-title>
                            <v-icon
                              small
                              class="mr-2"
                              
                            >
                              mdi-information-outline
                            </v-icon>Détail
                          </v-list-item-title>
                        </v-list-item> -->
                        <!-- <v-list-item @click="editItem(item)" link class="custom-v-list-action pl-2 pr-1">
                          <v-list-item-title> 
                            <v-icon small class="mr-2"> mdi-pencil-outline </v-icon
                            >Modifier
                          </v-list-item-title>
                        </v-list-item> -->
                        <v-list-item v-if="$hasRole('super_admin')" @click="opendialog(item)" class="custom-v-list-action pl-2 pr-1" >
                          <v-list-item-title>
                            <v-icon small class="mr-2" v-bind="attrs" v-on="on">
                              mdi-delete-outline </v-icon
                            >Supprimer
                          </v-list-item-title>
                        </v-list-item>
                      </v-item-group>
                    </v-list>
                  </v-menu>
                </template>
          </v-data-table>
        </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'

  export default {
    components: {
    },
    mounted: function() {
      this.getRegions()

      let  data = {
        numero_cedeao:'',
        prenom:'',
        nom:'',
        date_naissance:'',
        lieu_naissance:'',
        taille:'',
        sexe:'',
        numero_electeur:'',
        centre_vote:'',
        bureau_vote:'',
        numero_cin:'',
        telephone:'',
        prenom_responsable:'',
        nom_responsable:'',
        telephone_responsable:'',
        region:'',
        departement:'',
        commune:''
      }
      this.getResult(data)
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions', 
      listparrainages: 'parrainages/listparrainages',
      headers: 'parrainages/headerparrainages'   
      }),
      numero_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      sexe_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && v <= 2 && v >= 1) return true;                  
            if ((this.model.sexe=='' || this.model.sexe=='M') && parseFloat(v)==1) return true;                  
            if ((this.model.sexe=='' || this.model.sexe=='F') && parseFloat(v)==2) return true;                  
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeRegion_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 2) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      annee_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      mois_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1 && parseFloat(v) <= 12 && v.length == 2) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      jour_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 1 && parseFloat(v) <= 31 && v.length == 2) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeGenere_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 5) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeControle_cedeaoRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 1) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      }

    }, 
    data: () => ({
      dialog: false,
      progress:true,
      search:'',
      activeItem:{},
      listcommunes:[],
      listdepartements:[],
      listregions:[],
      listparrainages:[],

      commune:null,
      departement:null,
      region:null,

      valid: true,
      
      selectedregion:[],
      modelCedeao:{
        sexe:"",
        codeRegion:"",
        annee:"",
        mois:"",
        jour:"",
        codeGenere:"",
        codeControle:"",
      },
      model : {
        numero_cedeao:'',
        prenom:'',
        nom:'',
        date_naissance:'',
        lieu_naissance:'',
        taille:'',
        sexe:'',
        numero_electeur:'',
        centre_vote:'',
        bureau_vote:'',
        numero_cin:'',
        telephone:'',
        prenom_responsable:'',
        nom_responsable:'',
        telephone_responsable:'',
        region:'',
        departement:'',
        commune:''
      }
     
    }),
    methods: {
      async getRegions(){
        this.$msasApi.$get('regions')
        .then(async (response) => { 
          console.log('Données région reçu+++++++++++',response)
          this.listregions=response.data
          this.$store.commit('regions/initlist',response.data)
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      async changeRegion(value) {
        console.log(value?.departements)
        this.model.departement= null
        this.model.commune = null

        this.listcommunes = []
        this.listdepartements = value?.departements 
        this.model.region = value?.nom_region
        
      },
      async changeDepartement(value) {    
        this.model.commune = null  
        this.listcommunes = value?.communes 
        this.model.departement = value?.nom_departement
      },
      async changeCommune(value) {   
        this.model.commune = value.nom_commune 
      },
      moveToCodeRegion_cedeao(value) {
        if (value.length == 1) {
          this.$refs.codeRegion_cedeao.focus()
        }
      },
      deleteItem (item) {
        this.dialog=false   
        this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'}) 
        this.$msasApi.$delete('/parrainages/'+this.activeItem.id)
        .then(async (response) => { 
            this.$store.dispatch('parrainages/deleteparrainage',this.activeItem.id)
            this.$store.dispatch('toast/getMessage',{type:'success',text:response.data.message || 'Suppression réussie'})
            }).catch((error) => {
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la suppression'})
              console.log('Code error ++++++: ', error)
            }).finally(() => {
              
            console.log('Requette envoyé ')
        });
        /* alert('Supprimer '+item.id) */
      },
      opendialog (item) {
        this.dialog=true
        this.activeItem=item
      },
      getResult(param) {
        this.loading = true

        //let validation = this.$refs.form.validate()

        //this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
        console.log('FormData ++++++ : ',this.model)

        let formData = new FormData();

        formData.append("numero_cedeao",param.numero_cedeao)
        formData.append("prenom",param.prenom)
        formData.append("nom",param.nom)
        formData.append("date_naissance",param.date_naissance)
        formData.append("lieu_naissance",param.lieu_naissance)
        formData.append("taille",param.taille)
        formData.append("sexe",param.sexe)
        formData.append("numero_electeur",param.numero_electeur)
        formData.append("centre_vote",param.centre_vote)
        formData.append("bureau_vote",param.bureau_vote)
        formData.append("numero_cin",param.numero_cin)
        formData.append("telephone",param.telephone)
        formData.append("prenom_responsable",param.prenom_responsable)
        formData.append("nom_responsable",param.nom_responsable)
        formData.append("telephone_responsable",param.telephone_responsable)
        formData.append("region",param.region)
        formData.append("departement",param.departement)
        formData.append("commune",param.commune)

       this.$msasApi.post('/recherche_avance_parrainages',formData)
          .then((response) => {
            console.log('Donées reçus ++++++: ',response.data.data)
           // this.listparrainages=response.data.data
            this.$store.commit('parrainages/initlist',response.data.data)
          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            console.log('Requette envoyé ')
        });
        
      },
      resetInfoElecteur () {
        this.model.numero_cedeao = ""
        this.model.prenom = ""
        this.model.nom = ""
        this.model.date_naissance = ""
        this.model.lieu_naissance = ""
        this.model.taille = ""
        this.model.sexe = ""
        this.model.numero_electeur = ""
        this.model.centre_vote = ""
        this.model.bureau_vote = ""
        this.model.numero_cin = ""
        this.model.telephone = ""

        this.modelCedeao.sexe=""
        this.modelCedeao.codeRegion =""
        this.modelCedeao.annee =""
        this.modelCedeao.mois =""
        this.modelCedeao.jour =""
        this.modelCedeao.codeGenere =""
        this.modelCedeao.codeControle =""
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      },
      visualiserItem (item) {
        this.$store.dispatch('investissements/getDetail',item)
        this.$router.push('/investissements/detail/'+item.id);
      },
      editItem (item) {
        this.$store.dispatch('investissements/getDetail',item)
        this.$router.push('/investissements/modifier/'+item.id);
      },
      async deleteItem () {
        this.dialog=false
        this.$store.dispatch('toast/getMessage',{type:'processing',text:'Traitement en cours ...'})
        this.$msasApi.$delete('/investissements/'+this.activeItem.id)
        .then(async (response) => {
            this.$store.dispatch('investissements/deleteinvestissement',this.activeItem.id)
            this.$store.dispatch('toast/getMessage',{type:'success',text:response.data.message || 'Suppression réussie'})
            }).catch((error) => {
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de la suppression'})
              console.log('Code error ++++++: ',error)
            }).finally(() => {
            console.log('Requette envoyé ')
        });
      },
       opendialog (item) {
        this.dialog=true
        this.activeItem=item
      },
      exporterItem (item) {
        alert('Exporter '+item.id)
      },
      visualiser(){
        if(this.selected.length!=1)
        alert('Veuillez selectionner un element')
        else{
          let investissement = this.selected.map(function(value){ return value})[0]
          this.$store.commit('investissements/initdetail',investissement)
          this.$router.push('/investissements/detail/'+investissement.id);
        }
      },
      
      exporterCSV(){
         this.progress=true    
         console.log('Données formulaire++++++++++++',this.datasearch)  
         let formData = new FormData();
        formData.append("structure_sources",this.datasearch.structure_sources);
        formData.append("structure_enregistrements",this.datasearch.structure_enregistrements);
        formData.append("type_structure_sources",this.datasearch.type_structure_sources);
        formData.append("structure_beneficiaires",this.datasearch.structure_beneficiaires);
        formData.append("regions",this.datasearch.regions);
        formData.append("piliers",this.datasearch.piliers);
        formData.append("axes",this.datasearch.axes);

        formData.append("annees",this.datasearch.annees);
        formData.append("monnaies",this.datasearch.monnaies);
        formData.append("dimensions",this.datasearch.dimensions);
        formData.append("regions",this.datasearch.regions);

        /*  this.$msasApi.post('/export_csv_ligne_financements',formData)
          .then(async (response) => {

            console.log('Données reçus++++++++++++',response.data)
            var fileURL = window.URL.createObjectURL(new Blob(["\ufeff",response.data]));
            var fileLink = document.createElement('a');
          
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'investissements.csv');
            document.body.appendChild(fileLink);
          
            fileLink.click();
            
        }).catch((error) => {
             
            this.$toast.error(error?.response?.data?.message).goAway(3000)
            console.log('Code error ++++++: ', error?.response?.data?.message)
        }).finally(() => {
            console.log('Requette envoyé')
             this.progress=false;
             this.loading = false;
        }); */
      },
      goToAddinvestissement() {
        this.$router.push('/investissements/addInvestissement');
      },
    },
    data: () => ({
      tab: 'tout',
      tabItems: [],
      selected: [],
      dialog: false,
      progress:true,
      search:'',
      items:[],
      page: 1,
      totalPages:1,
      pageCount: '',
      itemsPerPage:'',
      path:'',
      totalItems:0,
      options: {},
      selectedItem:0,
      activeItem:{}
    })
  }
</script>
<style scoped>
.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>
