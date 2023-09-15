import { MenuItem } from "@core/models/menu-item.model";

export const MenuAdminOptions: MenuItem[] = [
    {
        id: 'manageListingsId',
        name: 'Tableau de bords',
        dropdowns: [
            // {
            //     id: 'dashboardId',
            //     name: 'Tableau de bord',
            //     icon: 'fa-solid fa-shapes',
            //     url: '/dashboard',
            //     // disabled: true
            // },
            // {
            //     id: 'paiementsId',
            //     name: 'Paiements Stripe',
            //     icon: 'fa-brands fa-stripe',
            //     url: '/stripe-payments'
            // },
            {
                id: 'teachersId',
                name: 'Professeurs',
                icon: 'fa-solid fa-user-tie',
                url: '/teachers',
                // disabled: true
            },
            {
                id: 'InstrumentId',
                name: 'Instruments',
                icon: 'fa-solid fa-user-tie',
                url: '/instruments',
                // disabled: true
            },
            {
                id: 'studentsId',
                name: 'Etudiants',
                icon: 'fa-solid fa-user-tie',
                url: '/students',
                // disabled: true
            },
            {
                id: 'classroomsId',
                name: 'Classes',
                icon: 'fa-solid fa-chalkboard-user',
                url: '/classrooms',
                // disabled: true
            },
            // {
            //     id: 'sceanceId',
            //     name: 'Sceances',
            //     icon: 'fa-solid fa-chalkboard-user',
            //     url: '/sceances',
            //     // disabled: true
            // },
            // {
            //     id: 'manualsId',
            //     name: 'Emploi du temps',
            //     icon: 'fa-solid fa-book-open-reader',
            //     url: '/following-users',
            //     disabled: true
            // },
        ]
    }
]