import { MenuItem } from "@core/models/menu-item.model";

export const MenuMainOptions: MenuItem[] = [
//     {
//         id: 'coursesDropdownId',
//         name: 'navbar.Courses',
//         url: '/lessons',
//         dropdowns: [
//             {
//                 name: 'navbar.Piano',
//                 url: '',
//                 id: 'pianoDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Tous les cours',
//                             url: '/lessons',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/ura/site/ajouter',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Boucles',
//                             url: '/ura/boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des DSP / RIP Tiers',
//                             url: '/ura/dsp',
//                         }
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Affichage des boucles',
//                             url: '/ura/outils/affichage-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Audit des boucles - Polling',
//                             url: '/ura/outils/auditBouclePolling',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Audit des boucles',
//                             url: '/ura/outils/auditBoucleRealState',
//                         },
//                         {
//                             type: 'link',
//                             label: 'BAS Redback Archi N2',
//                             url: '/ura/outils/basredbackn2',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestion des sécurisations',
//                             url: '/ura/outils/gestionSecurisations',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Inventaire',
//                             url: '/ura/outils/inventaire',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Migration des équipements',
//                             url: '/ura/outils/migrationEqpt',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Réhoming DSLAM N2',
//                             url: '/ura/outils/rehomingDslamN2',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Router BIB DSP',
//                             url: '/ura/outils/routeurbibdsp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Scission de boucle',
//                             url: '/ura/outils/scissionBoucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Status des équipements',
//                             url: '/ura/outils/statusEquipement',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Topologie des boucles',
//                             url: '/ura/outils/topologie-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'VLAN transport DSP',
//                             url: '/ura/outils/vlan-transport-dsp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'IPM :: Gestion des Pool Ip',
//                             url: '/ipm/pool-ipm-dslam/list/ura',
//                         },
//                     ]
//                 ]
//             },
//             {
//                 name: 'navbar.Singing',
//                 url: '',
//                 id: 'singingDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/nro',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/nro/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/nro/site/ajouter',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Boucles',
//                             url: '/nro/boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter boucle',
//                             url: '/nro/boucle/ajouter',
//                         }
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Affichage des boucles',
//                             url: '/nro/outils/affichage-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'BIB NRO',
//                             url: '/nro/outils/bibNro',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Config DNS & RANCID',
//                             url: '/nro/outils/configDnsRancid',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Topologie des boucles',
//                             url: '/nro/outils/topologie-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'RIP Tiers',
//                             url: '/nro/outils/rip-tiers',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestionnaire de logs ZTP',
//                             url: '/nro/outils/logWsZtp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Pool vers DSLAM Interface',
//                             url: '/nro/outils/pool-dslam-interface'
//                         },
//                         {
//                             type: 'link',
//                             label: 'Service OLT P2P',
//                             url: '/nro/outils/service-olt-p2p',
//                         },
//                         {
//                             type: 'link',
//                             label: 'IPM :: Gestionnaire des Pool IP',
//                             url: '/ipm/pool-ipm-dslam/list/nro',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Import Covage',
//                             url: '/nro/outils/import',
//                             icon: 'fa-solid fa-plus',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Import Covage Log',
//                             url: '/nro/outils/importLog',
//                             icon: 'fa-solid fa-file-import',
//                         },
//                     ]
//                 ],
//             },
//             {
//                 name: 'navbar.Guitar',
//                 url: '',
//                 id: 'guitarDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/srr',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/srr/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/srr/site/ajouter',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Boucles',
//                             url: '/srr/boucle',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Documentations',
//                             url: '',
//                             icon: 'fa-solid fa-book',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Wiki',
//                             url: '/home#',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Guide Utilisateur',
//                             url: '/home#',
//                         },
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Affichage des boucles',
//                             url: '/srr/outils/affichage-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'BAS Redback Archi N2',
//                             url: '/srr/outils/basredbackn2',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Routeur BIB DSP',
//                             url: '/srr/outils/routeurbibdsp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Tunnels MPLS',
//                             url: '/srr/outils/tunnelsmpls',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Topologie des boucles',
//                             url: '/srr/outils/topologie-boucle',
//                         },
//                     ]
//                 ]
//             },
//             {
//                 name: 'navbar.Drums',
//                 url: '',
//                 id: 'drumsDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/redback',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/redback/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/redback/site/ajouter',
//                         },
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestion des cartes',
//                             url: '/redback/outils/cartes',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Documentations',
//                             url: '',
//                             icon: 'fa-solid fa-book',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Wiki',
//                             url: '/home#',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Guide Utilisateur',
//                             url: '/home#',
//                         },
//                     ]
//                 ]
//             },
//             {
//                 name: 'navbar.MusicTheory',
//                 url: '',
//                 id: 'musictheoryDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/redback',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/redback/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/redback/site/ajouter',
//                         },
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestion des cartes',
//                             url: '/redback/outils/cartes',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Documentations',
//                             url: '',
//                             icon: 'fa-solid fa-book',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Wiki',
//                             url: '/home#',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Guide Utilisateur',
//                             url: '/home#',
//                         },
//                     ]
//                 ]
//             }
//         ]
//     },
//     {
//         id: 'servicesDropdownId',
//         name: 'navbar.Tutorials',
//         url: '/tutorials',
//         dropdowns: [
//             {
//                 name: 'navbar.Piano',
//                 url: '',
//                 id: 'pianoDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/tutorials',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/ura/site/ajouter',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Boucles',
//                             url: '/ura/boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des DSP / RIP Tiers',
//                             url: '/ura/dsp',
//                         }
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Affichage des boucles',
//                             url: '/ura/outils/affichage-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Audit des boucles - Polling',
//                             url: '/ura/outils/auditBouclePolling',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Audit des boucles',
//                             url: '/ura/outils/auditBoucleRealState',
//                         },
//                         {
//                             type: 'link',
//                             label: 'BAS Redback Archi N2',
//                             url: '/ura/outils/basredbackn2',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestion des sécurisations',
//                             url: '/ura/outils/gestionSecurisations',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Inventaire',
//                             url: '/ura/outils/inventaire',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Migration des équipements',
//                             url: '/ura/outils/migrationEqpt',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Réhoming DSLAM N2',
//                             url: '/ura/outils/rehomingDslamN2',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Router BIB DSP',
//                             url: '/ura/outils/routeurbibdsp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Scission de boucle',
//                             url: '/ura/outils/scissionBoucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Status des équipements',
//                             url: '/ura/outils/statusEquipement',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Topologie des boucles',
//                             url: '/ura/outils/topologie-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'VLAN transport DSP',
//                             url: '/ura/outils/vlan-transport-dsp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'IPM :: Gestion des Pool Ip',
//                             url: '/ipm/pool-ipm-dslam/list/ura',
//                         },
//                     ]
//                 ]
//             },
//             {
//                 name: 'navbar.Singing',
//                 url: '',
//                 id: 'singingDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/nro',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/nro/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/nro/site/ajouter',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Boucles',
//                             url: '/nro/boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter boucle',
//                             url: '/nro/boucle/ajouter',
//                         }
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Affichage des boucles',
//                             url: '/nro/outils/affichage-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'BIB NRO',
//                             url: '/nro/outils/bibNro',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Config DNS & RANCID',
//                             url: '/nro/outils/configDnsRancid',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Topologie des boucles',
//                             url: '/nro/outils/topologie-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'RIP Tiers',
//                             url: '/nro/outils/rip-tiers',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestionnaire de logs ZTP',
//                             url: '/nro/outils/logWsZtp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Pool vers DSLAM Interface',
//                             url: '/nro/outils/pool-dslam-interface'
//                         },
//                         {
//                             type: 'link',
//                             label: 'Service OLT P2P',
//                             url: '/nro/outils/service-olt-p2p',
//                         },
//                         {
//                             type: 'link',
//                             label: 'IPM :: Gestionnaire des Pool IP',
//                             url: '/ipm/pool-ipm-dslam/list/nro',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Import Covage',
//                             url: '/nro/outils/import',
//                             icon: 'fa-solid fa-plus',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Import Covage Log',
//                             url: '/nro/outils/importLog',
//                             icon: 'fa-solid fa-file-import',
//                         },
//                     ]
//                 ],
//             },
//             {
//                 name: 'navbar.Guitar',
//                 url: '',
//                 id: 'guitarDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/srr',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/srr/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/srr/site/ajouter',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Boucles',
//                             url: '/srr/boucle',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Documentations',
//                             url: '',
//                             icon: 'fa-solid fa-book',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Wiki',
//                             url: '/home#',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Guide Utilisateur',
//                             url: '/home#',
//                         },
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Affichage des boucles',
//                             url: '/srr/outils/affichage-boucle',
//                         },
//                         {
//                             type: 'link',
//                             label: 'BAS Redback Archi N2',
//                             url: '/srr/outils/basredbackn2',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Routeur BIB DSP',
//                             url: '/srr/outils/routeurbibdsp',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Tunnels MPLS',
//                             url: '/srr/outils/tunnelsmpls',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Topologie des boucles',
//                             url: '/srr/outils/topologie-boucle',
//                         },
//                     ]
//                 ]
//             },
//             {
//                 name: 'navbar.Drums',
//                 url: '',
//                 id: 'drumsDropdownId',
//                 options: [
//                     [
//                         {
//                             type: 'link',
//                             label: 'Accueil',
//                             url: '/redback',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Configurateurs',
//                             url: '',
//                             icon: 'fa-solid fa-gear',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Liste des Sites',
//                             url: '/redback/site',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Ajouter un Site',
//                             url: '/redback/site/ajouter',
//                         },
//                     ],
//                     [
//                         {
//                             type: 'section',
//                             label: 'Outils',
//                             url: '',
//                             icon: 'fa-solid fa-wrench',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Gestion des cartes',
//                             url: '/redback/outils/cartes',
//                         },
//                         {
//                             type: 'section',
//                             label: 'Documentations',
//                             url: '',
//                             icon: 'fa-solid fa-book',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Wiki',
//                             url: '/home#',
//                         },
//                         {
//                             type: 'link',
//                             label: 'Guide Utilisateur',
//                             url: '/home#',
//                         },
//                     ]
//                 ]
//             }
//         ]
//     },
//     {
//         id: 'songsDropdownId',
//         name: 'Songs',
//         options: [
//             [
//                 {
//                     type: 'section',
//                     label: "Bibliothèque",
//                     url: '',
//                     icon: 'fa-solid fa-play'
//                 },
//                 {
//                     type: 'link',
//                     label: "Les nouveautés",
//                     url: "/songs/library?category=new",
//                 },
//                 {
//                     type: 'link',
//                     label: "Tous les chants",
//                     url: "/songs/library?category=all",
//                 },
//                 {
//                     type: 'link',
//                     label: "Demander un nouveau chant",
//                     url: '/songs/request-new',
//                     icon: 'fa-solid fa-icons'
//                 },
//                 {
//                     type: 'section',
//                     label: "Glossaire",
//                     url: '',
//                     icon: 'fa-solid fa-music'
//                 },
//                 {
//                     type: 'link',
//                     label: "Table des accords",
//                     url: "/songs/scale-glossary?tab=chords",
//                 },
//                 {
//                     type: 'link',
//                     label: "Table des gammes",
//                     url: "/songs/scale-glossary?tab=scales",
//                 }
//             ],
//             [
//                 {
//                     type: 'section',
//                     label: "Edition",
//                     url: '',
//                     icon: 'fa-solid fa-record-vinyl'
//                 },
//                 {
//                     type: 'link',
//                     label: "Ajouter un chant",
//                     url: '/songs/lyrics-editor',
//                     icon: 'fa-solid fa-plus'
//                 }
//             ]
//         ]
//     },
//     {
//         id: 'faqDropdownId',
//         name: 'FAQ',
//         url: '/faq'
//     }
]