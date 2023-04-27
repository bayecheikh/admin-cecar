<template>
  <div>
    <v-form class="" v-model="valid" ref="form" enctype="multipart/form-data">
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <v-row>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Prénom du Responsable"
              outlined dense
              v-model="model.prenom_responsable"
              :rules="rules.prenom_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Nom du Responsable"
              outlined dense
              v-model="model.nom_responsable"
              :rules="rules.nom_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col md="4" lg="4" sm="12">
            <v-text-field
              label="Téléphone du Responsable"
              outlined dense
              v-model="model.telephone_responsable"
              :rules="rules.telephone_responsableRules"
            ></v-text-field>
          </v-col>
          <v-col lg="4" md="4" sm="12">
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
          <v-col lg="4" md="4" sm="12">
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
          <v-col lg="4" md="4" sm="12">
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
        </v-row>
      </v-card>
      <h2 class="mb-5 primary custom-title-h2">INFORMATIONS DE L'ELECTEUR</h2>
      <v-card class="mx-auto mb-5 pl-10 pt-10 pr-10 pb-5">
        <div class="custom-ligne-bloc">       
            <p>Numéro CEDEAO</p>
            <v-row>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="sexe_cedeao"
                  outlined dense
                  v-model="modelCedeao.sexe"
                  :rules="sexe_cedeaoRules"
                  maxlength="1"
                  @input="moveToCodeRegion_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="2" lg="2" sm="2">
                <v-text-field
                  ref="codeRegion_cedeao"
                  outlined dense
                  v-model="modelCedeao.codeRegion"
                  :rules="codeRegion_cedeaoRules"
                  maxlength="2"
                  @input="moveToAnnee_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3">
                <v-text-field
                  ref="annee_cedeao"
                  outlined dense
                  v-model="modelCedeao.annee"
                  :rules="annee_cedeaoRules"
                  maxlength="4"
                  @input="moveToMois_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="mois_cedeao"
                  outlined dense
                  v-model="modelCedeao.mois"
                  :rules="mois_cedeaoRules"
                  maxlength="2"
                  @input="moveToJour_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="jour_cedeao"
                  outlined dense
                  v-model="modelCedeao.jour"
                  :rules="jour_cedeaoRules"
                  maxlength="2"
                  @input="moveToCodeGenere_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3">
                <v-text-field
                  ref="codeGenere_cedeao"
                  outlined dense
                  v-model="modelCedeao.codeGenere"
                  :rules="codeGenere_cedeaoRules"
                  maxlength="5"
                  @input="moveToCodeControle_cedeao($event)"
                ></v-text-field>
              </v-col>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="codeControle_cedeao"
                  outlined dense
                  v-model="modelCedeao.codeControle"
                  :rules="codeControle_cedeaoRules"
                  maxlength="1"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="6" lg="6" sm="12">
                <v-text-field
                  label="Prénom"
                  outlined dense
                  v-model="model.prenom"
                  :rules="rules.prenomRules"
                ></v-text-field>
              </v-col>
              <v-col md="6" lg="6" sm="12">
                <v-text-field
                  label="Nom"
                  outlined dense
                  v-model="model.nom"
                  :rules="rules.nomRules"
                ></v-text-field>
              </v-col>
              <v-col md="6" lg="6" sm="12">
                <v-text-field
                  label="Date de naissance"
                  outlined dense
                  v-model="getDateNaissance"
                  :rules="rules.date_naissanceRules"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col md="6" lg="6" sm="12">
                <v-text-field
                  label="Lieu de naissance"
                  outlined dense
                  v-model="model.lieu_naissance"
                  :rules="rules.lieu_naissanceRules"
                ></v-text-field>
              </v-col>
              <v-col md="6" lg="6" sm="12">
                <v-text-field
                  label="Taille"
                  outlined dense
                  v-model="model.taille"
                  :rules="rules.tailleRules"
                ></v-text-field>
              </v-col>

              <v-col md="6" lg="6" sm="12">
                <v-radio-group
                  v-model="getSexe"
                  row
                  readonly
                >
                  Sexe : &nbsp; &nbsp;<v-radio
                    label="Masculin"
                    value="M"
                  ></v-radio>
                  <v-radio
                    label="Feminin"
                    value="F"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Numéro Electeur"
                  outlined dense
                  v-model="model.numero_electeur"
                  :rules="rules.numero_electeurRules"
                ></v-text-field>
              </v-col>
              
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Centre de vote"
                  outlined dense
                  v-model="model.centre_vote"
                  :rules="rules.centre_voteRules"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Bureau de vote"
                  outlined dense
                  v-model="model.bureau_vote"
                  :rules="rules.bureau_voteRules"
                ></v-text-field>
              </v-col>
            </v-row>
            <p>Numéro CIN</p>
            <v-row>
              <v-col md="1" lg="1" sm="1">
                <v-text-field
                  ref="sexe_cin"
                  outlined dense
                  v-model="modelCin.sexe"
                  :rules="sexe_cinRules"
                  maxlength="1"
                  @input="moveToCodeCentre_cin($event)"
                ></v-text-field>
              </v-col>
              <v-col md="3" lg="3" sm="3">
                <v-text-field
                  ref="codeCentre_cin"
                  outlined dense
                  v-model="modelCin.codeCentre"
                  :rules="codeCentre_cinRules"
                  maxlength="3"
                  @input="moveToAnnee_cin($event)"
                ></v-text-field>
              </v-col>
              <v-col md="4" lg="4" sm="4">
                <v-text-field
                  ref="annee_cin"
                  outlined dense
                  v-model="modelCin.annee"
                  :rules="annee_cinRules"
                  maxlength="4"
                  @input="moveToCodeGenere_cin($event)"
                ></v-text-field>
              </v-col>
  
              <v-col md="4" lg="4" sm="4">
                <v-text-field
                  ref="codeGenere_cin"
                  outlined dense
                  v-model="modelCin.codeGenere"
                  :rules="codeGenere_cinRules"
                  maxlength="5"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col md="4" lg="4" sm="12">
                <v-text-field
                  label="Téléphone"
                  outlined dense
                  v-model="model.telephone"
                  :rules="rules.telephoneRules"
                ></v-text-field>
              </v-col>
            </v-row>

          <v-btn :loading="loading" class="mr-4 text-white" color="#1B73E8" @click="submitForm">
            Enregistrer
          </v-btn>
        </div>     
      </v-card>
      
    </v-form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
  export default {
    components: {
      
    },
    mounted: function() {
      this.getRegions()
      this.$refs.sexe_cedeao.focus()
    },
    computed: {
      ...mapGetters({
      listregions: 'regions/listregions',    
      }),
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
      },
      //CIN RULES
      sexe_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            //if (!isNaN(parseFloat(v)) && v <= 2 && v >= 1) return true;                  
            if ((this.modelCin.sexe=='' || this.modelCedeao.sexe==1) && parseFloat(v)==1) return true;                  
            if ((this.modelCin.sexe=='' || this.modelCedeao.sexe==2) && parseFloat(v)==2) return true;                  
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeCentre_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 3) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      annee_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) <= 2005 && v.length == 4) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      codeGenere_cinRules() {
          return [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && v.length == 5) return true;                  
                                              
            return 'Veuillez saisir un chiffre valide';
          },
        ]
      },
      getDateNaissance() {
          return this.modelCedeao.jour+'/'+this.modelCedeao.mois+'/'+this.modelCedeao.annee
      },  
      getSexe() {
          return this.modelCedeao.sexe==1?"M":"F"
      }

    },
    data: () => ({
      listcommunes:[],
      listdepartements:[],
      listregions:[],

      commune:null,
      departement:null,
      region:null,

      valid: true,
      loading: false,
      
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
      modelCin:{
        sexe:"",
        codeCentre:"",
        annee:"",
        codeGenere:""
      },
      model: {
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
      },
      rules:{
        numero_cedeaoRules: [
          v  => {
            console.log(v[0])
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          },
        ],
        numberRules: [
          v  => {
            if (!v.trim() || v=='') return true;
            if (!isNaN(parseFloat(v)) && v >= 0 ) return true;
            return 'Veuillez saisir un chiffre valide';
          },
        ],
        nationalityRules: [
          v => !!v || 'Nationalité est obligatoire',
          v => (v && v.length <= 50) || 'Nationalité doit etre inférieur à 15 caratères',
        ]
      }
    }),
    methods: {
      async getRegions(){
        this.$msasApi.$get('regions')
        .then(async (response) => { 
          console.log('Données région reçu+++++++++++',response)
          this.listregions=response.data
          }).catch((error) => {
              console.log('Code error ++++++: ', error?.response?.data?.message)
          }).finally(() => {
          console.log('Requette envoyé ')
        });
      },
      async changeRegion(value) {
        console.log(value?.departements)
        this.model.departement= ""
        this.model.commune = ""

        this.listcommunes = []
        this.listdepartements = value?.departements 
        this.model.region = value?.nom_region
        
      },
      async changeDepartement(value) {    
        this.model.commune = "" 
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
      moveToAnnee_cedeao(value) {
        if (value.length == 2) {
          this.$refs.annee_cedeao.focus()
        }
      },
      moveToMois_cedeao(value) {
        if (value.length == 4) {
          this.$refs.mois_cedeao.focus()
        }
      },
      moveToJour_cedeao(value) {
        if (value.length == 2) {
          this.$refs.jour_cedeao.focus()
        }
      },
      moveToCodeGenere_cedeao(value) {
        if (value.length == 2) {
          this.$refs.codeGenere_cedeao.focus()
        }
      },
      moveToCodeControle_cedeao(value) {
        if (value.length == 5) {
          this.$refs.codeControle_cedeao.focus()
        }
      },

      //CIN function move
      moveToCodeCentre_cin(value) {
        if (value.length == 1) {
          this.$refs.codeCentre_cin.focus()
        }
      },
      moveToAnnee_cin(value) {
        if (value.length == 3) {
          this.$refs.annee_cin.focus()
        }
      },
      moveToCodeGenere_cin(value) {
        if (value.length == 4) {
          this.$refs.codeGenere_cin.focus()
        }
      },
      
      submitForm () {
        this.loading = true

        let validation = this.$refs.form.validate()

        this.model.numero_cedeao = this.modelCedeao.sexe+this.modelCedeao.codeRegion+this.modelCedeao.annee+this.modelCedeao.mois+this.modelCedeao.jour+this.modelCedeao.codeGenere+this.modelCedeao.codeControle
        this.model.numero_cin= this.modelCin.sexe+this.modelCin.codeCentre+this.modelCin.annee+this.modelCin.codeGenere
        console.log('FormData ++++++ : ',this.model)

        let formData = new FormData();

        formData.append("numero_cedeao",this.model.numero_cedeao)
        formData.append("prenom",this.model.prenom)
        formData.append("nom",this.model.nom)
        formData.append("date_naissance",this.modelCedeao.jour+'/'+this.modelCedeao.mois+'/'+this.modelCedeao.annee)
        formData.append("lieu_naissance",this.model.lieu_naissance)
        formData.append("taille",this.model.taille)
        formData.append("sexe",this.modelCedeao.sexe==1?"M":"F")
        formData.append("numero_electeur",this.model.numero_electeur)
        formData.append("centre_vote",this.model.centre_vote)
        formData.append("bureau_vote",this.model.bureau_vote)
        formData.append("numero_cin",this.model.numero_cin)
        formData.append("telephone",this.model.telephone)
        formData.append("prenom_responsable",this.model.prenom_responsable)
        formData.append("nom_responsable",this.model.nom_responsable)
        formData.append("telephone_responsable",this.model.telephone_responsable)
        formData.append("region",this.model.region)
        formData.append("departement",this.model.departement)
        formData.append("commune",this.model.commune)

       validation && this.$msasApi.post('/parrainages',formData)
          .then((res) => {
            console.log('Donées reçus ++++++: ',res)
            this.$store.dispatch('toast/getMessage',{type:'success',text:res.data.message})
            this.resetInfoElecteur()
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

        this.modelCin.sexe=""
        this.modelCin.codeCentre =""
        this.modelCin.annee =""
        this.modelCin.codeGenere =""
      },
      resetForm () {
        this.$refs.form.reset()
      },
      resetValidationForm () {
        this.$refs.form.resetValidation()
      }
    }
  }
</script>
<style>
#custom-input .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;
  border-left: solid 1px #e3ebf3;
  padding-left: 25px;
  margin-left: 7px;
}
#custom-input-2 .v-text-field__slot{
  border-right: solid 1px #e3ebf3;
  margin-right: 7px;

  padding-left: 25px;
  margin-left: 7px;
}
.custom-ligne-bloc {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 34px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.custom-ligne-bloc-2 {
  border: solid 2px #e3ebf3;
  margin: 12px;
  padding: 0px;
  border-radius: 5px;
  margin-bottom: 26px;
  margin-top: 0px;
}
.v-text-field.v-text-field--enclosed .v-text-field__details {
  padding-top: 0px;
  margin-bottom: 8px;
  min-width: 300px;
}
</style>
