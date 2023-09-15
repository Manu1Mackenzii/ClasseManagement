export enum ServiceStatusEnum {
    STATUS_NEW         = 'NEW',
    STATUS_PUBLISHED   = 'PUBLISHED',
    STATUS_UNPUBLISHED = 'UNPUBLISHED',
    STATUS_ARCHIVED    = 'ARCHIVED'
}

export enum ServiceTypeEnum {
    PRESTATION = "PRESTATION",
    FORMATION = "FORMATION"
}

export enum PricingOptionEnum {
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    FIXED = "FIXED"
}

export type Pricing = {
    option: PricingOptionEnum,
    total: number,
    subTotal: number,
    goldenTax: number,
    tva: number,
    currency: string
}

export type Category = {
    label: string,
    code: string,
    categoryCode?: string,
    createdBy?: string,
    updated_at?: string,
    created_at?: string
}

export type FAQ = {
    question: string,
    answer: string
}