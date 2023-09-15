

export interface MenuItem {
    id: string,
    name: string,
    icon?: string,
    url?: string,
    dropdowns?: SubMenuItem[],
    options?: Array<MenuLink[]>,
    disabled ?: boolean
}

export interface SubMenuItem {
    id: string,
    name: string,
    icon?: string,
    url?: string,
    options?: Array<MenuLink[]>,
    disabled ?: boolean
}

export interface MenuLink {
    id ?: string,
    type: 'link' | 'section' | 'button',
    label: string,
    url: string,
    icon?: string,
    disabled ?: boolean
}