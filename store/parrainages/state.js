export default () => ({
    listparrainages: [],

    headerparrainages : [
        { text: 'Numéro CEDEAO', value: 'numero_cedeao',sortable: true },
        { text: 'Prenom', value: 'prenom',sortable: true },
        { text: 'Nom', value: 'nom',sortable: true },
        { text: 'Date de naissance', value: 'date_naissance',sortable: true },
        { text: 'Lieu de naissance', value: 'lieu_naissance',sortable: true },
        { text: 'Taille', value: 'taille',sortable: true },
        { text: 'Sexe', value: 'sexe',sortable: true },
        { text: 'Numéro electeur', value: 'numero_electeur',sortable: true },
        { text: 'Centre de vote', value: 'centre_vote',sortable: true },
        { text: 'Bureau de vote', value: 'bureau_vote',sortable: true },
        { text: 'CIN', value: 'numero_cin',sortable: true },
        { text: 'Téléphone', value: 'telephone',sortable: true, align: ' d-none' },
        { text: 'Région', value: 'region',sortable: true, align: ' d-none' },
        { text: 'Département', value: 'departement',sortable: true, align: ' d-none' },
        { text: 'Commune', value: 'commune',sortable: true, align: ' d-none' },
        { text: 'Prénom responsable', value: 'prenom_responsable',sortable: true, align: ' d-none' },
        { text: 'Nom responsable', value: 'nom_responsable',sortable: true, align: ' d-none' },
        { text: 'Téléphone responsable',value: 'telephone_responsable',sortable: true, align: ' d-none' },
        { text: 'Actions', value: 'actions', sortable: false}
    ],
    detailparrainage :{}
})