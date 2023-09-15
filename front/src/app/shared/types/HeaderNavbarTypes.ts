type MenuItem = {
    label: string,
    submenuId: string
}

export type MenuOption = {
    sectionName: string;
    link?: string,
    itemList: MenuItem[]
}