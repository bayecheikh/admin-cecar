<template>
  <v-card class="mx-auto mb-5 pl-10 pt-0 pr-10 pb-5 my-5 border-grey">
    <div class="custom-container mt-0">
      <v-row justify="center" class="d-flex justify-content-between pt-5">
        <v-col lg="3" md="3" sm="12" >
            <v-autocomplete
              v-model="model.region"
              :rules="rules.regionRules"
              :items="listregions"
              outlined
              dense
              label="Région"
              item-text="nom_region"
              item-value="nom_region"
              return-object
              @change="changeRegion"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="3" md="3" sm="12" >
            <v-autocomplete
              v-model="model.departement"
              :rules="rules.departementRules"
              :items="listdepartements"
              outlined
              dense
              label="Departement"
              item-text="nom_departement"
              item-value="nom_departement"
              return-object
              @change="changeDepartement"
            >
            </v-autocomplete>
          </v-col>
          <v-col lg="3" md="3" sm="12">
            <v-autocomplete
              v-model="model.commune"
              :rules="rules.communeRules"
              :items="listcommunes"
              outlined
              dense
              label="Commune"
              item-text="nom_commune"
              item-value="nom_commune"
              return-object
              @change="changeCommune"
            >
            </v-autocomplete>
          </v-col>
            <v-col
              lg="3"
              md="3"
              sm="12"
              
            >
            <v-btn text @click="onClearClicked" rounded color="green">Afficher tout</v-btn>
            </v-col>
      </v-row>
      <v-row class="row">
        <div class="col-lg-4 col-md-4 col-sm-12 m-0 pt-0 pb-30 d-flex flex-column">
              <div class="bg-marron-2 mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center mb-auto">
                <h4 class="">Nombre total de parraianages</h4>
                <h2 class="text-primary mt-2">{{model.nombre_total?model.nombre_total.toLocaleString():0}}</h2>
              </div>
            
              <div class="bg-marron-2 mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center mb-5 mb-auto">
                <h4 class="">Nombre d'hommes</h4>
                <h2 class="text-primary mt-2">{{model.nombre_homme?model.nombre_homme.toLocaleString():0}}</h2>
              </div>
           
              <div class="bg-marron-2 mr-3 pl-4 pr-5 pt-5 pb-5 text-sm-center mb-5 mb-auto">
                <h4 class="">Nombre de femmes</h4>
                <h2 class="text-primary mt-2">{{model.nombre_femme?model.nombre_femme.toLocaleString():0}}</h2>
              </div>              
        </div> 
        <div class="col-lg-8 col-md-8 col-sm-12 m-0 pt-0 pl-15 pb-30 d-flex flex-column border-grey">
          <button class="btn btn-success" type="button" disabled style="position: absolute; z-index: 100; top: 50%; left: 50%;" v-if="isloading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Chargement des données encours...
          </button>
          <div id="chartdiv"></div>                   
        </div>           
      </v-row>             
    </div>
  </v-card>
</template>
  
  <script>
  import { mapMutations, mapGetters } from 'vuex'
    import Notification from '@/components/Notification'
    export default {
      components: {
        Notification
      },
      mounted: function() {
        /* this.getResultatAtteint()
        this.$store.dispatch('annees/getList')
        this.$store.dispatch('monnaies/getList')
        this.$store.dispatch('secteurs/getList') */
        //this.getRegions()
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
        
        /* this.$store.dispatch('structures/getList')
        this.$store.dispatch('fournisseurs/getList') */
      },
      computed: {
        ...mapGetters({
          listregions: 'regions/listregions', 
          listparrainages: 'parrainages/listparrainages'
        /* listfournisseurs: 'fournisseurs/selectlistfournisseurs',
        liststructures: 'structures/selectliststructures', */
        
      })},
      data: () => ({
      isloading:false,
      tablemilitantmaps:[],
      militants:[],
      nombretotal:0,
      listcommunes:[],
      listdepartements:[],
      listregions:[],

      commune:null,
      departement:null,
      region:null,
        annee:'',
        trimestre:'',
        secteur:'',
        listresultatAtteints : [],
        tab: null,
        loading: false,
        message:null,
        color:null,
        valid: true,
        showFournisseur: false,
        message:null,
                
        model: {      
          nombre_homme : '0',
          nombre_femme : '0',
          nombre_total : '0', 
        },
        resume:{
          annee:'0',
          trimestre:'0'
        },
        rules:{
          numberRules: [
          v  => {
            if (!v.trim() || v=='0') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          }],
          firstnameRules: [
            v => !!v || 'Prénom est obligatoire',
            v => (v && v.length <= 50) || 'Prénom doit etre inférieur à 20 caratères',
          ],
          lastnameRules: [
            v => !!v || 'Nom est obligatoire',
            v => (v && v.length <= 50) || 'Nom doit etre inférieur à 10 caratères',
          ],
          emailRules: [
            v => !!v || 'E-mail est obligatoire',
            v => /.+@.+\..+/.test(v) || 'E-mail mdoit etre valide',
          ],
          donnee_basenameRules: [
            v => !!v || 'Login est obligatoire',
            v => (v && v.length <= 10) || 'Nom doit etre inférieur à 10 caratères',
          ],
          rolesRules: [
            v => (v && !!v.length) || 'Role est obligatoire',
          ],
          telephoneRules: [
            v => !!v || 'Téléphone est obligatoire',
          ],
          country_codeRules: [
            v => !!v || 'L\'indicatif du pays est obligatoire',
          ],
          fournisseur_services_idRules: [
            v => (!!v) || 'champ obligatoire',
          ],
          structure_idRules: [
            v => (!!v) || 'Structure est obligatoire',
          ],
          adresseRules: [
            v => !!v || 'Adresse est obligatoire',
            v => (v && v.length <= 100) || 'Adresse doit etre inférieur à 50 caratères',
          ],
          nationalityRules: [
            v => !!v || 'Nationalité est obligatoire',
            v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
          ],
          date_of_birthRules: [
            v => !!v || 'Date de naissance est obligatoire',
          ],
          place_of_birthRules: [
            v => !!v || 'Lieu de naissance est obligatoire',
            v => (v && v.length <= 50) || 'Lieu de naissance doit etre inférieur à 20 caratères',
          ],
          /* sexeRules: [
            v => !!v || 'Civilité est obligatoire',
          ], */
          type_identificationRules: [
            v => !!v || 'Type d\'identification est obligatoire',
          ],
          numero_identificationRules: [
            v => !!v || 'Numéro d\'identification est obligatoire'
          ],
          fonctionRules: [
            v => !!v || 'Fonction est obligatoire'
          ]
        },
  
        imageData:null,
      }),
      methods: {
        getInfoTooltip(e){
          this.nombretotal = this.militants?.filter(militant => militant.region === e)             
        },
        getSlug(e){
          this.nombretotal = this.militants?.filter(militant => militant.region === e)             
        },
        async getMap(listregions,listparrainages){
          this.isloading=true
            let {am4core, am4charts,am4maps,senegalHigh, am4themes_animated, am4themes_dark} = this.$am4core();
                    // Create map instance
                    let map = am4core.create("chartdiv", am4maps.MapChart);

                    /* let container = am4core.create("container", am4core.Container);
                    container.width = am4core.percent(100);
                    container.height = am4core.percent(100); */
                    
                    // Set map definition
                    map.geodata = senegalHigh;
                        
                    // Set projection
                    map.projection = new am4maps.projections.Miller();
                    
                    // Desable Zoom control on click, on scroll
                    //map.zoomControl = new am4maps.ZoomControl();
                    map.seriesContainer.draggable = false;
                    map.seriesContainer.resizable = false;
                    map.seriesContainer.events.disableType("doublehit");
                    map.chartContainer.background.events.disableType("doublehit");
                    map.chartContainer.wheelable = false;
                    map.paddingBottom = 5;
                    //hide logo
                    if(map.logo) {
                    map.logo.disabled = true;
                    }
                        
                    // The world
                    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());    
                    polygonSeries.useGeodata = true;
                    polygonSeries.calculateVisualCenter = true;

                    let tablemilitantmaps = []
                    let list = listparrainages
                    listregions.map(region=>{
                      let nbr = list.filter(res=>(res.region==region.nom_region)).length

                      //console.log("nombre militants -----++++++++",nbr)
                      tablemilitantmaps.push({id:region.slug,name:region.nom_region,nombre:nbr,"fill": am4core.color(nbr>0?"#fb4c07":"#fff")})
                      //console.log("table militants -----++++++++",tablemilitantmaps)
                    })

                    polygonSeries.data = tablemilitantmaps

                    /* //set the color
                    polygonSeries.heatRules.push({
                    "property": "fill",
                    "target": polygonSeries.mapPolygons.template,
                    "min": am4core.color("#ffffff"),
                    "max": am4core.color("#084f31"),
                    "logarithmic": true
                    });

                    // Set up heat legend
                    let heatLegend = map.createChild(am4maps.HeatLegend);
                    heatLegend.series = polygonSeries;
                    //heatLegend.align = "right";
                    heatLegend.height = am4core.percent(80);
                    heatLegend.orientation = "vertical";
                    heatLegend.valign = "top";
                    heatLegend.marginLeft = am4core.percent(4);
                    heatLegend.marginTop = am4core.percent(4);
                    heatLegend.valueAxis.renderer.opposite = true;
                    heatLegend.valueAxis.renderer.dx = - 25;
                    heatLegend.valueAxis.strictMinMax = false;
                    heatLegend.valueAxis.fontSize = 12;
                    heatLegend.valueAxis.logarithmic = true;
                    polygonSeries.mapPolygons.template.events.on("over", function(ev) {
                    if (!isNaN(ev.target.dataItem.value)) {
                        heatLegend.valueAxis.showTooltipAt(ev.target.dataItem.value)
                    }
                    else {
                        heatLegend.valueAxis.hideTooltip();
                    }
                    });

                    polygonSeries.mapPolygons.template.events.on("out", function(ev) {
                    heatLegend.valueAxis.hideTooltip();
                    }); */

                    // Configure series
                    let polygonTemplate = polygonSeries.mapPolygons.template;
                    polygonTemplate.tooltipText = "{name} : {nombre} ";
                    polygonTemplate.propertyFields.fill = "fill";
                    polygonTemplate.stroke = am4core.color("#084f31")
                    polygonTemplate.strokeWidth = 1;
                    polygonTemplate.hoverOnFocus = true;
                    polygonTemplate.nonScalingStroke = true;

                    // Create hover state and set alternative fill color
                    let hs = polygonTemplate.states.create("hover");
                    hs.properties.fill = am4core.color("#367B25");

                    //label
                    let labelSeries = map.series.push(new am4maps.MapImageSeries());
                    let labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
                    labelTemplate.horizontalCenter = "right";
                    labelTemplate.verticalCenter = "middle";
                    labelTemplate.fontSize = 12;
                    //labelTemplate.nonScaling = true;
                    labelTemplate.interactionsEnabled = false;

                    polygonSeries.events.on("inited", function () {
                    polygonSeries.mapPolygons.each(function (polygon) {
                        let label = labelSeries.mapImages.create();
                        let state = polygon.dataItem.dataContext.name;
                        label.latitude = polygon.visualLatitude;
                        label.longitude = polygon.visualLongitude;
                        label.children.getIndex(0).text = state;
                    });
                    });
                    this.isloading=false
      },
        async getRegions(){
        this.$msasApi.$get('regions')
        .then(async (response) => { 
          this.$store.commit('regions/initlist',response.data)
          console.log('Données région reçu+++++++++++',response)
          this.listregions=response.data
          this.getMap(response.data,this.listparrainages)
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
        getResult(param) {
        this.loading = true
        this.progress=true
        this.isloading =true

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
          .then(async (response) => {
            console.log('Donées reçus ++++++: ',response.data)
           // this.listparrainages=response.data.data
            this.$store.commit('parrainages/initlist',response.data.data)
            this.loading = false;
            this.progress=false
            this.model.nombre_homme = response.data.data.filter((item) =>(item.sexe=='M')).length
            this.model.nombre_femme= response.data.data.filter((item) =>(item.sexe=='F')).length
            this.model.nombre_total = response.data.data.length
            
            this.militants = response.data.data

            this.getRegions() 

          })
          .catch((error) => {
              console.log('Code error ++++++: ', error)
              this.$store.dispatch('toast/getMessage',{type:'error',text:error || 'Echec de l\'ajout '})
          }).finally(() => {
            this.loading = false;
            this.progress = false;
            this.isloading =false
            console.log('Requette envoyé ')
        });
        
      },
      async changeRegion(value) {
        console.log(value?.departements)
        this.model.departement= ''
        this.model.commune = ''

        this.listcommunes = []
        this.listdepartements = value?.departements 
        this.model.region = value?.nom_region
        this.updateAtteint(value?.nom_region,'region')
        
      },
      async changeDepartement(value) {    
        this.model.commune = "" 
        this.listcommunes = value?.communes 
        this.model.departement = value?.nom_departement
        this.updateAtteint(value?.nom_departement,'departement')
      },
      async changeCommune(value) {   
        this.model.commune = value.nom_commune 
        this.updateAtteint(value?.nom_commune,'commune')
      },
        getResultatAtteint(){
          this.$msasApi.$get('/allSectoriel')
          .then(async (response) => { 
            console.log('Données reçu resulat atteint sectoriel -------- +++++++++++',response)
                this.listresultatAtteints = response.data
                let Ind_1 =0
                let Ind_2 =0
                let Ind_1_1 =0
                let Ind_2_1=0
                let Ind_R_3_1_1=0
                let Ind_R_3_1_2 =0
                let Ind_R_3_2_1 =0
                let Ind_R_3_2_2=0

                let Ind_1_2=0
                let Ind_R_1_2_1=0
                let Ind_R_1_1_2=0
                let Ind_R_1_1_1 = 0
                let Ind_2_2 =0
                let Ind_R_1_2_2 =0
                let Ind_R_2_2_2 =0
                let Ind_R_2_2_1=0 	 
                let Ind_R_2_1_1=0 
                response.data.map((item)=>{
                  console.log("item questionnaire Ind 1 2-------------- ",JSON.parse(item.questionnaire)?.Ind_1_2)

                  Ind_1=parseInt(Ind_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_1)
                  Ind_2=parseInt(Ind_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_2)
                  Ind_1_1=parseInt(Ind_1_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_1_1)
                  Ind_2_1=parseInt(Ind_2_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_2_1)
                  Ind_R_3_1_1=parseInt(Ind_R_3_1_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_3_1_1)

                  Ind_R_3_1_2=parseInt(Ind_R_3_1_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_3_1_2)
                  Ind_R_3_2_1=parseInt(Ind_R_3_2_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_3_2_1)
                  Ind_R_3_2_2=parseInt(Ind_R_3_2_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_3_2_2)

                  Ind_1_2=parseInt(Ind_1_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_1_2)
                  Ind_R_1_2_1=parseInt(Ind_R_1_2_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_1_2_1)
                  Ind_R_1_1_2=parseInt(Ind_R_1_1_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_1_1_2)
                  Ind_R_1_1_1=parseInt(Ind_R_1_1_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_1_1_1)
                  Ind_2_2=parseInt(Ind_2_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_2_2)

                  Ind_R_1_2_2=parseInt(Ind_R_1_2_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_1_2_2)
                  Ind_R_2_2_2=parseInt(Ind_R_2_2_2)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_2_2_2)
                  Ind_R_2_2_1=parseInt(Ind_R_2_2_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_1_1_2)
                  Ind_R_2_1_1=parseInt(Ind_R_2_1_1)+parseInt(JSON.parse(item.questionnaire)?.Ind_R_2_1_1)

                })
                this.model = {      
                  "Ind_1" : Ind_1,
                  "Ind_2" : Ind_2,
                  "Ind_1_1" : Ind_1_1,
                  "Ind_2_1" :Ind_2_1,
                  "Ind_R_3_1_1" :Ind_R_3_1_1,
                  "Ind_R_3_1_2" : Ind_R_3_1_2,
                  "Ind_R_3_2_1" : Ind_R_3_2_1,
                  "Ind_R_3_2_2" : Ind_R_3_2_2 ,

                  "Ind_1_2" : Ind_1_2,
                  "Ind_R_1_2_1" :Ind_R_1_2_1,
                  "Ind_R_1_1_2" :Ind_R_1_1_2,
                  "Ind_R_1_1_1" :Ind_R_1_1_1,
                  "Ind_2_2" :Ind_2_2,
                  "Ind_R_1_2_2" :Ind_R_1_2_2,
                  "Ind_R_2_2_2" : Ind_R_2_2_2,
                  "Ind_R_2_2_1" :Ind_R_2_2_1, 	
                  "Ind_R_1_1_1" :Ind_R_1_1_1, 
                  "Ind_R_2_1_1" :Ind_R_2_1_1
                }
              }).catch((error) => {
                  console.log('Code error ++++++: ', error?.response?.data?.message)
              }).finally(() => {
                console.log('Requette envoyé ')
              });
          },
        async changeannee(value) {
         this.updateAtteint(value,'annee')
        },
        async changesecteur(value) {
          this.updateAtteint(value,'secteur')     
        },
        async changetrimestre(value) {
          this.updateAtteint(value,'trimestre')     
        },

        onClearClicked () {
        this.region = ''
        this.departement = ''
        this.commune = ''
        this.updateAtteint('afficher_tout','all')
        
        },
        async updateAtteint(value,type) {
          var list = []
          if(type=='region'){
            this.model.nombre_homme = this.listparrainages.filter((item) =>(item.region==value)).filter((item) =>(item.sexe=='M')).length
            this.model.nombre_femme= this.listparrainages.filter((item) =>(item.region==value)).filter((item) =>(item.sexe=='F')).length
            this.model.nombre_total = this.listparrainages.filter((item) =>(item.region==value)).length
            this.getMap(this.listregions,this.listparrainages.filter((item) =>(item.region==value)))
          }
           
          if(type=='departement'){
            
            this.model.nombre_homme = this.listparrainages.filter((item) =>(item.departement==value)).filter((item) =>(item.sexe=='M')).length
            this.model.nombre_femme= this.listparrainages.filter((item) =>(item.departement==value)).filter((item) =>(item.sexe=='F')).length
            this.model.nombre_total = this.listparrainages.filter((item) =>(item.departement==value)).length
            this.getMap(this.listregions,this.listparrainages.filter((item) =>(item.departement==value)))
          }
          
          if(type=='commune'){
            
            this.model.nombre_homme = this.listparrainages.filter((item) =>(item.commune==value)).filter((item) =>(item.sexe=='M')).length
            this.model.nombre_femme= this.listparrainages.filter((item) =>(item.commune==value)).filter((item) =>(item.sexe=='F')).length
            this.model.nombre_total = this.listparrainages.filter((item) =>(item.commune==value)).length
            this.getMap(this.listregions,this.listparrainages.filter((item) =>(item.commune==value)))
          }

          if(type=='all'){
            this.model.nombre_homme = this.listparrainages.filter((item) =>(item.sexe=='M')).length
            this.model.nombre_femme= this.listparrainages.filter((item) =>(item.sexe=='F')).length
            this.model.nombre_total = this.listparrainages.length

            this.region = ''
            this.departement = ''
            this.commune = ''

            this.getMap(this.listregions,this.listparrainages)
          }
        },
      },
      metaInfo () {
        return {
          items: this.items,
        }
      }
    }
  </script>
  <style>
  .custom-card-grey .border-grey{
    background: #f1f3f5d9 !important;
  }
  .v-text-field fieldset{
    background-color: #fff !important;
  }
  #chartdiv {
  width: 100%;
  height: 400px;
 }
  </style>
  