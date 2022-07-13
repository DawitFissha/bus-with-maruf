const menuItems = {
    items: [
        {
            id: 'navigation',
            title: 'Home',
            type: 'group',
            icon: 'icon-navigation',
            children: [
                {
                    id: 'dashboard',
                    title: 'Dashboard',
                    type: 'item',
                    url: '/dashboard',
                    icon: 'feather icon-home'
                },
            ]
        },
        {
            id: 'managebus',
            title: 'Manage Trip',
            type: 'group',
            icon: 'icon-ui',
            children: [
                {
                    id: 'ticket',
                    title: 'Ticket Sale',
                    type: 'item',
                    url: '/ticketsale',
                    icon: 'feather icon-calendar'
                },
                {
                    id: 'route',
                    title: 'Add Route',
                    type: 'item',
                    url: '/addroute',
                    icon: 'feather icon-corner-up-right'
                },
                {
                    id: 'shedule',
                    title: 'Add Schedule',
                    type: 'item',
                    url: '/schedule',
                    icon: 'feather icon-grid'
                },
                {
                    id: 'user',
                    title: 'Manage User',
                    type: 'item',
                    url: '/user',
                    icon: 'feather icon-users'
                },
                {
                    id: 'bus',
                    title: 'Manage Bus',
                    type: 'item',
                    url: '/addbus',
                    icon: 'feather icon-life-buoy'
                },
                {
                    id: 'city',
                    title: 'Manage City',
                    type: 'item',
                    url: '/city',
                    icon: 'feather icon-map'
                },
            ]
        }]};

export default menuItems;
